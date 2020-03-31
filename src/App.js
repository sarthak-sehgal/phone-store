import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "./serverConfig";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import MobilesPage from "./components/MobilesPage/MobilesPage";

// import {} from "./store/actions/index";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={`${BASE_URL}/`} exact component={Home} />
            <Route path={`${BASE_URL}/mobiles/:id`} component={MobilesPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
