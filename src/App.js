import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase/app";
import { Container, Spinner } from "react-bootstrap";

import db, { auth, BASE_URL } from "./serverConfig";
import { storeUser, storeUserData, getCartFromLocalStorage } from "./store/actions";
import styles from "./App.module.scss";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import MobilesPage from "./components/MobilesPage/MobilesPage";
import SignIn from "./components/Auth/SignIn/SignIn";

// import {} from "./store/actions/index";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
		loading: true
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userDataRef = db.collection("users").doc(user.uid);
        let getDoc = userDataRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log("User not found!");
              firebase.auth().getInstance().signOut();
            } else {
							this.props.storeUserData({...doc.data()}, user);
							this.props.storeUser(user);
            }
          })
          .catch((err) => {
            console.log(err);
            firebase.auth().signOut();
          })
					.finally(() => this.setState({ loading: false }));
      } else {
				console.log("User not signed in!");
				this.props.getCartFromLocalStorage();
        this.setState({ loading: false });
			}
    });
	}

  render() {
    if (this.state.loading) {
      return (
        <Container className={styles.container}>
          <Spinner animation="border" variant="primary"></Spinner>
          <p className={styles.loadingText}>Loading...</p>
        </Container>
      );
    }
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route path={`${BASE_URL}/`} exact component={Home} />
            <Route path={`${BASE_URL}/mobiles/:id`} component={MobilesPage} />
            <Route path={`${BASE_URL}/auth`} exact component={SignIn} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
		storeUser: (user) => dispatch(storeUser(user)),
		storeUserData: (data, user) => dispatch(storeUserData(data, user)),
		getCartFromLocalStorage: () => dispatch(getCartFromLocalStorage())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
