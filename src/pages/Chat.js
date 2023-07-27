import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Messageform from "../components/Messageform";

const Chat = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <Messageform />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
