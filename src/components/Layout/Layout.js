import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Toast } from "react-bootstrap";

import NavBar from "../NavBar/NavBar";
import FooterComponent from "../Footer/Footer";

import styles from "./Layout.module.scss";
import { toggleToast } from "../../store/actions";

class Layout extends React.Component {
  constructor(props) {
    super(props);
	}

  render() {
		const toastStyle = {
			opacity: this.props.toastShow
		}

    return (
      <div className={styles.container}>
        {/* <img className={styles.mobBanner} src={require("../../assets/mobile_banner.png")} alt="Call xxxx for enquiries" /> */}
        <NavBar />
        <main className={styles.content}>{this.props.children}</main>
        <FooterComponent />
        <div
					className={styles.toast}
					style={toastStyle}
        >
          <span>
            {this.props.toastBody}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toastBody: state.ui.toastBody,
    toastShow: state.ui.toastShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeToast: () => dispatch(toggleToast(false)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
