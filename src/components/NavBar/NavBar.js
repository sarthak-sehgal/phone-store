import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { BASE_URL } from "../../serverConfig";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import data from "../../data.json";

class NavBar extends Component {
  state = {
    companies: Object.keys(data.mobiles),
  };

  render() {
    return (
      <Navbar
        bg="primary"
        variant="dark"
        fixed="top"
        className={styles.navbar}
        id="mobile-nav"
      >
        <Navbar.Brand href={BASE_URL}>[[ Company Name ]]</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={styles.navLinks}>
          <Nav className="mr-auto">
            <NavLink to={`${BASE_URL}/`} className={styles.navLink}>
              Home
            </NavLink>
            {this.state.companies.map((company) => {
              return (
                <NavLink
                  to={`${BASE_URL}/mobiles/${company}`}
                  key={`${company}`}
                  className={styles.navLink}
                >{`${company}`}</NavLink>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(NavBar);
