import React, {useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Form, Table} from "react-bootstrap";
import Paginate from "../paginate";
import { startEditCustomer } from "../../actions/customerAction";
import ReadOnlyRow from "./readOnlyRow";
import EditRow from "./EditRow";


const CustomerList = (props) => {

  const customers = useSelector((state) => {
    return state.customers;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [filterItem, setFilterItem] = useState(customers.data);
  const [selected, setSelected] = useState("");
  const [editContactId, setEditContactId] = useState(null);
  const [toggle, setToggle] = useState(false)
  
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.data.slice(indexOfFirstCustomer,indexOfLastCustomer);

  const dispatch = useDispatch();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
  const handelSearch = (e) => {
    const input = e.target.value;
    // console.log(input);
    setSearch(input);
    const result = customers.data.filter((ele) => {
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
    customers.data.sort((a, b) => {
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
 
  const handleEditClick = (e, cust) => {
    e.preventDefault();
    handleToggle()
    setEditContactId(cust._id);
  };

  const formSubmit =(id, values) =>{
    handleToggle()
    dispatch(startEditCustomer(id, values))
  }

  const handleToggle=()=>{
    const result = !toggle
    return setToggle(result)
  }

  return (
    <div>
      <div display="3">
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
                    <th style={{ width: "6rem" }} >Date</th>
                    <th style={{ width: "10rem" }} >Name</th>
                    <th style={{ width: "10rem" }}>Email</th>
                    <th style={{ width: "10rem" }}>Mobile No</th>
                    <th style={{ width: "7rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(search.length > 0 ? filterItem : currentCustomers).map(
                    (cust, i) => {
                      // console.log('cust', cust);
                      return (
                        <Fragment key={cust._id}>
                          {toggle && editContactId == cust._id ? (
                            <EditRow cust={cust} i={i} 
                            formSubmit={formSubmit}
                            handleToggle={handleToggle}/>
                          ) : (
                            <ReadOnlyRow
                              cust={cust}
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
              total={customers.data.length}
              perPage={customersPerPage}
              paginate={paginate}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CustomerList;
