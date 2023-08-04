import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../assets/logorp.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/services/userApi.js";
import { Unauthenticated } from "../redux/slices/userslice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function Navigation() {
  const [logout, responseInfo] = useLogoutMutation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    if (responseInfo.isSuccess) {
      toast("logged out succesfully");
      dispatch(Unauthenticated());
      navigate("/login");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={Logo} alt="anu" style={{ width: 50, height: 50 }} />{" "}
            &nbsp;R-chat
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {Object.keys(user).length === 0 ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/chat">
                  <Nav.Link>Chat</Nav.Link>
                </LinkContainer>

                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.user.picture}
                        alt="anu"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          marginRight: 10,
                          objectFit: "cover",
                        }}
                      />

                      <b> {user.user.name}</b>
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/">
                    <Button variant="danger" onClick={handlelogout}>
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
