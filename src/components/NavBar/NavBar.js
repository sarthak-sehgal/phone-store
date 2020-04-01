import React, { Component } from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import { BASE_URL } from "../../serverConfig";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import data from "../../data.json";

class NavBar extends Component {
  state = {
    companies: Object.keys(data.mobiles)
  };

  render() {
    return (
      <Navbar
        alignLinks="right"
        brand={
          <NavLink key="home" className="brand-logo" to={`${BASE_URL}/`}>
            Amar Electronics
          </NavLink>
        }
        className={styles.navbar}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}
      >
        {this.state.companies.map((company) => {
          return (
              <NavLink
                to={`${BASE_URL}/mobiles/${company}`}
								key={`${company}`}
								className={styles.navLink}
              >{`${company}`}</NavLink>
          );
        })}
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps)(NavBar);
