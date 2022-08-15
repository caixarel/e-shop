import { createContext, useEffect, useReducer, useState } from "react";

const addCartItem = (cartItems,productToAdd)=>{
  const existingCartItem = cartItems.find(cartItem=>cartItem.id === productToAdd.id)
  if(existingCartItem){
    return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ?
      {...cartItem, quantity : cartItem.quantity + 1} :
      cartItem
    )
  }
  return [...cartItems,{...productToAdd,quantity:1}]
}

const removeCartItem = (cartItems,cartItemToRemove)=>{
  const existingCartItem = cartItems.find(cartItem=>cartItem.id === cartItemToRemove.id)

  if(existingCartItem.quantity ===1){
    return cartItems.filter(cartItem=>cartItem.id !== cartItemToRemove.id)
  }
     return cartItems.map((cartItem)=> cartItem.id === cartItemToRemove.id ?
      {...cartItem, quantity : cartItem.quantity - 1} :
      cartItem
    )
}

const clearCartItem = (cartItems,cartItemToClear) =>{
    return cartItems.filter(cartItem=>cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
  isCartOpen:false,
  setIsCartOpen: ()=>{},
  cartItems: [],
  addItemToCart: ()=>{},
  clearItemFromCart: ()=>{},
  cartCount:0,
  total:0
})

const INITIAL_STATE = {
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const CART_ACTION_OPTIONS = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state,action) =>{
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_OPTIONS.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_OPTIONS.SET_IS_CART_OPEN:
      return{
        ...state,
        isCartOpen: !state.isCartOpen
      }
    default:
      throw new Error ('unhandled reducer type')
  }
}

export const CartProvider = ({children})=>{
  const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] =useReducer(cartReducer,INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) =>{
    const newCartCount = newCartItems.reduce((total ,item)=>{
      return total + item.quantity
    },0)

    const newCartTotal = newCartItems.reduce((total ,item)=>{
      return total + item.quantity * item.price
    },0)

    dispatch({type:"SET_CART_ITEMS",payload:{
      cartItems:newCartItems,
      cartTotal: newCartTotal,
      cartCount: newCartCount
    }})
  }

  const setIsCartOpen = () =>{
    dispatch({type:"SET_IS_CART_OPEN"})
  }

  const addItemToCart = (productToAdd)=>{
    const newCartItems = addCartItem(cartItems,productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const RemoveItemFromCart = (cartItemToRemove)=>{
    const newCartItems = removeCartItem(cartItems,cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (cartItemToClear) =>{
    const newCartItems = clearCartItem(cartItems,cartItemToClear)
    updateCartItemsReducer(newCartItems)
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, RemoveItemFromCart, clearItemFromCart,cartTotal }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
