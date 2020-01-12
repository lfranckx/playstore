import React from 'react';

export default function AppList(props) {
    return (
        <div className="App">
            <h2>{this.props.App}</h2>
            <div className="Rating">{props.Rating}</div>
            <div className="Reviews">Reviews: {props.Reviews}</div>
            <div className="Size">Size: {props.Size}</div>
            <div className="Price">{props.Type}</div>
            <div className="Genres">Genre: {props.Genres}</div>
        </div>
    )
}