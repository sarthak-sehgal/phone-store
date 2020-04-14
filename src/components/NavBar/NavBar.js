import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { BASE_URL } from "../../serverConfig";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import data from "../../data.json";
import { logout } from "../../store/actions";

class NavBar extends Component {
  state = {
    companies: Object.keys(data.mobiles),
  };

  render() {
    let myAcc = (
      <NavLink to={`${BASE_URL}/auth`} className={styles.navLink}>
        Login
      </NavLink>
    );
    if (this.props.user !== null) {
      myAcc = (
        <NavDropdown title="My Account" id="my-account">
          <NavDropdown.Item onClick={() => this.props.logout()}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
    return (
      <Navbar
        bg="primary"
        variant="dark"
        fixed="top"
        className={styles.navbar}
        id="mobile-nav"
        expand="md"
      >
        <Navbar.Brand href={BASE_URL}>[[ Company Name ]]</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={styles.navLinks}>
          <Nav className={`${styles.nav} mr-auto`}>
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
						<NavLink to={`${BASE_URL}/cart`} className={styles.navLink}>
              Cart
            </NavLink>
            {myAcc}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
