import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-materialize";
import styles from "./Home.module.scss";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Carousel
          images={[
            require("../../assets/desktop_banner1.jpg"),
            require("../../assets/desktop_banner2.jpg"),
            require("../../assets/desktop_banner3.jpg")
          ]}
          options={{
            fullWidth: true,
						indicators: true,
						duration: 200
					}}
					className = {styles.carousel}
					carouselId = "home-carousel"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
