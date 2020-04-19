import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

import styles from "./CartItem.module.scss";
import { addToCart, removeFromCart } from "../../../store/actions";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  qtyHandler = (e) => {
    const qty = parseInt(e.target.value);
    console.log(e.target.value, qty);
    if (!qty) return;
    this.props.updateQty(this.props.prodCode, qty);
	};

	deleteHandler = (e) => {
		e.preventDefault();
		this.props.deleteItem(this.props.prodCode);
	}

  render() {
    if (!this.props.data) return null;

    let cashback = null;
    if (this.props.data.cashback)
      cashback = (
        <span className={styles.cashback}>
          Cashback offer: {this.props.data.cashback}
        </span>
      );

    return (
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage:
              "url('https://www.91-img.com/pictures/126032-v9-samsung-galaxy-s10-mobile-phone-large-1.jpg')",
          }}
        />
        <div className={styles.content}>
          <span className={styles.itemName}>
            {this.props.data.company} {this.props.data.name}
          </span>
          <div className={styles.priceDiv}>
            <span className={styles.mrp}> {this.props.data.mrp}</span>
            <span className={styles.price}>{this.props.data.price}</span>
          </div>
          <span className={styles.discount}>
            {((1 - this.props.data.price / this.props.data.mrp) * 100).toFixed(
              2
            )}
            % off!
          </span>
          {cashback}
					<span className={`${styles.qtySpan} mobile-only`}>
						Qty: {this.props.quantity}
					</span>
          <Form className="desktop-only">
            <Form.Group
              controlId="form.quantitySelect"
              className={styles.qtyForm}
            >
              <Form.Control
                as="select"
                custom
                className={styles.qtySelect}
                defaultValue={this.props.quantity}
                onChange={this.qtyHandler}
              >
                <option value="1">Qty: 1</option>
                <option value="2">Qty: 2</option>
                <option value="3">Qty: 3</option>
                <option value="4">Qty: 4</option>
                <option value="5">Qty: 5</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <button className={styles.deleteItem} type="button" onClick={this.deleteHandler}>
          <TrashFill size="20px" style={{ marginRight: "5px" }} />
          <span>Delete</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
		updateQty: (prodCode, qty) => dispatch(addToCart(prodCode, qty)),
		deleteItem: (prodCode) => dispatch(removeFromCart(prodCode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
