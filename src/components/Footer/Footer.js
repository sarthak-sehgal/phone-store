import React, { Component } from "react";
import { Footer, Icon } from "react-materialize";

class FooterComponent extends Component {
  render() {
    return (
      <Footer
        style={{backgroundColor: "#007bff"}}
        copyrights="&copy; 2020 Amar Electronics"
      >
        <h5 className="white-text">Amar Electronics & Music Centre</h5>
        <p className="grey-text text-lighten-4">
					Savitri Nagar, Block M,<br/>Malviya Nagar, New Delhi,<br/>Delhi 110017
        </p>
				<p style={{display: 'flex', alignItems: 'center', fontWeight: 'bold'}}><Icon>call</Icon> 9818061375 for bookings</p>
      </Footer>
    );
  }
}

export default FooterComponent;
