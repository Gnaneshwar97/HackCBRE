import React from 'react';
import { Card } from 'semantic-ui-react';

const BigCardWithTwoCards = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Big Card</Card.Header>
      </Card.Content>

      <Card.Content>
        <Card.Group itemsPerRow={2}>
          <Card>
            <Card.Content>
              <Card.Header>Card 1</Card.Header>
              <Card.Description>
                This is the content of Card 1.
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Card 2</Card.Header>
              <Card.Description>
                This is the content of Card 2.
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Card.Content>
    </Card>
  );
};

export default BigCardWithTwoCards;
