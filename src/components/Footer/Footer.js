import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import {BASE_URL} from "../../serverConfig";

class FooterComponent extends Component {
  render() {
    return (
      <Container fluid className={styles.container}>
        <Row className={styles.content}>
          <Col>
						<h3>[[ Company Name ]]</h3>
						<p>
							Building Number<br/>
							Street Name<br/>
							Pin Code
						</p>
					</Col>
          <Col>
            <h3>Links</h3>
            <div className={styles.list}>
								<Link to={`${BASE_URL}/locate`} className={styles.listItem}>Locate</Link>
								<Link to={`${BASE_URL}/about`} className={styles.listItem}>About</Link>
								<Link to={`${BASE_URL}/privacy`} className={styles.listItem}>Privacy Policy</Link>
								<Link to={`${BASE_URL}/return`} className={styles.listItem}>Return Policy</Link>
            </div>
          </Col>
        </Row>
        <Row className={styles.copyright}>
        	&copy;2020 Copyright: <span>[[ Company Name ]]</span>
        </Row>
      </Container>
    );
  }
}

export default FooterComponent;
