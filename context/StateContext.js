import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0); 
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((preTotalQuantities) => preTotalQuantities + quantity); 

    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((preTotalQuantities) => preTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems)
     
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product.id === id)

    // const newCartItems = cartItems.splice(index, 1) <- cannot use .splice here as it mutates state of cartItems. .filter will not mutate the state

    // const newCartItems = cartItems.filter((item) => item._id !== id)

    const newCartItems = cartItems;

    if(value === 'inc') {

      // let newCartItems = [...cartItems, { ...product, quantity: product.quantity + 1 }]
      // setCartItems(newCartItems) line below is a more direct way of writing
      
      // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
      newCartItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity + 1));
      // newCartItems.map((item) => item._id === id ? {...item, quantity: foundProduct.quantity + 1} : item);
      setCartItems([...newCartItems])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {

      if(foundProduct.quantity > 1){
        // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
        newCartItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity - 1));
        // newCartItems.map((item) => item._id === id ? {...item, quantity: foundProduct.quantity - 1} : item);
        setCartItems([...newCartItems])
        setTotalPrice((prevTotalPrice) => prevTotalPrice -  foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
    // console.log("CI:", cartItems, "NCI:", newCartItems)
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1 )
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty === 0) return 0;

      return prevQty - 1 
    });
  }

  return (
    <Context.Provider 
      value={{
        showCart,
        setShowCart,
        setCartItems,
        cartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context); // allows the use of Context state like a hook