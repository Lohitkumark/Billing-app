import React from "react";
import { Container, Card} from "react-bootstrap";
import LoginForm from "./loginForm";
import RegisterContainer from "../register/registerContainer";
import { Link, Route } from "react-router-dom";

const LoginContainer = (props)=>{
    
    return (
        <Container className='col-md-4 mt-4'>
            <div>
                <Card className='bg-light text-dark mb-3'>
                    <Card.Body>
                        <h2>Login</h2>
                    </Card.Body>
                </Card>
                <Card className='bg-light text-dark mb-3'>
                    <Card.Body>
                        <LoginForm {...props}/>
                        <div className='mt-4'>
                            <h5>New User? <Link to="/Register">Register</Link></h5>
                        </div>
                        <Route path="/Register" component={RegisterContainer} />
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default LoginContainer