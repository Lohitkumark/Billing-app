import React from 'react'
import {useSelector} from 'react-redux'
import CustomerList from './customerList'
import { Container, Row, Col, Card } from 'react-bootstrap'
import AddCustomer from './addCustomer'

const CustomerContainer = () => {

    const customers =useSelector((state)=>{
        return state.customers
    })

    return (
        <div>
            <Container className="mt-4">
            <Row>
            <Col md={8}>
                    <Card className='bg-light text-dark mb-3'>
                        <Card.Header>
                        {customers.data.length === 0 ? (
                            <div display='2'>
                                <h1>No customers Found</h1>
                                <b> Add customers</b>
                            </div>
                        ):(
                            <h1>  Customers List - {customers.data.length}</h1>
                        )}
                        </Card.Header>
                    </Card>
                    {customers.data.length > 0 && (
                        <CustomerList/>
                    )}
            </Col>
                <Col md={4}>
                    <Card className='bg-light text-dark mb-3'>
                        <Card.Header>
                            <h2>Add Customer</h2>
                        </Card.Header>
                    </Card>
                    <Card className='bg-light text-dark mb-3'>
                        <Card.Body>
                            <AddCustomer/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default CustomerContainer
