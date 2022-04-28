import React, { useEffect, useState } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PrivateRoute from "../helper/PrivateRoute";
import Home from "./Home";
import Dashboard from "./Dashboard";
import RegisterContainer from "./register/registerContainer";
import LoginContainer from "./login/loginContainer";
import Swal from "sweetalert2";
import { Nav, Navbar, Container } from "react-bootstrap";
import CustomersContainer from "../components/customers/customerContainer";
import BillsContainer from "../components/bills/billsContainer";
import ProductsContainer from "../components/products/productsContainer";
import { FaUserCircle } from "react-icons/fa";
import { startGetUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { startGetCustomer } from "../actions/customerAction";
import { startGetProduct } from "../actions/productsAction";
import { startGetBills } from "../actions/billsAction";
import UserInfo from "./userInfo";

const NavBar = (props) => {
  const { userLoggedIn, handleAuth } = props;

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const user = useSelector((state) => {
    return state.users;
  });

  const businessName = user.data.map((ele) => {
    // console.log(ele);
    return ele.businessName;
  });

  // console.log("log", user.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(startGetUser());
      dispatch(startGetCustomer());
      dispatch(startGetProduct());
      dispatch(startGetBills());
    }
  }, [userLoggedIn]);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div>
      <Navbar collapseOnSelect={true} expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <h2>{userLoggedIn ? `${businessName}` : "Welcome To The Billing App"}</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="justify-content-end" href="/home">
            
              {userLoggedIn ? (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey="1" as={Link} to={"/Dashboard"}>
                      Dashboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2" as={Link} to={"/customers"}>
                      Customers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="3" as={Link} to={"/products"}>
                      Products
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="4" as={Link} to={"/bills"}>
                      Bills
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href=""
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You Will Be Logged Out!!!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, logout",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            localStorage.removeItem("token");
                            Swal.fire("Successfully Logged out");
                            props.history.push("/");
                            handleAuth();
                          } else {
                            Swal.fire("Your Still Logged In");
                          }
                        });
                      }}
                    >
                      Logout
                    </Nav.Link>
                  </Nav.Item>{" "}
                  <FaUserCircle size="40" onClick={handleClick} color="white" />
                  <UserInfo show={show} target={target} />
                </>
              ) : (
                <>
                  <Nav.Link eventKey="7" as={Link} to={"/"}>
                      Home
                  </Nav.Link>
                  <Nav.Item>
                    <Nav.Link eventKey="8" as={Link} to={"/Register"}>
                      Register
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="9" as={Link} to={"/Login"}>
                      Login
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route path="/" component={Home} exact={true} />
      <Route path="/Register" component={RegisterContainer} />
      <Route
        path="/Login"
        render={(props) => {
          return <LoginContainer {...props} handleAuth={handleAuth} />;
        }}
      />
      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <PrivateRoute path="/customers" component={CustomersContainer} />
      <PrivateRoute path="/products" component={ProductsContainer} />
      <PrivateRoute path="/bills" component={BillsContainer} />
    </div>
  );
};

export default withRouter(NavBar);
