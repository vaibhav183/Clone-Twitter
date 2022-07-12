import React from "react";
import "./widget.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterFollowButton,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widget">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search User" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        {/* <TwitterTweetEmbed tweetId={"1438954768299282432"}/> */}
        <TwitterShareButton
        url={'https://facebook.com/profile.php?id=100034310406981'}
        options={{ text: '#reactjs is awesome', via: 'Vaibhav29885098' }}
        className="share"
        />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="TOIIndiaNews"
          options={{height: 500}}
        />

          {/* for black theme use:- options={{theme: 'dark' }} */}

          {/* If we want to add any post on own website then go to that post and embed that post and use tweet id or url to post here */}
        {/* <TwitterTimelineEmbed
        sourceType="profile"
        screenName="placementnitp"
        options={{height: 350}}
        /> */}


        <TwitterFollowButton
         screenName={'vaibhav29885098'}
        />
        
      </div>
    </div>
  );
}

export default Widgets;