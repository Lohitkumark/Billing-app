import React from "react";
import { Container, Card} from "react-bootstrap";
import LoginContainer from "../login/loginContainer";
import RegisterForm from "./registerForm";
import { Link, Route } from "react-router-dom";

const RegisterContainer =(props) =>{
    return (
        <Container className='col-md-4 mt-4'>
            <Card className='bg-light text-dark mb-3'>
                <Card.Body>
                    <h2>Register</h2>
                </Card.Body>
            </Card>
            <Card className='bg-light text-dark mb-3'>
                <Card.Body>
                    <RegisterForm {...props}/>
                    <div className='mt-4'>
                        <h5>Already user?  <Link to="/Login">Login</Link></h5>
                    </div>
                    <Route path="/Login" component={LoginContainer} />
                </Card.Body>
            </Card>
        </Container>
    )
}

export default RegisterContainer