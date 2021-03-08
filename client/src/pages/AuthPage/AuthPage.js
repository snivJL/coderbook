import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import api from "../../redux/api";
import {
  Col,
  Row,
  Card,
  Form,
  Modal,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";

import { authActions } from "../../redux/actions";

import Footer from "../../components/Footer";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);

  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(user.email, user.password));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.register(user.name, user.email, user.password));
  };
  const onChange = (e) => {
    console.log(user);
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const oauthLogin = async (user, authProvider) => {
    console.log(user);
    const access_token = user.accessToken;
    const url = `/auth/login/${authProvider}`;
    const res = await api.post(url, { access_token });
    const newUser = res.data.user;
    if (newUser) {
      newUser.authenticated = true;
      newUser.provider = authProvider;
      setUser(newUser);
    }
  };
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Coderbook - Login or Sign Up</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container
        fluid
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      >
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center align-items-md-start">
            <h1 className="text-primary text-sm-left">coderbook</h1>
            <p className="header">
              Coderbook let's you share with your friends and family.
            </p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Card style={{ width: "30rem" }} className="p-3 box-shadow">
              <Form className="d-flex flex-column justify-content-center align-content-center text-align-center">
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    onChange={onChange}
                    placeholder="Email or Phone Number"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </Form.Group>
                <Button
                  block
                  type="submit"
                  variant="primary"
                  onClick={onLogin}
                  className="font-weight-bold"
                >
                  Login
                </Button>
                <Form.Group
                  className="mx-auto mt-3"
                  controlId="formBasicPassword"
                >
                  <Link className="" to="#">
                    Forgot Password?
                  </Link>
                </Form.Group>
                <hr className="hr" />
                <Button
                  type="submit"
                  variant="success"
                  onClick={onToggleModal}
                  className="mx-auto w-50 font-weight-bold"
                >
                  Create an account
                </Button>
                <Form.Group className="d-flex py-4 w-100">
                  <FacebookLogin
                    className="w-30 mx-auto font-weight-bold pr-4"
                    appId={FB_APP_ID}
                    icon="fa-facebook"
                    fields="name,email,picture"
                    callback={(u) =>
                      dispatch(authActions.loginFacebookRequest(u))
                    }
                    onFailure={() => console.log("Facebook Login Failure")}
                  />
                  <GoogleLogin
                    className="w-30 mx-auto  font-weight-bold "
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={(u) =>
                      dispatch(authActions.loginGoogleRequest(u))
                    }
                    onFailure={() => console.log("Google Login Failure")}
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        dialogClassName="modal-90w"
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header>
          <Modal.Title>
            Sign Up
            <p className="text-secondary font-weight-light p-modal">
              It's quick and easy.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* STEP 1 */}
          <Form
            onSubmit={onSubmit}
            className="d-flex flex-column justify-content-center"
          >
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={onChange}
                  type="text"
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={onChange}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={onChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form.Row>
            <p className="text-center p-terms">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookie Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <Button className="mx-auto w-50" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
}
