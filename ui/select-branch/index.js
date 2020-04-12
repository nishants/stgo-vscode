import React, { Component } from 'react';

export class SelectBranch extends Component {

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };

  onChange = (e) => {
    const { list } = this.props;
    const userInput = e.currentTarget.value;

    const filteredOptions = list.filter(
      (optionName) =>
        optionName.name ? optionName.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1 : false
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
    this.props.selectBranch(e.currentTarget.innerText);
  };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption].name
      });
      this.props.selectBranch(filteredOptions[activeOption].name);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  setActiveOption(index){
    this.setState({ activeOption: index });
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={index} onClick={onClick} onMouseEnter={() =>  this.setActiveOption(index)}>
                  {optionName.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="search" id='branch-selector'>
          <input id="branch"
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button type="button" className="refresh">Refresh</button>
          {optionList}
        </div>
        
      </React.Fragment>
    );
  }
}

export default SelectBranch;