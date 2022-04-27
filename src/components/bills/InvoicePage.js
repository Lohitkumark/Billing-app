import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";

const InvoicePage = forwardRef((props, ref) => {
  const { id, items, total } = props;

//   console.log("id", id);

  const bills = useSelector((state) => {
    return state.bills;
  });

  const users = useSelector((state) => {
    return state.users;
  });

  const products = useSelector((state) => {
    return state.products;
  });

  return (
    <div ref={ref}>
      <h4 style={{ textAlign: "center" }}>INVOICE</h4>{" "}
      {users.data.map((ele) => {
        return (
          <div key={ele._id}>
            <h1 style={{ textAlign: "center" }}>{ele.businessName}</h1>
            <p style={{ textAlign: "center" }}>
              <b>{ele.address}</b>
            </p>
            <p style={{ textAlign: "center" }}>
              <b>{ele.email}</b>
            </p>
          </div>
        );
      })}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((ele, i) => {
            return (
              <tr key={ele._id}>
                  <td>{i+1}</td>
                {products.data.map((prod) => {
                  if (prod._id === ele.product) {
                    return <td key={ele._id}>{prod.name}</td>;
                  }
                })}
                {/* <td>{ele.product}</td> */}
                <td>{ele.quantity}</td>
                <td>{ele.price}</td>
                <td>{ele.subTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <b>Total - Rs.{total}/-</b>
      <div style={{position:"absolute", bottom:0, textAlign:"center"}}>
        <Row >
            <Col  >
                <b>Customer Sign</b>
            </Col>
            <Col >
                <b>Authorized Sign</b>
            </Col>
        </Row>
      </div>
    </div>
  );
});

export default InvoicePage;
