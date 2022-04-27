import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import AddProduct from './addProduct'
import ProductsList from './productsList'
import { useSelector } from 'react-redux'


const CustomerContainer = () => {

    const products =useSelector((state)=>{
        return state.products
    })
   
    return (
        <div>
            <Container className="mt-4">
            <Row>
                <Col md={8}>
                        <Card className='bg-light text-dark mb-3'>
                            <Card.Header>
                            {products.data.length === 0 ? (
                                <div display='2'>
                                    <h1>No Products Found</h1>
                                    <b> Add Products </b>
                                </div>
                            ):(
                                <h1>  Products List - {products.data.length}</h1>
                            )}
                            </Card.Header>
                        </Card>
                        {products.data.length > 0 && (
                            <ProductsList/>
                        )}
                </Col>
                <Col md={4}>
                <Card className='bg-light text-dark mb-3'>
                    <Card.Header>
                        <h2>Add Product</h2>
                    </Card.Header>
                </Card>
                <Card className='bg-light text-dark mb-3'>
                <Card.Body>
                    <AddProduct/>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default CustomerContainer
