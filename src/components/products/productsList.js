import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Form, Table } from "react-bootstrap";
import Paginate from "../paginate";
import EditRow from "./EditRow";
import ReadOnlyRow from "./readOnlyRow";
import { startEditProduct } from "../../actions/productsAction";

const ProductsList = (props) => {
  const products = useSelector((state) => {
    return state.products;
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [filterItem, setFilterItem] = useState(products.data);
  const [selected, setSelected] = useState("");
  const [editContactId, setEditContactId] = useState(null);
  const [toggle, setToggle] = useState(false)
  
  const dispatch= useDispatch()
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.data.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handelSearch = (e) => {
    const input = e.target.value;
    // console.log(input);
    setSearch(input);
    const result = products.data.filter((ele) => {
      return ele.name.toLowerCase().includes(input.toLowerCase());
    });
    if (input.length > 0) {
      setFilterItem(result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    const input = e.target.value;
    setSelected(input);
    //    console.log(selected);
    products.data.sort((a, b) => {
      if (input === "ase") {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
      } else if (input === "dse") {
        if (b.name.toLowerCase() < a.name.toLowerCase()) {
          return -1;
        }
      }
      return 0;
    });
  };

  const handleEditClick = (e, prod) => {
    e.preventDefault();
    handleToggle()
    setEditContactId(prod._id);
  };

  const formSubmit =(id, values) =>{
    handleToggle()
    dispatch(startEditProduct(id, values))
  }

  const handleToggle=()=>{
    const result = !toggle
    return setToggle(result)
  }
  
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
                <option value="ase">A - Z</option>
                <option value="dse">Z - A</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
            <Form>
              <Table bordered hover responsive>
                <thead>
                  <tr align='center'>
                    <th style={{ width: "3rem" }} >#</th>
                    <th style={{ width: "5rem" }} >Date</th>
                    <th style={{ width: "10rem" }} >Name</th>
                    <th style={{ width: "5rem" }} >Price</th>
                    <th style={{ width: "7rem" }} >Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {(search.length > 0 ? filterItem : currentProduct).map((prod, i) => {
                        // console.log('prod', prod);
                        return (
                            <Fragment key={prod._id}>
                            {toggle && editContactId == prod._id ? (
                            <EditRow prod={prod} i={i} 
                            formSubmit={formSubmit}
                            handleToggle={handleToggle}/>
                            ) : (
                            <ReadOnlyRow
                                prod={prod}
                                i={i}
                                handleEditClick={handleEditClick}
                                handleToggle={handleToggle}
                            />
                            )}
                        </Fragment>
                        );
                    }
                )}
                </tbody>
            </Table>
            </Form>
          <Paginate
            total={products.data.length}
            perPage={productsPerPage}
            paginate={paginate}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductsList;
