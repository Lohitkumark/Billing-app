import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import AddBill from './addBill'
import BillsList from './billsList'
import { useSelector } from 'react-redux'

const BillsContainer = (props) => {

    const bills =useSelector((state)=>{
        return state.bills
    })
    
    return (
        <div>
            <Container fluid className="mt-4">
                <Row>
                    <Col md={8}>
                            <Card className='bg-light text-dark mb-3 mt-3'>
                                <Card.Header>
                                    {bills.data.length === 0 ? (
                                        <div display='2'>
                                            <h1>No Bills Found</h1>
                                            <b> Add Bills </b>
                                        </div>
                                    ):(
                                        <h1>  Bills List - {bills.data.length}</h1>
                                    )}
                                </Card.Header>
                            </Card>
                            {bills.data.length > 0 && (
                                <BillsList/>
                            )}
                    </Col>
                    <Col md={4}>
                        <Card  className="bg-light text-dark mb-3 mt-3">
                            <Card.Header>
                                <h2>Add Bills</h2>
                            </Card.Header>
                        </Card>
                        <Card className='bg-light text-dark mb-3 mt-3'>
                            <Card.Body>
                                <AddBill/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BillsContainer
