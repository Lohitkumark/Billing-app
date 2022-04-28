import React, { useState, useEffect } from "react"; 
import { Container } from "react-bootstrap"; 
import { useSelector } from "react-redux";
import {Card, Row, Col} from "react-bootstrap";
import ReCharts from "./ReCharts";


const Dashboard=(props)=>{

    const [total, setTotal] = useState([])
    
    const bills = useSelector((state)=>{
        return state.bills
    })

    const customers = useSelector((state)=>{
        return state.customers
    })
    // console.log(customers);
    const products = useSelector((state)=>{
        return state.products
    })
    useEffect(()=>{
        const result = bills.data.map((ele)=>{
            return ele.total
        })
        setTotal(result)
    },[bills])
    
    return (
        <Container fluid className="mt-4 ">
            <Row style={{textAlign:"center"}} className='mt-5'>
                <Col mb={3}>
                    <Card className='mt-2'>
                        <Card.Header>
                            <b>Total Customers</b>
                        </Card.Header>
                        <Card.Body>
                            <b>{customers.data.length}</b>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='mt-2'>
                        <Card.Header>
                            <b>Total Products</b>
                        </Card.Header>
                        <Card.Body>
                            <b>{products.data.length}</b>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='mt-2'>
                        <Card.Header>
                            <b>Total Bills</b>
                        </Card.Header>
                        <Card.Body>
                            <b>{bills.data.length}</b>
                        </Card.Body>
                    </Card>
                </Col>
                <Col mb={3}>
                    <Card className='mt-2'>
                        <Card.Header>
                            <b>Total Income</b>
                        </Card.Header>
                        <Card.Body>
                            <b>{total.length > 0 ? total.reduce((prev, curr)=>{
                                return prev+curr
                            }) : null}</b>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col mb={3}>
                    <Card className='mt-2'>
                        <Card.Header style={{textAlign:"center"}} > 
                            <b>Recently Added Customers</b>
                        </Card.Header>
                        <Card.Body>
                            <ol>
                                {(customers.data.slice(-5).reverse()).map((ele)=>{
                                    return <b key={ele._id}><li >{ele.name}</li></b>
                                })}
                            </ol>
                        </Card.Body>
                    </Card>
                </Col>
                <Col mb={3}>
                    <Card className='mt-2'>
                        <Card.Header style={{textAlign:"center"}}>
                            <b>Recently Added Products</b>
                        </Card.Header>
                        <Card.Body>
                            <ol>
                                {(products.data.slice(-5).reverse()).map((ele)=>{
                                    return <b key={ele._id}><li>{ele.name}</li></b>
                                })}
                            </ol>
                        </Card.Body>
                    </Card>
                </Col>
                <Col mb={3}>
                    <Card className='mt-2'>
                        <Card.Header style={{textAlign:"center"}}>
                            <b>Recently Added Bills</b>
                        </Card.Header>
                        <Card.Body>
                            <ol>
                                {(bills.data.slice(-5).reverse()).map((ele)=>{
                                    return customers.data.map((cust)=>{
                                        if(cust._id==ele.customer){
                                            return <b key={ele._id}><li>{cust.name}</li></b>
                                        }
                                    })
                                })}
                            </ol>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <BarChart/> */}
            <ReCharts/>
        </Container>
    )
}

export default Dashboard