import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react'

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const iconContainer = {
          display: 'flex',
           justifyContent: 'space-between',

        };

const MyCard = (props) => {
  return (
    <div style={cardContainerStyle}>
      <Card>
        <Card.Content>
          <Card.Header>Insights</Card.Header>
          <Card.Description>
          this is : {props.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
<div style={iconContainer}>
    <Icon  name='bookmark' size="big" fluid color="teal"/>
    <Icon  name='comment alternate outline' size="big" fluid color="teal"/>
    <Icon  name='share' size="big" fluid color="teal"/>
    <Icon  name='thumbs up outline' size="big" fluid color="teal"/>
    <Icon  name='thumbs down' size="big" fluid color="teal"/>
  </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default MyCard;
