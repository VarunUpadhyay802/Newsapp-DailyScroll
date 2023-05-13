import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  articles = [
    {
      "source": {
        "id": "news-com-au",
        "name": "News.com.au"
      },
      "author": "Benedict Brook",
      "title": "Dramatic development in Imran Khan arrest",
      "description": "<p>Former cricket captain and recent Pakistan prime minister Imran Khan has been sensationally released from jail after the country&rsquo;s top judge ruled his arrest earlier this week was illegal. </p>",
      "url": "https://www.news.com.au/world/asia/former-pakistan-pm-and-cricketer-imran-khan-freed-after-arrest-ruled-invalid/news-story/be045d3389e9932e14e4db0b063580aa",
      "urlToImage": "https://content.api.news/v3/images/bin/46953f2ef9f7e11190ada93b8843b193",
      "publishedAt": "2023-05-11T13:52:00Z",
      "content": "Former cricket captain and recent Pakistan prime minister Imran Khan has been sensationally released from jail after the country’s top judge ruled his arrest earlier this week was illegal. \r\nMr Khan … [+3300 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ];

  constructor() {
    super();
    console.log("Hello Constructor this side");
    this.state = {
      articles: this.articles,
      loading: false
    };
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>NewsApp: The daily scroll</h2>
        <div className='row'>
          {this.state.articles.map((element) => {
            return (
              <div className='col-md-4' > 
                <NewsItem
                  title={element.title.slice(0,45)}
                  description={element.description.slice(0,88)}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;