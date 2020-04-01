import React, { Component } from "react";
import { Footer, Icon } from "react-materialize";

class FooterComponent extends Component {
  render() {
    return (
      <Footer
        style={{backgroundColor: "#007bff"}}
        copyrights="&copy; 2020 [[Company Name]]"
      >
        <h5 className="white-text">[[Company Name]]</h5>
        <p className="grey-text text-lighten-4">
				[[Company Address]]
        </p>
				<p style={{display: 'flex', alignItems: 'center', fontWeight: 'bold'}}><Icon>call</Icon> xxxx to purchase!</p>
      </Footer>
    );
  }
}

export default FooterComponent;
