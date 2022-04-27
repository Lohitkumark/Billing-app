import React from "react";
import { Button } from "react-bootstrap";
import { startDeleteCustomer } from "../../actions/customerAction";
import { useDispatch } from "react-redux";
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const ReadOnlyRow = ({ cust, i, handleEditClick }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(startDeleteCustomer(id));
  };
  return (
    <tr key={cust._id} align='center'>
      <td>{i + 1}</td>
      <td>{cust.createdAt.slice(0, 10)}</td>
      <td>{cust.name}</td>
      <td>{cust.email}</td>
      <td>{cust.mobile}</td>
      <td align="center">
        <Button size='sm' variant="warning" style={{marginRight:'20px'}} onClick={(e) => handleEditClick(e, cust)}>
          <FiEdit size="20px" />
        </Button>
        <Button size='sm' variant="danger" onClick={() => handleRemove(cust._id)}>
          <RiDeleteBin6Line size="20px" />
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
