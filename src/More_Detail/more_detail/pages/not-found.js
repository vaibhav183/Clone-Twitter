import React from "react";
import Layout from "../components/shared/Layout";
import { Typography } from "@material-ui/core";
import { Link,Redirect } from "react-router-dom";
import "./not-found.css"

function NotFoundPage() {
  return (
    <Layout title="Page Not Found" marginTop={120}>
      <Typography variant="h2" align="center" paragraph>
        Sorry, this page isn't available.
      </Typography>
      <Typography align="center">
        <p className="loadingg" >The link you followed may be broken, or the page may have been removed.</p>
        <br/>
          <Typography color="primary" component="span">
          <Link to="/" style={{textDecoration:"none",color:'#FFDEAD'}}>Go back to Home Page.</Link>
          </Typography>
      </Typography>
    </Layout>
  );
}

export default NotFoundPage;
