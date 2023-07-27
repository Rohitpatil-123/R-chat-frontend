import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
const Home = () => {
  return (
    <Container>
      <Row>
        <Col
          md={6}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <div>
            <h1 className="text-center">share the world with your friends</h1>

            <p>chat app lets you connect with world</p>
            <LinkContainer to="/chat">
              <Button variant="success">
                Get started{" "}
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={6} className="home_bg"></Col>
      </Row>
    </Container>
  );
};

export default Home;
