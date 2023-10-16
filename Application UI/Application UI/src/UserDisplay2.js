import React, { useState, useEffect } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

const UserDisplay2 = (props) => {
  const [user, setUser] = useState(null);
  const loggedInUser = props.loggedInUser;
  useEffect(() => {
    // Fetch user data from an API (replace with your API endpoint)
    fetch('https://jsonplaceholder.typicode.com/users/2/')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user data: ', error));
  }, []);

  return (
    <div>
      {user ? (
        <Card fluid>

          <Card.Content>
          <Card.Header><h1><ins> User Details</ins> </h1></Card.Header>
            <Card.Header>{loggedInUser}</Card.Header>
                        <Card.Meta>
                          <span>{user.Role}</span>
                        </Card.Meta>
            <Card.Description>{user.email}</Card.Description>
             <Card.Description>{user.Location}</Card.Description>
              <Card.Description>{user.Client}</Card.Description>
              <Card.Description>{user.Dashboard}</Card.Description>
          </Card.Content>

        </Card>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDisplay2;
