import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Nav, Form, Navbar, FormControl, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";

import logo from "../../assets/site-identity.png";
import { authActions } from "../../redux/actions";
import { postActions } from "../../redux/actions/post.actions";

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActions.postsRequest(undefined, undefined, searchTerm));
  };
  const authLinks = (
    <Nav>
      <Link to={`/${user._id}`}>
        <div className="">
          <img className="w-100 rounded-circle" src={user.avatarUrl} alt="" />
          {/* <FontAwesomeIcon icon="user" size="lg" /> */}
        </div>
      </Link>
      <Nav.Link href="#create">
        <div className="nav-icon">
          <FontAwesomeIcon icon={"plus"} size="lg" />
        </div>
      </Nav.Link>
      <Nav.Link href="#messages">
        <div className="nav-icon">
          <FontAwesomeIcon icon={["fab", "facebook-messenger"]} size="lg" />
        </div>
      </Nav.Link>
      <Nav.Link href="#notificaions">
        <div className="nav-icon">
          <FontAwesomeIcon icon="bell" size="lg" />
        </div>
      </Nav.Link>
      <NavDropdown
        alignRight
        id="dropdown-basic"
        title={
          <div className="nav-icon">
            <FontAwesomeIcon icon="cog" size="lg" />
          </div>
        }
      >
        <NavDropdown.Item href="#action/3.1">{user.name}</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout} href="#action/3.4">
          Log out
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/auth">
        <FontAwesomeIcon icon="registered" size="sm" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/auth">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg" className="sticky-top box-shadow">
      <Navbar.Brand as={Link} to="/" className="mr-auto ">
        <img src={logo} alt="coderbook" width="50px" />
      </Navbar.Brand>
      <Form onSubmit={(e) => handleSubmit(e)} inline className="ml-5 w-100">
        <FormControl
          onChange={handleChange}
          type="text"
          placeholder="Search"
          className="mr-sm-2 rounded-pill border-0 rounded-md search-bar"
        />
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
