import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Messageform from "../components/Messageform";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Chat = () => {
  const switchValue = useSelector((state) => state.user);
  const upuser = useSelector((state) => state.upuser);
  // useEffect(() => {}, [upuser]);
  return (
    <>
      {Object.keys(switchValue).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <Container>
          <Row>
            <Col md={4}>
              <Sidebar />
            </Col>
            <Col md={8}>
              {upuser == null ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    fontSize: "1.5rem",
                    color: "grey",
                  }}
                >
                  please select any chat to message
                </div>
              ) : (
                <Messageform />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Chat;
