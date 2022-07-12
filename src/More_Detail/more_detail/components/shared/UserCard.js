import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";
import { defaultUser } from "../../data";

function UserCard({ username, name, profile_image, avatarSize = 44 }) {
  const classes = useUserCardStyles({ avatarSize });

  return (
    <div className={classes.wrapper}>
        <Avatar
          src={profile_image}
          alt="User avatar"
          className={classes.avatar}
        />
      <div className={classes.nameWrapper}>
          <Typography variant="subtitle2" className={classes.typography}>
            {name}
          </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          {username}
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
