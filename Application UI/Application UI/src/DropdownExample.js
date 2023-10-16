import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import MyComponent from './MyComponent';
import UserDisplay from './UserDisplay';

class DropdownExample extends Component {
  state = { selectedOption: null };

  handleDropdownChange = (event, data) => {
    this.setState({ selectedOption: data.value });
  };

  render() {
    const options = [
      { key: 'option1', text: 'Option 1', value: 'option1' },
      { key: 'option2', text: 'Option 2', value: 'option2' },
      { key: 'option3', text: 'Option 3', value: 'option3' },
    ];

    return (
      <div>
        <Dropdown
          placeholder="Select an option"
          fluid
          selection
          options={options}
          onChange={this.handleDropdownChange}
          value={this.state.selectedOption}
        />
        {this.state.selectedOption && <MyComponent/>}
      </div>
    );
  }
}

export default DropdownExample;
