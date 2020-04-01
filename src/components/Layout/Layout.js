import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import FooterComponent from "../Footer/Footer";
import styles from "./Layout.module.scss";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
				{/* <img className={styles.mobBanner} src={require("../../assets/mobile_banner.png")} alt="Call xxxx for enquiries" /> */}
        <NavBar />
        <main className={styles.content}>{this.props.children}</main>
				<FooterComponent />
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Layout));
