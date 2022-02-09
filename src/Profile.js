import * as React from 'react';
import "./Profile.css"
import Vaibhav from "./public/link4.jpg"
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const imgLink =Vaibhav;

export default function SimpleContainer() {
  return (
      <Container maxWidth="lg" style={{marginTop:'1em'}}>
      <Grid container spacing={4}>
        <Grid item xs={8} sm={4}>
          <Item>
              <Avatar alt="Vaibhav Pandey" className="Profile_Photo" src={Vaibhav} />
              <h1>Vaibhav Pandey</h1>
              <div>
              <Badge className="follower" badgeContent={4} color="primary">
              <Button>Followers</Button>
              </Badge>
              <Badge className="following" badgeContent={4} color="primary">
              <Button>Following</Button>
              </Badge>
              </div>
          </Item>
        </Grid>
        <Grid item xs={10} sm={8}>
            <div className="comments">
              <h1 style={{textAlign:'center'}}>Comments</h1>
              <Paper sx={{ padding: "2em"}} elevation={2}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={imgLink} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <p style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                      Suspendisse congue vulputate lobortis. Pellentesque at interdum
                      tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                      sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                      metus, efficitur lobortis nisi quis, molestie porttitor metus.
                      Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                      tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                      lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      Commented 1 minute ago
                    </p>
                  </Grid>
                </Grid>
              </Paper>
              <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={imgLink} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <p style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                      Suspendisse congue vulputate lobortis. Pellentesque at interdum
                      tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                      sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                      metus, efficitur lobortis nisi quis, molestie porttitor metus.
                      Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                      tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                      lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted 1 minute ago
                    </p>
                  </Grid>
                </Grid>
              </Paper>
              <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={imgLink} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <p style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                      Suspendisse congue vulputate lobortis. Pellentesque at interdum
                      tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                      sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                      metus, efficitur lobortis nisi quis, molestie porttitor metus.
                      Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                      tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                      lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted 1 minute ago
                    </p>
                  </Grid>
                </Grid>
              </Paper>
              <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={imgLink} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <p style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                      Suspendisse congue vulputate lobortis. Pellentesque at interdum
                      tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                      sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                      metus, efficitur lobortis nisi quis, molestie porttitor metus.
                      Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                      tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                      lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted 1 minute ago
                    </p>
                  </Grid>
                </Grid>
              </Paper>
            </div>
        </Grid>
      </Grid>
      </Container>
  );
}