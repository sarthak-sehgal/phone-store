import React, { Component, Fragment } from "react";
import {ListGroup} from "react-bootstrap";
import styles from "./MobilesPage.module.scss";
import data from "../../data.json";
import ItemBox from "../ItemBox/ItemBox";
// import Filter from "../Filter/Filter";
import * as JsSearch from "js-search";

class MobilesPage extends Component {
  state = {
    mobileNames: [],
    mobilesObj: {},
    filtered: [],
    error: false,
    companyName: "",
    jsSearch: null,
		isPriceAsceding: true,
		isHome: false
  };

  componentDidMount() {
		let companyName = this.props.match?.params?.id || this.props.id;
    if (companyName && data.mobiles[companyName]) {
      let companyData = data.mobiles[companyName];
      this.setState({
        mobileNames: Object.keys(companyData),
        mobilesObj: companyData,
        companyName,
        filtered: Object.keys(companyData)
      });
    } else {
      this.setState({ error: true });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
		if ((nextProps.id && nextProps.id !== prevState.companyName) || (nextProps.match?.params?.id !== undefined && nextProps.match.params.id !== prevState.companyName)) {
      let companyName = nextProps.id || nextProps.match?.params?.id;
      if (companyName && data.mobiles[companyName]) {
				console.log("Inside getDerivedStateFromProps: props changed!");
        let companyData = data.mobiles[companyName];
        return {
          mobileNames: Object.keys(companyData),
          mobilesObj: companyData,
          filtered: Object.keys(companyData),
          companyName,
          jsSearch: null
        };
      }
      return {
        error: true
      };
    }
    return prevState;
  }

  sortByPrice = ascending => {
    console.log("Sort by price called. Ascending? ", ascending);
    let keys = this.state.filtered;
    if (!ascending) keys.sort((a, b) => this.sortingComparator(a, b)).reverse();
    else keys.sort((a, b) => this.sortingComparator(a, b));
    console.log(keys);
    this.setState({ filtered: keys, isPriceAsceding: ascending });
  };

  sortingComparator = (a, b, companyData) => {
    if (!companyData) companyData = this.state.mobilesObj;
    if (!companyData[a] || !companyData[b]) {
			return 1;
		}
    if (parseInt(companyData[a].price) > parseInt(companyData[b].price)) return 1;
    return -1;
  };

  initSearch = query => {
    let jsSearch = new JsSearch.Search("name");
    jsSearch.addIndex("name");
    jsSearch.addIndex("company");
    jsSearch.addIndex("price");
    jsSearch.addIndex("keys");
    jsSearch.addIndex(["description", "Front Camera"]);
    jsSearch.addIndex(["description", "Rear Camera"]);
    jsSearch.addIndex(["description", "Memory"]);
    jsSearch.addIndex(["description", "RAM"]);
    jsSearch.addIndex(["description", "Screen"]);
    let docs = [];
    this.state.mobileNames.map(mobile => {
      docs.push({
        ...this.state.mobilesObj[mobile],
        company: this.state.companyName,
        keys: JSON.stringify(
          Object.keys(this.state.mobilesObj[mobile].description)
        )
      });
    });
		jsSearch.addDocuments(docs);
		console.log("Inside initSearch: ", jsSearch);
    this.setState({ jsSearch: jsSearch }, () => {
			if(this.state.jsSearch)
				this.search(query);
    });
  };

  search = (query = "") => {
    if (!this.state.jsSearch) this.initSearch(query);
    else {
      let filteredNames = [];
      if (query.trim() == "") filteredNames = this.state.mobileNames;
      else {
        let filteredNamesArr = this.state.jsSearch.search(query);
        filteredNamesArr.map(obj => {
          filteredNames.push(obj.name);
        });
      }
      if (!this.state.isPriceAsceding)
        filteredNames.sort((a, b) => this.sortingComparator(a, b)).reverse();
      else filteredNames.sort((a, b) => this.sortingComparator(a, b));
      this.setState({ filtered: filteredNames });
    }
    // console.log(this.state.jsSearch.search(e.target.value));
  };

  render() {
    let mobileList = <span className={styles.noMobile}>No mobiles found!</span>;
    if (!this.state.error && this.state.filtered.length > 0) {
      mobileList = (
        <ListGroup>
          {this.state.filtered.map((uuid, index) => {
            return (
              <ListGroup.Item key={uuid}>
                <ItemBox data={this.state.mobilesObj[uuid]} uuid={uuid}></ItemBox>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    }
    return (
      <Fragment>
        <div className={styles.container}>
          <span className={styles.heading}>{this.state.companyName}</span>
          <div className={styles.content}>
            {/* <Filter
              companyName={this.state.companyName}
              searchFunc={this.search}
              sortFunc={this.sortByPrice}
            /> */}
            {mobileList}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MobilesPage;
