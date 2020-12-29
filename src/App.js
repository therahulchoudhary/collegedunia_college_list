import './App.css';
import React, { useState } from 'react';
import cardImage from './utilities/assets/college_02.jpg';
import loader from './utilities/assets/loader.gif';
import { colleges } from './utilities/Constants';
import StarRatings from '../node_modules/react-star-ratings';
import InfiniteScroll from '../node_modules/react-infinite-scroll-component';

function App() {

  const [count, setCount] = useState({
    prev: 0,
    next: 10
  })

  const [hasMore, setHasMore] = useState(true);

  const [current, setCurrent] = useState(colleges.slice(count.prev, count.next))

  const getMoreData = () => {
    if (current.length === colleges.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(current.concat(colleges.slice(count.prev + 10, count.next + 10)))
    }, 2000)
    setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
  }

  return (
    <div className="main_container">
      <div className="main_heading">
        <h1>Colleges in North India</h1>
      </div>
      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<img src={loader} className="loader" />}
      >
        <div className="items_container">

          {current && current.map((el, index) => (
            <div className="box_item">
              <img src={cardImage} alt="card_image" width="100%" className="card_image" />
              <div className="box_item_body">
                <div className="item_top_row">
                  <ul className="advantages_list">
                    {el.tags.map((item, index) => (<li>{item}</li>))}
                  </ul>
                  <div className="ranking_text">
                    <p>#{el.ranking}</p>
                  </div>
                </div>
                <div className="item_main_row">
                  <div className="item_left_detail">
                    {/* <h4 className="item_detail_heading">Hansraj College Delhi University * * * * *</h4> */}
                    <div className="item_detail_heading_div">
                      <h4 className="item_detail_heading">{el.college_name}</h4>
                      <div className="rating_stars">
                        <StarRatings
                          starDimension="15px"
                          starSpacing="2px"
                          rating={el.rating}
                          starRatedColor="grey"
                          numberOfStars={5}
                          name='rating'
                        />
                      </div>
                    </div>
                    <h5 className="item_detail_subheading">{el.nearest_place.map((item, index) => (<span>{index !== 0 && <span> | </span>}{item}</span>))}</h5>
                    <p className="item_detail_preference"><span style={{ color: "#3AB497", fontWeight: 600 }}>93% Match :</span> {el.famous_nearest_places}
                    </p>
                  </div>
                  <div className="item_right_detail">
                    <p className="original_price">&#8377;<span className="cancel_word"> {el.original_fees}</span><span
                      className="discount_label">&#8226; {el.discount}</span></p>
                    <p className="discount_price">&#8377; {el.discounted_fees}</p>
                    <p className="fee_cycle">{el.fees_cycle}</p>
                  </div>
                </div>
                <div className="item_bottom_row">
                  <div className="offer_text">
                    <p>{el.offertext}</p>
                  </div>
                  <div className="perks">
                    <ul className="perks_list">
                      {el.amenties.map((item, index) => (<li>{index !== 0 && <span> &#8226;</span>} {item}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rating_div">
                <p><span style={{ fontSize: 20, fontWeight: 600 }}>{el.rating}</span>/5</p>
                <p>{el.rating_remarks}</p>
              </div>
              {el.promoted && <div className="promotion_div">
                <span>PROMOTED</span>
              </div>}
            </div>))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;