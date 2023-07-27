import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Row>
        <Col md={5} className="login_bg"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column "
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
              <p className="text-center">
                {" "}
                don't have account ? <Link to="/register">Register</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
