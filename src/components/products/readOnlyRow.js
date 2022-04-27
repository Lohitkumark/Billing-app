import React from "react";
import { Button } from "react-bootstrap";
import {startDeleteProduct} from '../../actions/productsAction'
import { useDispatch } from "react-redux";
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const ReadOnlyRow = ({ prod, i, handleEditClick }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(startDeleteProduct(id));
  };
  return (
    <tr key={prod._id} align='center'>
      <td>{i + 1}</td>
      <td>{prod.createdAt.slice(0, 10)}</td>
      <td>{prod.name}</td>
      <td>{prod.price}</td>
      <td align="center">
      <Button size='sm' variant="warning" style={{marginRight:'20px'}} onClick={(e) => handleEditClick(e, prod)}><FiEdit size="20px" /></Button>{" "}
      <Button size='sm' variant="danger" onClick={() => handleRemove(prod._id)}><RiDeleteBin6Line size="20px" /></Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
