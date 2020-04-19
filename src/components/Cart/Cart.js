import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import CartItem from "./CartItem/CartItem";
import styles from "./Cart.module.scss";
import data from "../../data.json";

class Cart extends Component {
  state = {
    totalPrice: 0,
    totalMrp: 0,
  };

  componentDidMount() {
    const cart = this.props.cart;
    let totalPrice = 0,
      totalMrp = 0;
    Object.keys(cart).map((uuid) => {
      const prod = this.getProduct(uuid);
      totalPrice += prod.price * cart[uuid];
      totalMrp += prod.mrp * cart[uuid];
    });

    this.setState({ totalPrice, totalMrp });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
		console.log("[Cart.js] State updated");
    const cart = nextProps.cart;
    let totalPrice = 0,
      totalMrp = 0;
    Object.keys(cart).map((uuid) => {
      const mobiles = data.mobiles;
      let prod = null;
      for (const company in mobiles) {
        if (mobiles[company][uuid]) prod = mobiles[company][uuid];
			}
			if (prod!=null) {
				totalPrice += prod.price * cart[uuid];
				totalMrp += prod.mrp * cart[uuid];
			}
		});
		if (prevState.totalPrice !== totalPrice || prevState.totalMrp !== totalMrp) {
			return {totalMrp, totalPrice};
		}

		return {};
  }

  getProduct = (prodCode) => {
    const mobiles = data.mobiles;
    for (const company in mobiles) {
      if (mobiles[company][prodCode]) return mobiles[company][prodCode];
    }
    return null;
	};

	buyHandler = e => {
		e.preventDefault();
	}

  render() {
    if (JSON.stringify(this.props.cart) === "{}") {
      return (
        <div className={styles.container}>
          Your cart is empty. Start shopping!
        </div>
      );
    }

    return (
      <div className={styles.container}>
				<h1 className="mobile-only">Cart</h1>
        <div className={styles.main}>
          {Object.keys(this.props.cart).map((prodCode) => (
            <CartItem
              data={this.getProduct(prodCode)}
              quantity={this.props.cart[prodCode]}
              key={prodCode}
              prodCode={prodCode}
            ></CartItem>
          ))}
        </div>
        <div className={styles.sidebar}>
          <span className={styles.totalPrice}>{this.state.totalPrice}</span>
          <span className={styles.totalMrp}>{this.state.totalMrp}</span>
          <span className={styles.totalSavings}>
            You are saving &#8377;{this.state.totalPrice - this.state.totalMrp}!
          </span>
					<Button variant="success" className={styles.buyBtn} onClick={this.buyHandler}>
						Buy Now
					</Button>
        </div>
				<Button variant="success" className={styles.buyBtnMobile} onClick={this.buyHandler}>
					<span>Buy Now</span>
				</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
