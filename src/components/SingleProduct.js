 
import React from 'react'
import { Card,Button} from 'react-bootstrap';
import Rating from './Rating';

import { CartState } from '../Context/Context';

const SingleProduct = ({prod}) => {

const {state : {cart}, dispatch,} = CartState();
  return (
    <div className='products'> 
    <Card>
    <Card.Img variant="top" src={prod.image}  alt={prod.productname} />
    <Card.Body>
      <Card.Title>{prod.productname}</Card.Title>
      <Card.Subtitle>
       <span>rs {prod.price.split(".")[0]}</span>
       {prod.fastDelivery ? (<div>Fast Delivery</div>) : (<div>4 days Delivery</div>)}
       <Rating rating={prod.ratings} />
     

      </Card.Subtitle>
      {cart.some((p) => p.id === prod.id) ? (
      <Button  onClick={()=>{
        dispatch({
          type:"REMOVE_FROM_CART",
          payload:prod
        })
      }} variant="danger">Remove from cart</Button>) : (
      <Button onClick={()=>{
        dispatch({
          type:"ADD_TO_CART",
          payload:prod
        })
      }} disabled={!prod.inStock}>
           {!prod.inStock ? "Out of stock": " Add to cart"}          
           </Button>
           )} 
    </Card.Body> 
  </Card> 
    </div>
  )
}

export default SingleProduct;