from flask import Flask, request, jsonify
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import sys
import json
from flask import Response
import requests
import pandas as pd

# initialize flask API
app = Flask(__name__)
api = CORS(app)
#bcrypt = Bcrypt(app)
#app.config['JWT_SECRET_KEY']= 'ueir09uf9DSHKJDHW92bkFEF0329RFEWRzd'
#jwt = JWTManager(app)


@app.route("/getInsightForUser",methods=['GET'])
def getInsightForUser():
    args = request.args
    user_name = args["user_name"]
    with open('out.json', 'r') as file:
        data = json.load(file)
    
    insight_list = data.get(user_name);
    insight_dict = {}
    if insight_list is None:
        return "No insight found, Potential reason: No user named "+ user_name
    for i in range(0,len(insight_list)):
        insight_dict[i]=insight_list[i]
        
    return Response(json.dumps(insight_dict),mimetype='application/json');

@app.route("/getUserDetails",methods=['GET'])
def getUserDetils():
    args = request.args
    user_name = args["user_name"]
    users_df = pd.read_csv("recommendation_engine_users.csv")
    res = {}
    for i in users_df.index:
        if users_df['Name'][i] == user_name:
            res['Name']=users_df['Name'][i]
            res['Email']=users_df['Email'][i]
            res['Role']=users_df['Role'][i]
            res['Business Line']=users_df['Business Line'][i]
            res['Location']=users_df['Location'][i]
            res['Client']=users_df['Client'][i]
            res['Dashboard']=users_df['Dashboard'][i]
            #res['User Activity']=users_df['User Activity'][i]
            return Response(json.dumps(res),mimetype='application/json')
    return Response("user not found")

if __name__ == '__main__':
    app.run(
        debug=True,
        host="0.0.0.0",
        port=int("4000")
    )