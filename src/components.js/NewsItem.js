// import React, { Component } from "react"; after changing it to functional based component this is not used 
const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, publishedAt, author, source } = props;
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
          <h5 className="card-title">{title}<br /><span className="badge badge-secondary" style={{ backgroundColor: "black" }}>{source}</span></h5>

          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted"> By {author} on {(new Date(publishedAt)).toGMTString()}</small></p>
          <span className="badge badge-alert">{source}</span>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn  btn-sm btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );

}

export default NewsItem;
