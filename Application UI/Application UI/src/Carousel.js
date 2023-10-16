import React, { useState, useEffect, Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MyCard from './MyCard.js';


class Carousel extends Component {
    constructor() {
      super();
      this.state = {
        data: null,
        loading: false,
        error: null
      };
    }

    componentDidMount() {
      // Set the loading state to true before making the API call
      this.setState({ loading: true });

      // Replace 'your-api-endpoint' with the actual API URL you want to call
      fetch('https://dummyjson.com/products/')
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
      const {loggedInUser} = this.props;
  const settings = {
   className: "center",
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const cardsData = [
    {
      title: 'Card 1',
      description: 'gmvhjkvhjknjhjjkjvkgmvhjkvhjknjhjjkjvkgmvhjkvhjknjhjjkjvk',
      image: 'image1.jpg',
    },
    {
      title: 'Card 2',
      description: 'gmvhjkvhjknjhjjkjvkgmvhjkvhjknjhjjkjvkgmvhjkvhjknjhjjkjvk',
      image: 'image2.jpg',
    },
    {
      title: 'Card 3',
      description: 'Description for Card 3',
      image: 'image3.jpg',
    },
  ];

//                                         {cardsData.map((card, index) => (
//                                           <div key={index}>
//
//                                             <MyCard description={card.description}/>
//                                           </div>
//
//                                         ))}

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
           <div className="carousel">

                                     <Slider {...settings}>


                                       {data.products.map(item => (
                                               <div key={item.id}>

                                                 <MyCard description={item.description}/>
                                               </div>
                                             ))}
                                     </Slider>
                                   </div>
        );
      }

      return null;
    }
};

export default Carousel;

