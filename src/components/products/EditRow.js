import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {MdOutlineCancelPresentation} from 'react-icons/md'
import {FaRegCheckCircle} from 'react-icons/fa'

const EditRow = ({ prod, i, formSubmit, handleToggle }) => {
  const [editFormData, setEditFormData] = useState({
    name: prod.name,
    price: prod.price
  });

  const handleEditFormChange = (e) => {
    const input = e.target.value;
    const fieldName = e.target.getAttribute("name");
    const fieldValue = input;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };
  // console.log(editFormData);

  const onSubmit = (e) => {
    e.preventDefault();
    formSubmit(prod._id, editFormData);
  };
  return (
    <tr align="center">
      <td>{i + 1}</td>
      <td>{prod.createdAt.slice(0, 10)}</td>
      <td>
        <Form.Control
          style={{ width: "10rem" }}
          type="text"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          style={{ width: "5rem" }}
          type="text"
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        />
      </td>
      <td align="center">
        <Button size='sm' variant="success" type="submit" style={{marginRight:'20px'}} onClick={(e) => onSubmit(e)}><FaRegCheckCircle size="20px"/></Button>{" "}
        <Button size='sm' variant="danger"  onClick={handleToggle}><MdOutlineCancelPresentation size="20px" /></Button>
      </td>
    </tr>
  );
};

export default EditRow;
