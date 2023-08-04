import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import "./sidebar.css";
import SearchModal from "./Searchmodal";
import { useState } from "react";
import { useMyusersMutation } from "../redux/services/userApi";
import { useSelector } from "react-redux";
import { useMessagesMutation } from "../redux/services/userApi";
import { useDispatch } from "react-redux";
import { selected } from "../redux/slices/upuserslice.js";
import { Assign } from "../redux/slices/pluserslice";
import { usePertiuserMutation } from "../redux/services/userApi";

const Sidebar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [userlist, setUserlist] = useState([]);
  const [myusers] = useMyusersMutation();
  const [pertiuser] = usePertiuserMutation();
  const user = useSelector((state) => state.user);
  let userid = user.user._id;
  const [messages] = useMessagesMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    myusers().then((res) => {
      setUserlist(res.data.data);
    });
  }, [myusers]);
  return (
    <>
      <div>
        <div className="heading">
          <div className="head">Chats </div>
          <div className="search" onClick={() => setModalShow(true)}>
            <i class="fas fa-search"></i>
          </div>
          <SearchModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <div className="sidebar">
          <ListGroup as="ol" className="p-1">
            {userlist.length === 0 ? (
              <div className="text-center">no chats</div>
            ) : (
              userlist.map((user) => {
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start mb-2 "
                    style={{ cursor: "pointer" }}
                    key={user._id}
                    onClick={() => {
                      let user1id = user.users[0]._id;
                      let user2id = user.users[1]._id;
                      const data = { user1id, user2id };
                      messages(data).then((res) => {
                        dispatch(selected(res.data.data));
                      });

                      if (user1id == userid) {
                        const d = { id: user2id };
                        pertiuser(d).then((res) => {
                          dispatch(Assign(res.data.data));
                        });
                      } else {
                        const d = { id: user1id };

                        pertiuser(d).then((res) => {
                          dispatch(Assign(res.data.data));
                        });
                      }
                    }}
                  >
                    <img
                      src={
                        user.users.filter((data) => data._id !== userid)[0]
                          .picture
                      }
                      alt="anu"
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    />
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {user.users.map((data) => {
                          return <>{data._id === userid ? null : data.name}</>;
                        })}
                      </div>
                      {user.messages.length == 0
                        ? ""
                        : user.messages[user.messages.length - 1].message}
                    </div>
                    {/* <Badge bg="primary" pill>
                      14
                    </Badge> */}
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
