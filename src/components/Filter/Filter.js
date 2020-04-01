import React, { Component } from "react";
import styles from "./Filter.module.scss";
import { TextInput, Switch, Dropdown, Icon, Button, Divider } from "react-materialize";

class Filter extends Component {
  state = {
		isMobile: false,
		companyName: "",
		searchQuery: ""
  };
  componentDidMount() {
    let win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName("body")[0],
      width = win.innerWidth || docElem.clientWidth || body.clientWidth;

		if (width <= 600) this.setState({ isMobile: true });
		this.setState({companyName: this.props.companyName});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.companyName !== prevState.companyName) {
			return {
				companyName: nextProps.companyName,
				searchQuery: ""
			}
		}
		return prevState;
	}

	searchHelper = (e) => {
		this.setState({searchQuery: e.target.value});
		this.props.searchFunc(e.target.value);
	}

	hrefHandler = (e) => {
		e.preventDefault();
		if (e.target.id == "ltoh")
			this.props.sortFunc(true);
		if (e.target.id == "htol")
			this.props.sortFunc(false);
	}

  render() {
    // let switchComponent = (
    //   <Switch
    //     id="Switch-11"
    //     offLabel="Low to High"
    //     onChange={function noRefCheck() {}}
    //     onLabel="High to Low"
    //   />
    // );

    // if (this.state.isMobile) {
    //   switchComponent = (
    //     <Dropdown
    //       id="Dropdown_6"
    //       options={{
    //         alignment: "left",
    //         autoTrigger: true,
    //         closeOnClick: true,
    //         constrainWidth: true,
    //         container: null,
    //         coverTrigger: true,
    //         hover: false,
    //         inDuration: 150,
    //         onCloseEnd: null,
    //         onCloseStart: null,
    //         onOpenEnd: null,
    //         onOpenStart: null,
    //         outDuration: 250
    //       }}
    //       trigger={<div className={styles.filtersIconDiv}>Filters<Icon>more_vert</Icon></div>}
    //     >
    //       <a href="#">Price: Low to High</a>
		// 			<a href="#">Price: High to Low</a>
    //     </Dropdown>
    //   );
    // }

    return (
      <div className={styles.container}>
        <TextInput value={this.state.searchQuery} id="seach-bar" placeholder="Search phone" onChange={this.searchHelper} />
        <Dropdown
          id="filterDopdown"
          options={{
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
          }}
          trigger={<div className={styles.filtersIconDiv}>Filters<Icon>more_vert</Icon></div>}
        >
          <a href="" onClick={this.hrefHandler} id="ltoh">Price: Low to High</a>
					<a href="" onClick={this.hrefHandler} id="htol">Price: High to Low</a>
        </Dropdown>
      </div>
    );
  }
}

export default Filter;
