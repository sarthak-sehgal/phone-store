import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  Spinner,
  Form,
  Button,
  Container,
  Row,
} from "react-bootstrap";
import { Formik } from "formik";
import app from "firebase/app";
import styles from "./SignIn.module.scss";

class SignIn extends Component {
  state = {
    btnDisabled: false,
    isError: false,
    errorMsg: "",
    isOtp: false,
    confirmResult: null,
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  signInHandler = (values) => {
    if (this.state.btnDisabled) return;
    this.setState({ btnDisabled: true, isError: false });

    if (this.state.isOtp) {
      if (!this.state.confirmResult) {
        this.setState({
          isError: true,
          errorMsg: "Some error occurred. Please go back and try again.",
        });
        return;
      }

      const otp = values.otp;
      this.state.confirmResult
        .confirm(otp)
        .then((result) => {
          console.log("Signed in!");
          console.log(result);
          this.setState({ btnDisabled: false });
        })
        .catch((error) => {
					console.log(error);
          let errorMsg = "Some error occurred. Please go back and try again.";
          if (error.code == "auth/invalid-verification-code")
            errorMsg = "Incorrect OTP. Please try again.";
          this.setState({ btnDisabled: false, isError: true, errorMsg });
        });
      return;
    }

    const phoneNum = "+91" + values.phoneNum;
    const appVerifier = window.recaptchaVerifier;

    app
      .auth()
      .signInWithPhoneNumber(phoneNum, appVerifier)
      .then((confirmResult) => {
				console.log(confirmResult);
        // success
        this.setState({ btnDisabled: false, isOtp: true, confirmResult });
        this.inputRef.current.value = "";
      })
      .catch((error) => {
				console.log(error);
        // error
        let errorMsg = "Some error occurred. Please try again.";
        if (error.code == "auth/invalid-phone-number")
          errorMsg = "Please enter a valid number.";
        // reset reCaptcha
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaVerifier.reset(widgetId);
        });

        this.setState({ btnDisabled: false, isError: true, errorMsg });
      });
  };

  cancelHandler = () => {
    if (this.state.btnDisabled) return;
    this.setState({ confirmResult: null, isOtp: false, isError: false });
    this.inputRef.current.value = "";
  };

  componentDidMount() {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier("recaptcha-div", {
      size: "invisible",
      callback: function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.signInHandler();
      },
    });
  }

  render() {
    let signInBtn = <Button type="submit">Sign In</Button>;
    if (this.state.btnDisabled) {
      signInBtn = <Spinner animation="border" variant="primary" />;
    }

    let errorMsg = null;
    if (this.state.isError) {
      errorMsg = (
        <p className={styles.errorMsg}>
          {this.state.errorMsg}
        </p>
      );
    }

    let cancelBtn = null;
    if (this.state.isOtp && !this.state.btnDisabled) {
      cancelBtn = (
          <Button
            type="button"
            onClick={this.cancelHandler}
            variant="secondary"
            disabled={this.state.btnDisabled}
          >
            Cancel
          </Button>
      );
    }

    return (
      <div className={styles.container}>
        <h3>Sign In</h3>
        <Formik
          onSubmit={this.signInHandler}
          initialValues={{
            phoneNum: "",
          }}
          validate={(values) => {
            const errors = {};
            if (values.phoneNum.trim() === "")
              errors.phoneNum = "Please enter a number";
            else if (!/^\d{10}$/.test(values.phoneNum))
              errors.phoneNum = "Please enter a valid number";
            return errors;
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group controlId="validationFormikPhone">
                  <InputGroup className={styles.inputGroup}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="prepend">
                        {this.state.isOtp ? "OTP" : "+91"}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      name={this.state.isOtp ? "otp" : "phoneNum"}
                      aria-describedby="prepend"
                      placeholder={
                        this.state.isOtp ? "Enter OTP" : "Your 10-digit mobile"
                      }
                      onChange={handleChange}
                      isInvalid={
                        this.state.isOtp
                          ? false
                          : touched.phoneNum && !!errors.phoneNum
                      }
                      ref={this.inputRef}
                    />
                  </InputGroup>
                  {/* <Form.Control.Feedback type="invalid">
                    {errors.phoneNum}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>
              {errorMsg}
              <Container>
                <Row className={styles.btnRow}>
                  {cancelBtn}
                  {signInBtn}
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
        <div id="recaptcha-div"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
