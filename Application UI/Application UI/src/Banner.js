import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const Banner = () => {
  return (
    <Segment inverted color='blue'>
      <Header as='h1' textAlign='center'>
      Welcome to CBRE Dashboard!
        <Header.Subheader></Header.Subheader>
      </Header>
    </Segment>
  );
};

export default Banner;
