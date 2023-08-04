import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./Register.css";
import Ic from "../assets/icon.png";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/services/userApi";
import { useDispatch } from "react-redux";
import { Authenticated } from "../redux/slices/userslice.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [register, responseInfo] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlechange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert("file size too large");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "chat-app");
    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/drnexksco/image/upload",
        data
      );
      setUploading(false);
      return res.data.url;
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("please select an image");
    const url = await uploadImage(image);
    const data = { name, email, password, picture: url };
    register(data).then((res) => {
      if (res.data.success) {
        toast("registered succesfully");
        dispatch(Authenticated(res.data.data));
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);
        navigate("/chat");
      } else {
        toast(res.data.message);
      }
    });

    // toast("registered succesfully");
    //   dispatch(Authenticated());
    //   setName("");
    //   setEmail("");
    //   setPassword("");
    //   setImage(null);
    //   navigate("/chat");
    // const res = await axios.post(
    //   "http://localhost:5000/user/register",
    //   {
    //     name,
    //     email,
    //     password,
    //     picture: url,
    //   },
    //   {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   }
    // );
    // if (res.data.success) {
    //   toast("registered succesfully");
    //   setName("");
    //   setEmail("");
    //   setPassword("");
    //   setImage(null);
    // } else {
    //   toast(res.data.message);
    // }
  };

  return (
    <>
      <Container>
        <Row>
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column "
          >
            <Form
              style={{ width: "80%", maxWidth: 500 }}
              onSubmit={handlesubmit}
            >
              <p className="text-center">Create Account</p>
              <div className="signup_profile">
                <img src={imagePreview || Ic} alt="jnxs" className="signuppr" />
                <label htmlFor="Image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input
                  type="file"
                  id="Image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={handlechange}
                  className="image-upload"
                />
              </div>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {uploading ? "Signing you up..." : "Create Account"}
              </Button>
              <div className="py-4">
                <p className="text-center">
                  {" "}
                  Already have account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5} className="reg_bg"></Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Register;
