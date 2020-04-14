import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styles from "./CartItem.module.scss";

class CartItem extends Component {
  constructor(props) {
    super(props);
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
          <Form>
            <Form.Group
              controlId="form.quantitySelect"
              className={styles.qtyForm}
            >
              <Form.Control as="select" custom className={styles.qtySelect}>
                <option selected={this.props.quantity==1} value="1">Qty: 1</option>
                <option selected={this.props.quantity==2} value="2">Qty: 2</option>
                <option selected={this.props.quantity==3} value="3">Qty: 3</option>
                <option selected={this.props.quantity==4} value="4">Qty: 4</option>
                <option selected={this.props.quantity==5} value="5">Qty: 5</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default CartItem;
