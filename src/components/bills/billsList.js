import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Card, Form, Col, Row, Table } from "react-bootstrap";
import Bill from "./bills";
import Paginate from "../paginate";

const BillsList = (props) => {
  const bills = useSelector((state) => {
    return state.bills;
  });

  const cust = useSelector((state)=>{
    return state.customers
  })

  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [filterItem, setFilterItem] = useState([])

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBill = bills.data.slice(indexOfFirstBill, indexOfLastBill);

  const handelSearch = (e) => {
    const input = e.target.value;
    setSearch(input);
    // console.log(input);
    cust.data.filter((ele)=>{
     if(ele.name.toLowerCase().includes(input.toLowerCase())){
        const out = bills.data.filter((e)=>{
          return e.customer == ele._id
        })
        setFilterItem(out);
     }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
// console.log('cd',filterItem);
  const handleSelect = (e) => {
    const input = e.target.value;
    setSelected(input);
      //  console.log(input);
    bills.data.sort((a, b) => {
      if (input === "date") {
        if (a.date < b.date) {
          return -1;
          console.log(a.date);
        }
      } else if (input === "total") {
        if (a.total < b.total) {
          return -1;
        }
      }
      return 0;
    });
  };
  // console.log(bills.data);
  return (
    <div>
      <Card>
        <Card.Header>
          <Row className="mt-4 mb-4">
            <Col md={8}>
              <Form onSubmit={handleSubmit} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Search By Name..."
                  value={search}
                  onChange={handelSearch}
                />
              </Form>
            </Col>
            <Col md={4}>
              <Form.Select value={selected} onChange={handleSelect}>
                <option>Order By</option>
                <option value="date">Date</option>
                <option value="total">Total</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form>
            <Table bordered hover responsive>
              <thead>
                <tr align="center">
                  <th>#</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Total</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(search.length > 0 ? filterItem : currentBill).map((bill, i) => {
                  // console.log('cust', cust);
                  return (
                    <Fragment key={bill._id}>
                      <Bill {...bill} i={i}/>
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          </Form>
          <Paginate
            total={bills.data.length}
            perPage={billsPerPage}
            paginate={paginate}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BillsList;
