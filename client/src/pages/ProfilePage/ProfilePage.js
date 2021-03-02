import React from "react";

import { Row, Col, Nav, Button, Container, ButtonGroup } from "react-bootstrap";

import "./style.css";

import Composer from "../../components/Composer/Composer";

export default function ProfilePage() {
  return (
    <div>
      <Row className="centered hero">
        <Container className="d-flex align-items-center justify-content-center p-0">
          <img
            alt="lighthouse"
            className="cover"
            src="https://images.unsplash.com/photo-1614248550370-1456f7da781f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2389&q=80"
          />
          <img
            alt="profile"
            className="rounded-circle cover-profile-photo"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          />
        </Container>
        <hr className="w-75" />
      </Row>
      <Row className="bg-white rounded profile-nav">
        <Container className="centered">
          <Container>
            <Nav
              activeKey="/posts"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <Nav.Link href="/posts">Posts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/friends">Friends</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/photos">Photos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/more">More</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>

          <Container>
            <ButtonGroup
              className="d-flex p-2 align-items-between justify-content-between"
              aria-label="First group"
            >
              <Button variant="light">Edit</Button>
              <Button variant="light">View As</Button>
              <Button variant="light">Search</Button>
              <Button variant="light">Settings</Button>
            </ButtonGroup>
          </Container>
        </Container>
      </Row>
      <Row className="mt-3 profile-content">
        <Col className="d-flex justify-content-end">
          <h1>Sidebar</h1>
        </Col>
        <Col className="d-flex posts-col">
          <Col md="8">
            <Composer />
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
          </Col>
          <Col></Col>
        </Col>
      </Row>
    </div>
  );
}
