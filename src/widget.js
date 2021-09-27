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
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <TwitterTweetEmbed tweetId={"1438954768299282432"}/>
          {/* for black theme use:- options={{theme: 'dark' }} */}

          {/* If we want to add any post on own websid=te then go to that post and embed that post and use tweet id or url to post here */}
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">At present, there are very fewer States complaining about <a href="https://twitter.com/hashtag/vaccine?src=hash&amp;ref_src=twsrc%5Etfw">#vaccine</a> shortage: <a href="https://twitter.com/ShekharIyer9?ref_src=twsrc%5Etfw">@ShekharIyer9</a>, Journalist, tells Swati Joshi on <a href="https://twitter.com/thenewshour?ref_src=twsrc%5Etfw">@thenewshour</a>. <a href="https://twitter.com/JhaSanjay?ref_src=twsrc%5Etfw">@JhaSanjay</a>, Suspended Congress Leader responds. | <a href="https://twitter.com/hashtag/ModiFactorDecoded?src=hash&amp;ref_src=twsrc%5Etfw">#ModiFactorDecoded</a> <a href="https://t.co/4H9yL0tOqm">pic.twitter.com/4H9yL0tOqm</a></p>&mdash; TIMES NOW (@TimesNow) <a href="https://twitter.com/TimesNow/status/1438903768515366917?ref_src=twsrc%5Etfw">September 17, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

        <TwitterTimelineEmbed
        sourceType="profile"
        screenName="placementnitp"
        options={{height: 400}}
        />

        <TwitterShareButton
        url={'https://facebook.com/profile.php?id=100034310406981'}
        options={{ text: '#reactjs is awesome', via: 'Vaibhav29885098' }}
        />

        <TwitterFollowButton
         screenName={'vaibhav29885098'}
        />
        
      </div>
    </div>
  );
}

export default Widgets;