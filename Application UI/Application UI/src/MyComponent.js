import React, { Component } from 'react';
import BigCardWithTwoCards from './BigCardWithTwoCards.js';
import Carousel from './Carousel.js';
import UserDisplay from './UserDisplay';
import MyCard from './MyCard.js';
import UserDisplay2 from './UserDisplay2.js';
import Banner from './Banner.js';
import './index.css'


class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    // Set the loading state to true before making the API call
    this.setState({ loading: true });

    // Replace 'your-api-endpoint' with the actual API URL you want to call
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the data and set loading to false
        this.setState({ data, loading: false });
      })
      .catch((error) => {
        // Handle any errors and set loading to false
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { data, loading, error } = this.state;
    const {usr} = this.props;
    const usrCss = {
    fontFamily: 'Cursive',
       display: 'flex',
       align: 'left',
       color: 'teal'
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (data) {
      // Render your component with the data here
      //        <pre>{JSON.stringify(data, null, 2)}</pre>

      return (
        <div>
          <Banner/>
           <p style = {usrCss}><h2>Hello {usr}, Please find your insights here!!!</h2></p>
          <UserDisplay2 loggedInUser = {usr}/>
          <br/>
          <hr/>
          <Carousel loggedInUser = {usr}/>


        </div>
      );
    }

    return null;
  }
}

export default MyComponent;
