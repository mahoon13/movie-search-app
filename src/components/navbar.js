import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.searchBox = React.createRef();
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick() {
    const title = this.searchBox.current.value;
    if (title === null || title === "") return;

    this.searchBox.current.value = null;
    this.props.handleSearch(title);
  }

  render() {
    return (
      <div className="navbar">
        <div className="search__bar">
          <input
            type="text"
            className="search__box"
            ref={this.searchBox}
          ></input>
          <div className="search__btn" onClick={this.handleBtnClick}>
            <BiSearchAlt2 />
          </div>
        </div>
      </div>
    );
  }
}
