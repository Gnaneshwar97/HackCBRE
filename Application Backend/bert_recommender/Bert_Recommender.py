import pandas as pd
import torch
from transformers import DistilBertTokenizer, DistilBertModel
from sklearn.metrics.pairwise import cosine_similarity
import json

# 1. Loading data
property_insights_df = pd.read_csv("property_insights_extended.csv")
recommendation_users_df = pd.read_csv("recommendation_engine_users.csv")

# 2. Preprocessing Steps

# Aggregating User Activity based on Name and Dashboard
aggregated_activity = recommendation_users_df.groupby(['Name', 'Dashboard'])['User Activity'].sum().reset_index()
users_with_aggregated_activity = pd.merge(recommendation_users_df.drop(columns=['User Activity']), 
                                          aggregated_activity, 
                                          on=['Name', 'Dashboard'], 
                                          how='left')

# Extracting city name from the 'Property Address' column
property_insights_df['City'] = property_insights_df['Property Address'].str.split(',').str[-1].str.strip()

# Creating textual representation for users and property insights
users_with_aggregated_activity['text_representation'] = users_with_aggregated_activity['Role'] + ' ' + \
                                                        users_with_aggregated_activity['Business Line'] + ' ' + \
                                                        users_with_aggregated_activity['Location'] + ' ' + \
                                                        users_with_aggregated_activity['Client'] + ' ' + \
                                                        users_with_aggregated_activity['Dashboard']

property_insights_df['text_representation'] = property_insights_df['City'] + ' ' + \
                                             property_insights_df['Insight 1'] + ' ' + \
                                             property_insights_df['Insight 2'] + ' ' + \
                                             property_insights_df['Driver']


# Applying weightings to the textual representations
users_with_aggregated_activity['weighted_representation'] = users_with_aggregated_activity.apply(lambda x: (x['text_representation'] + ' ') * x['User Activity'], axis=1)
criticality_weights = {'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4}
property_insights_df['Criticality_Weight'] = property_insights_df['Criticality'].map(criticality_weights)
property_insights_df['weighted_representation'] = property_insights_df.apply(lambda x: (x['text_representation'] + ' ') * x['Criticality_Weight'], axis=1)


# Load DistilBERT tokenizer and model
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = DistilBertModel.from_pretrained('distilbert-base-uncased')

# Check if GPU is available and if so, set the model to use GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
model.eval()


# Tokenize the textual representations without truncation
tokenized_users = tokenizer(users_with_aggregated_activity['weighted_representation'].tolist(), truncation=False, padding=False, return_length=True)
tokenized_insights = tokenizer(property_insights_df['weighted_representation'].tolist(), truncation=False, padding=False, return_length=True)

# Determine the maximum length from both datasets
max_length_users = max(tokenized_users['length'])
max_length_insights = max(tokenized_insights['length'])

max_length = max(max_length_users, max_length_insights)
print(max_length)


def get_distilbert_embeddings(texts, batch_size=32):
    embeddings = []
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i:i+batch_size]
        tokens = tokenizer(batch_texts, return_tensors="pt", padding=True, truncation=True, max_length=512)
        tokens = tokens.to(device)
        with torch.no_grad():
            batch_embeddings = model(**tokens).last_hidden_state.mean(dim=1).cpu().numpy()
        embeddings.extend(batch_embeddings)
    return embeddings

# Generating embeddings in batches
user_embeddings = get_distilbert_embeddings(users_with_aggregated_activity['weighted_representation'].tolist())
insight_embeddings = get_distilbert_embeddings(property_insights_df['weighted_representation'].tolist())

def filter_user_data_by_name(name):
    """
    Given a name, return the user data for that particular individual.
    """
    return users_with_aggregated_activity[users_with_aggregated_activity['Name'] == name]

def extract_client_location(user_data):
    """
    Extract the 'Client' and 'Location' details from the user data.
    """
    client = user_data['Client'].iloc[0]
    location = user_data['Location'].iloc[0]
    return client, location

def filter_property_insights_by_client_location(client, location):
    """
    Use the provided 'Client' and 'Location' details to filter the property insights data.
    """
    client_filter = property_insights_df['Account'] == client
    location_filter = property_insights_df['City'] == location
    return property_insights_df[client_filter & location_filter]

# Testing steps 1-3:
user_name_to_query = "Bradley Jenkins"
user_data = filter_user_data_by_name(user_name_to_query)
client, location = extract_client_location(user_data)
filtered_property_insights = filter_property_insights_by_client_location(client, location)

print(filtered_property_insights)

# Load the Role-Insight Mapping
role_insight_df = pd.read_csv("roles_duties_and_insights.csv")
role_insight_mapping = pd.Series(role_insight_df['Relevant Insights'].str.split(', ').tolist(), index=role_insight_df['Role']).to_dict()

def generate_insight_based_on_criticality(location, insight1, insight2, driver, criticality):
    # Base sentences for different criticality levels
    criticality_sentences = {
        'Critical': f"There's a critical concern regarding '{insight1}'-'{insight2}' in {location}. These are unusually high, primarily influenced by '{driver}'. Immediate attention is required.",
        'High': f"It's important to note that '{insight1}'-'{insight2}' in {location} are above expected levels, majorly due to '{driver}'. It's recommended to address this soon.",
        'Medium': f"'{insight1}'-'{insight2}' in {location} have been observed to be slightly higher than usual, influenced by '{driver}'. This should be monitored.",
        'Low': f"'{insight1}'-'{insight2}' in {location} are in line with expectations but are influenced by '{driver}'. No immediate action is required, but it's good to be aware."
    }
    
    return criticality_sentences.get(criticality, "Invalid criticality level")

def get_recommendations_for_user(user_name, num_recommendations=5):
    # Fetch user data
    user_data = filter_user_data_by_name(user_name)
    client, location = extract_client_location(user_data)
    
    # Filter insights by client and location
    filtered_insights = filter_property_insights_by_client_location(client, location)
    
    # Compute similarity scores
    user_index = user_data.index[0]
    insight_indices = filtered_insights.index.tolist()
    similarity_scores = cosine_similarity([user_embeddings[user_index]], [insight_embeddings[i] for i in insight_indices])[0]
    
    # Adjust similarity scores based on role-insight mapping and user activity
    user_role = user_data['Role'].iloc[0]
    relevant_insights = role_insight_mapping.get(user_role, [])
    dashboard_activity = dict(zip(user_data['Dashboard'].tolist(), user_data['User Activity'].tolist()))
    
    for idx, insight in filtered_insights.iterrows():
        # Adjust based on role-insight mapping
        if insight['Insight 1'] not in relevant_insights and insight['Insight 2'] not in relevant_insights:
            similarity_scores[insight_indices.index(idx)] *= 0.5  # Reduce the score by half for non-relevant insights
        
        # Boost based on user activity on dashboards
        for dashboard, activity in dashboard_activity.items():
            if insight['Insight 1'] == dashboard or insight['Insight 2'] == dashboard or insight['Driver'] == dashboard:
                similarity_scores[insight_indices.index(idx)] += activity * 2  # Double boosting for direct matches
    
    # Convert criticality to numeric for sorting
    criticality_map = {'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4}
    criticality_scores = filtered_insights['Criticality'].map(criticality_map).tolist()
    
    # Rank insights by similarity and then by criticality
    top_indices = sorted(range(len(similarity_scores)), key=lambda i: (similarity_scores[i], criticality_scores[i]), reverse=True)[:num_recommendations]
    
    recommendations = []
    for idx in top_indices:
        insight_data = filtered_insights.iloc[idx]
        recommendation_sentence = generate_insight_based_on_criticality(
            insight_data['City'], 
            insight_data['Insight 1'], 
            insight_data['Insight 2'], 
            insight_data['Driver'], 
            insight_data['Criticality']
        )
        recommendations.append(recommendation_sentence)
    
    return recommendations

# Test the function for Bradley Jenkins
user_name_to_query = "Bradley Jenkins"
recommendations_for_user = get_recommendations_for_user(user_name_to_query)
print(f"Top recommendations for {user_name_to_query}:")
print("\n".join(recommendations_for_user))

res = {}
for ind in recommendation_users_df.index:
    user_name_to_query = recommendation_users_df['Name'][ind]
    recommendations_for_user = get_recommendations_for_user(user_name_to_query)
    #inter_jsonObj = json.dumps(recommendations_for_user,indent=4)
    res[user_name_to_query] = recommendations_for_user;

jsonObj = json.dumps(res,indent = 4)
print(jsonObj)

with open("out.json", "w") as outfile: 
    json.dump(res, outfile)