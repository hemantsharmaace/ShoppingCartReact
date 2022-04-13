import React, { useEffect,useState } from 'react'
import { ListGroup,Button,Row,Col, Form,Image } from 'react-bootstrap';
import { CartState } from '../Context/Context';
import Rating from './Rating';

import {AiFillDelete} from 'react-icons/ai';

const Cart = () => {

  const {state: {cart},dispatch} = CartState();

  const [total,setTotal] = useState(0);

  useEffect(()=>{
    setTotal(cart.reduce((acc,curr)=> acc+Number(curr.price)*curr.qty ,0));

  },[cart]);

  return (
    <div className='home'> 
    <div className='productContainer'>
    <ListGroup>

      {cart.map((prod) => {
    return    <ListGroup.Item key={prod.id}>
          <Row>
          <Col md={2}> 
          <Image src={prod.image} alt={prod.productname} fluid rounded />
          </Col>

          <Col md={2}>{prod.productname}</Col>
          <Col md={2}>{prod.price}</Col>
          <Col md={2}>
            <Rating rating={prod.ratings} />
            </Col>
            <Col md={2}>
            <Form.Control as="select" value={prod.qty}  onChange={(e)=>{

              dispatch({
                type:"CHANGE_CART_QUANTITY",
                payload: {
                  id:prod.id,
                  qty:e.target.value
                }
              });

            }}
                
            >

              {
                [...Array(prod.inStock).keys()].map((x) => {

               return   <option value={x+1}>{x+1}</option>
                })
              }
            </Form.Control>
            </Col>
            <Col md={2}>
            <AiFillDelete fontSize="20px" style={{ cursor: "pointer"}} onClick={()=>{
                                                    dispatch({
                                                    type:"REMOVE_FROM_CART",
                                                    payload:prod
                                                    })
                                                                                    
                                    }}
                                    />
      
            </Col>
          </Row>
        
        </ListGroup.Item>
 
        })  
      }
    </ListGroup>

    </div>
    <div className='filters summary'>

      <span className='title'> Sub Total ({cart.length}) items     </span>
      <span style={{fontweight:700 , fontSize:20 }}>Total : Rs {total}</span>
      <Button type="button" disabled={cart.length === 0} >
        Proceed to Checkout
      </Button>
    </div>

    </div>
  )
}

export default Cart;