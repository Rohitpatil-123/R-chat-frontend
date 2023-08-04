import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Authenticated, Unauthenticated } from "../redux/slices/userslice.js";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/userApi.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, responseInfo] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      login(data).then((res) => {
        if (res.data.success) {
          toast("logged in succesfully");
          dispatch(Authenticated(res.data.data));
          navigate("/chat");
        } else {
          toast("invalid credentials");
        }
      });
    } catch (error) {
      toast("invalid credentials");
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={5} className="login_bg"></Col>
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column "
          >
            <Form
              style={{ width: "80%", maxWidth: 500 }}
              onSubmit={handlesubmit}
            >
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
      <ToastContainer />
    </>
  );
}

export default Login;
