import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./ItemBox.module.scss";
import { BASE_URL } from "../../serverConfig";
import { addToCart, toggleToast } from "../../store/actions";

class ItemBox extends Component {
  constructor(props) {
    super(props);
	}

	state = {
		disabled: false
	}

	componentDidMount () {
		if (this.props.cart[this.props.uuid])
			this.setState({disabled: true});
	}

	addToCartHandler = (uuid) => {
		const cart = this.props.cart || {};
		this.setState({disabled: true});

		if (cart[uuid] !== undefined) {
			this.props.showToast("Item already in cart!");
			return;
		}

		this.props.addToCart(uuid);
		this.props.showToast("Item added to cart!");
	}

  render() {
    if (!this.props.data || JSON.stringify(this.props.data) == "{}")
      return (
        <Fragment>
          <div className={styles.container}>
            Some error occurred. Please refresh.
          </div>
        </Fragment>
      );

    let cashback = null;
    if (this.props.data.cashback)
      cashback = (
        <span className={styles.cashback}>
          Cashback offer: {this.props.data.cashback}
        </span>
      );

    return (
      <Fragment>
        <div className={styles.container}>
          <div
            className={styles.image}
            style={{
              backgroundImage:
                "url('https://www.91-img.com/pictures/126032-v9-samsung-galaxy-s10-mobile-phone-large-1.jpg')",
            }}
          />
          <div className={styles.content}>
            <span className={`${styles.name} desktop-only`}>
              {this.props.data.name}
            </span>
            <ul className={styles.description}>
              {Object.keys(this.props.data.description).map((key) => {
                if (!this.props.data.description[key]) return null;
                if (key == "url") {
                  return (
                    <li className={styles.part} key={key}>
                      <a
                        href={this.props.data.description[key]}
                        target="_blank"
                        rel="noopener"
                      >
                        Learn More
                      </a>
                    </li>
                  );
                }
                return (
                  <li className={styles.descItem} key={key}>
                    <span className={styles.part}>{key}: </span>
                    <span className={styles.partDesc}>
                      {this.props.data.description[key]}
                    </span>
                  </li>
                );
              })}
            </ul>
						<Button variant="success" className={`${styles.cartMobileBtn} mobile-only`} onClick={() => this.addToCartHandler(this.props.uuid)} disabled={this.state.disabled}>
            	{!this.state.disabled ? "Add to Cart" : "Item in cart"}
          	</Button>
          </div>
          <div className={styles.priceDiv}>
            <span className={`${styles.name} mobile-only`}>
              {this.props.data.name}
            </span>
            <span className={styles.price}>{this.props.data.price}</span>
            {/* {this.props.data.mrp - this.props.data.price > 0 ? (
							<Fragment>
								<span className={styles.mrp}> {this.props.data.mrp}</span>
								<span className={styles.discount}>{((1 - this.props.data.price/this.props.data.mrp)*100).toFixed(2)}% off!</span>
							</Fragment>
						) : null} */}
            <span className={styles.mrp}> {this.props.data.mrp}</span>
            <span className={styles.discount}>
              {(
                (1 - this.props.data.price / this.props.data.mrp) *
                100
              ).toFixed(2)}
              % off!
            </span>
            {cashback}
            <Button variant="success" className={`${styles.cartDesktopBtn} desktop-only`} onClick={() => this.addToCartHandler(this.props.uuid)} disabled={this.state.disabled}>
						{!this.state.disabled ? "Add to Cart" : "Item in cart"}
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
		cart: state.cart.cart
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
		addToCart: (uuid) => dispatch(addToCart(uuid, 1)),
		showToast: (message) => dispatch(toggleToast(true, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemBox);
