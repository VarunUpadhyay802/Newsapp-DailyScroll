import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title =
      "The DailyScroll:" + (props.category[0].toUpperCase() + props.category.slice(1));
    updateNews();
    // eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=be27389400394f03893c9f5964f2ebae&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url, {
      mode: 'no-cors'
    });

    let parsedData = await data.json();
    setArticles([...articles, ...parsedData.articles]);
    setTotalResults(parsedData.totalResults)
    setLoading(false);
    props.setProgress(100);
  };

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  // const handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=be27389400394f03893c9f5964f2ebae&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url, {
      mode: 'no-cors'
    });
    let parsedData = await data.json();
    setArticles([...articles, ...parsedData.articles]);
    setPage(nextPage);
    setTotalResults(parsedData.totalResults);
    setLoading(true);
  };

  return (
    <div className="container my-3">
      <div className="text-center">
        <h2 style={{ marginTop: '70px' }}>
          DailyScroll:{props.category[0].toUpperCase() +
            props.category.slice(1)}{" "}
        </h2>
      </div>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading ? <Spinner /> : null}>
        <div className="row">
          {articles !== undefined &&
            articles.map((element) => {
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
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
export { Spinner };
