import React from "react";
import { useLayoutStyles } from "../../styles";
import Navbar from "../shared/Navbar";

function Layout({ children, minimalNavbar = false, title, marginTop = 60 }) {
  const classes = useLayoutStyles();

  return (
    <section className={classes.section}>
      <Navbar minimalNavbar={minimalNavbar} data={title} />
      <main className={classes.main} style={{backgroundColor:'#0892D0',marginTop:'7%',color:'white'}}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>{children}</div>
        </section>
      </main>
    </section>
  );
}

export default Layout;
