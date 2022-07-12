import React from "react";
import { useGridPostStyles } from "../../styles";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function GridPost({post, email }) {
  const history = useHistory();
  const classes = useGridPostStyles();

  function handleOpenPostModal() {
    history.push({
      pathname: `/userDetail/${email}/${post.id}`,
      state: { modal: true }
    });
  }

  return (
    <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          <Typography>{post.likes}</Typography>
        </div>
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          <Typography>{(post.user_comment).length}</Typography>
        </div>
      </div>
      {post.post_data!="" && <img
        src={post.post_data}
        alt='Post cover'
        className={classes.image}
       />}
       {post.post_url!="" && <img
        src={post.post_url}
        alt='Post cover'
        className={classes.image}
       />}
    </div>
  )
}

export default GridPost;
