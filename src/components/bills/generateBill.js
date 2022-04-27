import React, { useRef } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import InvoicePage from "./InvoicePage";
import ReactToPrint from "react-to-print";
import {AiFillPrinter, AiFillCloseCircle} from 'react-icons/ai'


const GenerateBill = (props) => {
  const { items, total, id } = props;

  const products = useSelector((state) => {
    return state.products;
  });

  const componentRef = useRef()

  return (
    <div>
      <Modal {...props} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <ReactToPrint
            trigger={() => <Button variant='success' size='sm'><AiFillPrinter size='20px'/></Button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
           <InvoicePage ref={componentRef} {...props} />
          </div>
          <Button size='sm' variant='danger' onClick={props.onHide}><AiFillCloseCircle size='20px'/></Button>
        </Modal.Footer>
      </Modal>
    </div>
    // "To print a functional component ensure it is wrapped with 
    // `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples"
  );
};

export default GenerateBill;
