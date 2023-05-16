import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="my-4">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTznjnkoPDA12H1hv--hVjf9Od5CBCj94gllw&usqp=CAU"
                : imageUrl
            }
            className="card-img-top"
            alt="/"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn  btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
