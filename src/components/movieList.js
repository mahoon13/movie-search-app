import React from "react";
import Movie from "./movie";

export default class Movielist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.list) return;

    return (
      <ul className="movie__list">
        {this.props.list.map((movie) => (
          <li className="movie__card">
            <Movie movie={movie} />
          </li>
        ))}
      </ul>
    );
  }
}
