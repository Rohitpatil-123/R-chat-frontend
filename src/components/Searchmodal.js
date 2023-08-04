import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "./searchmodal.css";
import Pht from "../assets/icon.png";
import { ListGroup } from "react-bootstrap";
import { useUsersMutation } from "../redux/services/userApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCreatechatMutation } from "../redux/services/userApi";
import { selected } from "../redux/slices/upuserslice.js";

const Searchmodal = (props) => {
  const [search, setSearch] = useState("");
  const [userlist, setUserlist] = useState([]);
  const [users] = useUsersMutation();
  const dispatch = useDispatch();
  const [createchat] = useCreatechatMutation();
  const userm = useSelector((state) => state.user);
  const handlesubmit = (e) => {
    console.log(search);
    users(search).then((res) => {
      setUserlist(res.data.data);
    });
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search Friends
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search users"
            aria-label="Search users"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button variant="success" id="button-addon2" onClick={handlesubmit}>
            Search
          </Button>
        </InputGroup>
        <hr />
        <div className="users">
          <ListGroup as="ol" className="p-1">
            {userlist.length === 0 ? (
              <div className="text-center">no users</div>
            ) : (
              userlist.map((user) => {
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between mb-2"
                    key={user._id}
                  >
                    <div className="d-flex gap-2 align-items-start">
                      <img
                        src={user.picture ? user.picture : Pht}
                        alt="anu"
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                      />
                      <div className="fw-bold p-1 mt-1">{user.name}</div>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        let user1id = user._id;
                        let user2id = userm.user._id;
                        const data = { user1id, user2id };
                        createchat(data).then((res) => {
                          dispatch(selected(res.messages));
                        });
                      }}
                    >
                      Add <i class="fas fa-add"></i>
                    </Button>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Searchmodal;
