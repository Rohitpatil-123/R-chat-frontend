import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./Messageform.css";
import io from "socket.io-client";
import { useState } from "react";
import "./Messageform.css";
import Pho from "../assets/icon.png";
import { useSelector } from "react-redux";
import { useAddmessageMutation } from "../redux/services/userApi";
import { useDispatch } from "react-redux";
import { selected } from "../redux/slices/upuserslice.js";
import { useMessagesMutation } from "../redux/services/userApi";

const Messageform = () => {
  const messages1 = useSelector((state) => state.upuser);
  const user = useSelector((state) => state.user);
  const pluser = useSelector((state) => state.pluser);
  const [addmessage] = useAddmessageMutation();
  const [messages] = useMessagesMutation();
  const dispatch = useDispatch();

  //   const socket = io.connect("http://localhost:5000");
  const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     socket.emit("userid", socket.id);
  //     socket.on("recmsg", (data) => {
  //       console.log(data);
  //     });
  //   }, []);
  const handlesubmit = (e) => {
    e.preventDefault();

    //   socket.emit("message", message);
    const data = {
      user1id: user.user._id,
      user2id: pluser.enduser._id,
      message: message,
    };
    console.log(data);
    addmessage(data).then((res) => {
      console.log(res);
      dispatch(selected(res.data.messages));
      setMessage("");
    });
  };
  useEffect(() => {}, [messages1, message]);
  return (
    <>
      <div className="d-flex justify-content-between gap-2 align-items-start mb-2 rounded-3">
        <img
          src={pluser.enduser.picture}
          alt="anu"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid black",
          }}
        />
        <div className="me-auto fw-bold p-1 mt-1">{pluser.enduser.name}</div>
      </div>
      <div className="message-output">
        {messages1.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            start messaging
          </div>
        ) : (
          messages1.map((message) => {
            return (
              <div
                className={
                  message.author._id === user.user._id ? "msg" : "msg-user"
                }
              >
                <img
                  src={message.author.picture}
                  alt="anu"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                />
                <div
                  className={
                    message.author._id === user.user._id
                      ? "message-user"
                      : "message"
                  }
                >
                  <div className="message-text">{message.message}</div>
                </div>
                <div className="message-time">{message.date.slice(11, 16)}</div>
              </div>
            );
          })
        )}
      </div>
      {/* onSubmit={handlesubmit} */}
      <Form>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              onClick={handlesubmit}
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
