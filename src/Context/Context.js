import React, { useContext, useReducer } from 'react'

import { createContext } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer,productReducer } from './Reducer';
const Cart = createContext();
const Context = ({children}) => {
faker.seed(99);
  const products  = [...Array(20)].map(() =>({
        id: faker.datatype.uuid(),
        productname:faker.commerce.productName(),
        price:faker.commerce.price(),
        image:faker.image.image(),
        inStock:faker.random.arrayElement([0,3,5,6,7]),
        fastDelivery:faker.datatype.boolean(),
        ratings:faker.random.arrayElement([1,2,3,,4,5,6])
  }));
  
 const [state,dispatch] = useReducer(cartReducer,{
     products:products,
     cart:[]
 })

 const [productState,productDispatch] = useReducer(productReducer,{
    byStock:false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:"",
})
 
  return  <Cart.Provider value={{state,dispatch,productState,productDispatch}}>
      {children}
  </Cart.Provider>
}

export default Context;

export const CartState = () => {
    return useContext(Cart);
}