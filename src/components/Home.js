import React from 'react'
import { Container, Card , Row, Col} from 'react-bootstrap'
const Home = props => {
  return (
    <Container className='mt-5'>
      <Row>
        <Col>
        <Card>
          <Card.Header>
            <h2>Registration</h2>
          </Card.Header>
          <Card.Body>
            <p>User can Register to the billing app by providing his Username, Email, Password, BussinessName and address</p>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Header>
            <h2>Login</h2>
          </Card.Header>
          <Card.Body>
            <p>User can Login Through Registered Credentials or For Testing Can Use These Credentials </p>
            <p><b>Email</b>: 'lohit@gmail.com'</p><p><b>Password</b>: '123456789'</p>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row className='mt-5'>
      <Col>
        <Card>
          <Card.Header>
            <h2>Dashboard</h2>
          </Card.Header>
          <Card.Body>
            <p>Once User Logged In He Can View His Stats in This page</p>
            <p>Total Customers, Total Products, Total Bills and last 7 days data of Customers, Products and Bills</p>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Header>
            <h2>Customers</h2>
          </Card.Header>
          <Card.Body>
            <p>After Logged In User Can Create Customer, Edit Customer, Delete Customer</p>
            <p>Search and Sort functionality also available</p>
          </Card.Body>
        </Card>
        </Col>
        
      </Row>
      <Row className='mt-5'>
      <Col>
        <Card>
          <Card.Header>
            <h2>Products</h2>
          </Card.Header>
          <Card.Body>
            <p>After Logged In User Can Create Product, Edit Product, Delete Product</p>
            <p>Search and Sort functionality also available</p>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Header>
            <h2>Bills</h2>
          </Card.Header>
          <Card.Body>
            <p>In This Page User Can Select Date, Customer, and Products to Generate Invoice </p>
            <p>The Invoice Can be Downloaded or Printed</p>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home