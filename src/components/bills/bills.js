import React, {useState, useEffect, Fragment} from 'react'
import {Button, Table} from 'react-bootstrap'
import swal from 'sweetalert'
import {startDeleteBill} from '../../actions/billsAction'
import { useDispatch, useSelector } from 'react-redux'
import GenerateBill from './generateBill'
import {BiShow} from 'react-icons/bi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const Bills =(props) =>{
   const {_id, date, customer, lineItems, i} = props
   const [cName, setCName] = useState('')
   const [pName, setPName] = useState('')
   const [modalShow, setModalShow] = useState(false)
   const [items, setItems] = useState([])
   const [total, setTotal] = useState('')
   

   const dispatch = useDispatch()
    
    const customers = useSelector((state)=>{
        return state.customers
    })
    const products = useSelector((state)=>{
        return state.products
    })
    const bills = useSelector((state)=>{
        return state.bills
    })

    const handleRemove = (_id)=>{
        dispatch(startDeleteBill(_id))
   }

   useEffect(()=>{
        customers.data.map((ele)=>{
            //   console.log(ele);
            if(customer == ele._id){
                setCName(ele.name)
            }
        })
        products.data.map((ele)=>{
            return (
                lineItems.map((item)=>{
                if(item.product === ele._id){
                    setPName(ele.name)
                }
            }))
        })
        bills.data.map((ele)=>{
            if(ele._id == _id){
                setItems(ele.lineItems)
                setTotal(ele.total)
            }
        }) 
   },[])
//    console.log('items', items)


    const handleClick = (_id)=>{
        setModalShow(true)
        // bills.data.map((ele)=>{
        //     if(ele._id == _id){
        //         setItems(ele.lineItems)
        //         setTotal(ele.total)
        //     }
        // })
    }

// console.log('total', total);
    return (
        <tr align='center'>
            <td>{i+1}</td>
            <td>{date.slice(0,10)}</td>
            <td>{cName}</td>
            <td>{total}</td>
            <td>
                <Button size='sm' variant='info' onClick={() => handleClick(_id)}><BiShow size='20px'/></Button>{' '}
            </td> 
            <td>  
                <Button size='sm' variant='danger' onClick={()=>handleRemove(_id)}><RiDeleteBin6Line size="20px" /></Button> 
                <GenerateBill show={modalShow} onHide={() => setModalShow(false)} lineitems={lineItems} items={items} total={total} id={_id}/>
            </td>
        </tr>
        // <div className='mt-3'> 
        //     <b onClick={showDetails}>{cName}</b>
        //     <div style={{float:'right'}}>
        //         <Button size='sm' onClick={() => handleClick(_id)}>Generate</Button>{' '}
        //         <Button size='sm'  onClick={()=>handleRemove(_id)}>Remove</Button> 
        //         <GenerateBill show={modalShow} onHide={() => setModalShow(false)} lineitems={lineItems} items={items} total={total}/>
        //     </div>
        // </div>
    )
}

export default Bills