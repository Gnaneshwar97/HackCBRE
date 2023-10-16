import React, { Component } from 'react';
import { Carousel } from 'semantic-ui-react';

class MyCarousel extends Component {
  state = { activeIndex: 0 }

  handleSlideChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { activeIndex } = this.state;

    const carouselItems = [
      {
        key: 1,
        header: 'Item 1',
        description: 'Description for Item 1',
        image: 'https://via.placeholder.com/300x150',
      },
      {
        key: 2,
        header: 'Item 2',
        description: 'Description for Item 2',
        image: 'https://via.placeholder.com/300x150',
      },
      {
        key: 3,
        header: 'Item 3',
        description: 'Description for Item 3',
        image: 'https://via.placeholder.com/300x150',
      },
    ];

    return (
      <Carousel
        activeIndex={activeIndex}
        onSlideChange={this.handleSlideChange}
        items={carouselItems}
      />
    );
  }
}

export default MyCarousel;
