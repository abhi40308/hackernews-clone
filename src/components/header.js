import React from "react";
import { withRouter } from "react-router";
import { Navbar, Container, Row, Col } from "react-bootstrap";

function Header() {
  return (
    <div className="header">
      <Container className="navbar">
        <Navbar>
          <Row>
            <Col className="fw">Hacker News</Col>
          </Row>
        </Navbar>
      </Container>
    </div>
  );
}

export default withRouter(Header);
