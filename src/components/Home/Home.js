import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.scss";
import data from "../../data.json";
import MobilesPage from "../MobilesPage/MobilesPage";

class Home extends Component {
  state = {
    companies: Object.keys(data.mobiles),
    selectedCompany: "Xiaomi"
	};

	selectCompanyHandler = (e) => {
		this.setState({selectedCompany: e.target.value});
	}

  render() {
    return (
      <Fragment>
        {/* <MobilesPage id={this.state.selectedCompany}></MobilesPage> */}
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
