import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-materialize";
import classes from "./Home.module.css";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Carousel
          images={[
            "https://picsum.photos/250/250?image=0",
            "https://picsum.photos/250/250?image=1",
            "https://picsum.photos/250/250?image=2",
            "https://picsum.photos/250/250?image=3",
            "https://picsum.photos/250/250?image=4"
          ]}
          options={{
            fullWidth: true,
						indicators: true,
						duration: 200
					}}
					className = {classes.carousel}
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
