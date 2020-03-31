import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import classes from "./Layout.module.scss";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default withRouter(connect(null, null)(Layout));
