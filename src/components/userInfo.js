import React, {useState, useEffect } from 'react'   
import {Overlay, Popover} from 'react-bootstrap'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";

const UserInfo = (props) =>{

    const {show, target} = props

    const ref = useRef(null);

    const user = useSelector((state) => {
        return state.users;
      });
  
    return (
      <div ref={ref}>
  
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
            <Popover id="popover-contained">
                {user.data.map((ele)=>{
                    //   console.log(ele.name);
                    return (
                        <div key={ele._id}>
                            <Popover.Header ><FaUserCircle className='d-inline-flex align-items-center'
                                size='30px'
                                color="dark"
                            />{' '}<b className='fs-3 d-inline-flex align-items-center'>{ele.username}</b></Popover.Header>
                            <Popover.Body>
                                <strong>Date - <b>{ele.createdAt.slice(0, 10)}</b></strong><hr/>
                                <strong>Business Name - <b>{ele.businessName}</b> </strong><hr/>
                                <strong>Email - <b>{ele.email}</b></strong><hr/>
                                <strong>Address - <b>{ele.address}</b></strong>
                            </Popover.Body>
                        </div>
                    )
                })}
            </Popover>
        </Overlay>
      </div>
    );
}

export default UserInfo