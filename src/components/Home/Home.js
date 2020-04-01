import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Carousel, Icon, Select } from "react-materialize";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../serverConfig";
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
        <Carousel
          images={[
						"https://picsum.photos/250/250?image=0",
						"https://picsum.photos/250/250?image=1",
						"https://picsum.photos/250/250?image=2",
						"https://picsum.photos/250/250?image=4",
						"https://picsum.photos/250/250?image=5"
          ]}
          options={{
            fullWidth: true,
            indicators: true,
            duration: 200
          }}
          className={styles.carousel}
          carouselId="home-carousel"
        />
        <div className={styles.allCompanies}>
          <span className={styles.companiesHeading}>Explore phones: </span>
          <div className={styles.companies}>
            {this.state.companies.map((company, index) => {
              return (
                <Fragment key={`fragment+${company}+${index}`}>
                  <NavLink
                    to={`${BASE_URL}/mobiles/${company}`}
                    key={`${company}+${index}`}
                    className={styles.navLink}
                  >{`${company}`}</NavLink>
                  <span key={`span+${company}+${index}`} className={styles.separator}></span>
                </Fragment>
              );
            })}
          </div>
          <div className={styles.callNow}>
            <Icon>call</Icon>
            <span>Call now at xxxx for more details!</span>
          </div>
        </div>
        <div className={styles.selectDiv}>
					<span className={styles.selectLabel}>Select company to explore:</span>
          <Select
            id="SelectCompany"
            multiple={false}
            onChange={this.selectCompanyHandler}
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
              }
            }}
            value={this.state.selectedCompany}
          >
            {this.state.companies.map((company, idx) => {
              return <option value={company} key={`${company}+${idx}`}>{company}</option>;
            })}
          </Select>
        </div>
        <MobilesPage id={this.state.selectedCompany}></MobilesPage>
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
