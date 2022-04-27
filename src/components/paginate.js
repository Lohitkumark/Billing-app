import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({total, perPage, paginate}) =>{

    const items = [];
    for (let i = 1; i <= Math.ceil((total) / perPage ); i++) {
        items.push(
        <Pagination.Item size ='sm' onClick = {()=>paginate(i)} key={i}>
        {i}
        </Pagination.Item>)
            
    }
    // console.log(items);
    return (
        <div>
            <Pagination >{items}</Pagination>
        </div>
    )

}

export default Paginate