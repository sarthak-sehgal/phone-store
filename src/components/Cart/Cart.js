import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartItem from './CartItem/CartItem';
import styles from './Cart.module.scss';
import data from "../../data.json";

class Cart extends Component {
	getProduct = (prodCode) => {
		const mobiles = data.mobiles;
		for (const company in mobiles) {
			if (mobiles[company][prodCode])
				return mobiles[company][prodCode];
		}
		return null;
	}

	render () {
		if (JSON.stringify(this.props.cart) === "{}") {
			return (
				<div className={styles.container}>
					Your cart is empty. Start shopping!
				</div>
			)
		}

		return (
			<div className={styles.container}>
				<div className={styles.main}>
					{Object.keys(this.props.cart).map(prodCode => (
						<CartItem data={this.getProduct(prodCode)} quantity={this.props.cart[prodCode]} key={prodCode} prodCode={prodCode}></CartItem>
					))}
				</div>
				<div className={styles.sidebar}>
					col2
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart.cart
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);