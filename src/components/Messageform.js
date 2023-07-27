import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./Messageform.css";

const Messageform = () => {
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="message-output"></div>
      <Form onSubmit={handlesubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter message" />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
            >
              <i class="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Messageform;
