import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log("Hello Constructor this side");
    this.state = {
      articles: [],
      Loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = "The DailyScroll:" + (this.props.category[0].toUpperCase() + this.props.category.slice(1))
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be27389400394f03893c9f5964f2ebae&page=1&pageSize=${this.props.pageSize}`;
    //page sze refers to how many articles you want to show per page
    // console.log("heyy" + this.props.pageSize);
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);

    // console.log(this.articles.publishedAt)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults, // Set the totalResults state variable

    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePreviousClick = async () => {

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be27389400394f03893c9f5964f2ebae&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json();
    this.setState({
      articles: [...this.state.articles, ...parsedData.articles],
      page: nextPage,
      totalResults: parsedData.totalResults
    });
  };
  //   This line of code is using the spread operator ... to concatenate two arrays.
  // The first array being concatenated is this.state.articles, which could represent an 
  //array of articles stored in the state of a React component or some other application state management system.
  // The second array being concatenated is parsedData.articles, which could represent an array of articles that were just parsed from some 
  //external data source, such as an API response.
  // By using the spread operator to concatenate these arrays, the 
  //resulting array will contain all of the elements from both arrays. This can be useful for appending new data to 
  //existing data without losing any of the original data.
  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be27389400394f03893c9f5964f2ebae&page=1&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   // console.log(data);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults
  //   })
  // };

  // a fake async api call like which sends
  // 20 more records in 1.5 secs
  //   setTimeout(() => {
  //     this.setState({
  //       articles: this.state.articles.concat(Array.from({ length: 20 }))
  //     });
  //   }, 1500);
  // };
  //logic here in fetchmore data is that, we are concatenating more articles
  render() {
    return (
      <div className="container my-3">
        <div className="text-center">
          <h2>Headlines:The daily scroll:{this.props.category[0].toUpperCase() + this.props.category.slice(1)} </h2>

        </div>

        {this.state.Loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          // dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // hasMore={true}, I am commenting the initial , so you can understand what it returns
          //  , now total results you can see in the sample output
          loader={this.state.Loading ? <Spinner /> : null} >
          <div className="row">
            {this.state.articles !== undefined &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 88) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      publishedAt={element.publishedAt}
                      author={element.author ? element.author : "unknown"}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between ">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
            disabled={this.state.page <= 1}
          >
            {" "}
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults) / this.props.pageSize
            }
          >
            {" "}
            Next
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
export { Spinner };
