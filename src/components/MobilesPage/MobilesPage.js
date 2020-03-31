import React, { Component, Fragment } from "react";
import { Collection, CollectionItem, Row, Col } from "react-materialize";
import styles from "./MobilesPage.module.scss";
import data from "../../data.json";
import ItemBox from "../ItemBox/ItemBox";

class MobilesPage extends Component {
  state = {
    mobileNames: [],
    mobilesObj: {}
  };

  componentDidMount() {
    if (this.props.match.params.id && data.mobiles[this.props.match.params.id])
      this.setState({
        mobileNames: Object.keys(data.mobiles[this.props.match.params.id]),
        mobilesObj: data.mobiles[this.props.match.params.id]
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      mobileNames: Object.keys(data.mobiles[nextProps.match.params.id]),
			mobilesObj: data.mobiles[nextProps.match.params.id]
    };
  }

  render() {
    let mobileList = <div>No mobile found.</div>;
    if (this.state.mobileNames.length > 0) {
      mobileList = (
        <Collection>
          {this.state.mobileNames.map(name => {
            return (
              <CollectionItem key={name}>
                <ItemBox data={this.state.mobilesObj[name]}></ItemBox>
              </CollectionItem>
            );
          })}
        </Collection>
      );
    }
    return (
      <Fragment>
        <div className={styles.container}>
          <div className={styles.content}>
            <div>Filter comes here</div>
            {mobileList}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MobilesPage;
