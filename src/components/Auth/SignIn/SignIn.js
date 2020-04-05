import React, { Component, Fragment } from "react";
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
import { auth, BASE_URL } from "../../../serverConfig";
import { Redirect } from "react-router-dom";
import { doesUserExists, loginUser } from "../../../store/actions";
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
    if (this.state.btnDisabled || this.props.authLoading) return;
    this.setState({ btnDisabled: true, isError: false });

    if (this.state.isOtp) {
      if (!this.state.confirmResult) {
        this.setState({
          isError: true,
          errorMsg: "Some error occurred. Please go back and try again.",
          btnDisabled: false,
        });
        return;
      }

      if (
        !values.otp.trim() ||
        !values.firstName.trim() ||
        !values.lastName.trim() ||
        !values.email.trim()
      ) {
        this.setState({
          isError: true,
          errorMsg: "Please enter correct values.",
          btnDisabled: false,
        });
        return;
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        this.setState({
          isError: true,
          errorMsg: "Please enter valid e-mail address.",
          btnDisabled: false,
        });
        return;
      }

      const otp = values.otp;
      delete values.otp;
      this.state.confirmResult
        .confirm(otp)
        .then((result) => {
          console.log("Signed in!");
          console.log(result);

          this.props.loginUser(values, result.user);
        })
        .catch((error) => {
          console.log(error);
          let errorMsg = "Some error occurred. Please go back and try again.";
          if (
            error.code == "auth/invalid-verification-code" ||
            error.code === "auth/missing-verification-code"
          )
            errorMsg = "Incorrect OTP. Please try again.";
          this.setState({ isError: true, errorMsg });
        })
        .finally(() => this.setState({ btnDisabled: false }));
      return;
    }

    const phoneNum = "+91" + values.phoneNum;
    const appVerifier = window.recaptchaVerifier;

    // check if user exists
    this.props.doesUserExists(values);

    auth
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
    if (this.state.btnDisabled || this.props.authLoading) return;
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
    if (this.props.user !== null) {
      return (
        <Redirect to={{ pathname: `${BASE_URL}` }} />
      );
    }

    let signInBtn = <Button type="submit">Sign In</Button>;
    if (this.state.btnDisabled || this.props.authLoading) {
      signInBtn = <Spinner animation="border" variant="primary" />;
    }

    let errorMsg = null;
    if (this.state.isError || this.props.isError) {
      errorMsg = (
        <p className={styles.errorMsg}>
          {this.state.errorMsg || this.props.isError}
        </p>
      );
    }

    let cancelBtn = null;
    if (
      this.state.isOtp &&
      !this.state.btnDisabled &&
      !this.props.authLoading
    ) {
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
            otp: "",
            email: "",
            firstName: "",
            lastName: "",
          }}
          validate={(values) => {
            console.log("validating");
            const errors = {};
            if (values.phoneNum.trim() === "")
              errors.phoneNum = "Please enter a number";
            else if (!/^\d{10}$/.test(values.phoneNum))
              errors.phoneNum = "Please enter a valid number";

            if (values.firstName && values.firstName.trim() === "")
              errors.firstName = true;
            if (values.lastName && values.lastName.trim() === "")
              errors.lastName = true;
            if (values.email && values.email.trim() === "") errors.email = true;
            if (values.otp && values.otp.trim() === "") errors.otp = true;

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
              {this.state.isOtp && this.props.isNewUser ? (
                <Fragment>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Rajesh"
                      onChange={handleChange}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Kumar"
                      onChange={handleChange}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="rajesh@gmail.com"
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                      style={{ marginBottom: "30px" }}
                    />
                  </Form.Group>
                </Fragment>
              ) : null}

              <Form.Group>
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
                        ? touched.otp && !!errors.otp
                        : touched.phoneNum && !!errors.phoneNum
                    }
                    ref={this.inputRef}
                  />
                </InputGroup>
                {/* <Form.Control.Feedback type="invalid">
                    {errors.phoneNum}
                  </Form.Control.Feedback> */}
              </Form.Group>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isError: state.auth.isError,
    errorMsg: state.auth.errorMsg,
    isNewUser: state.auth.isNewUser,
    user: state.auth.user,
    isLoading: state.ui.authLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doesUserExists: (values) => dispatch(doesUserExists(values)),
    loginUser: (values, user) => dispatch(loginUser(values, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
