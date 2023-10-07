import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4} md={3} sm={2}></Col>
        <Col lg={4} md={6} sm={8} style={{ margin: "200px auto" }}>
          <Outlet />
        </Col>
        <Col lg={4} md={3} sm={2}></Col>
      </Row>
    </Container>
  );
};

export default HomePage;
