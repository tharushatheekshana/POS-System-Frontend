import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext({
  isOrderCreated: false,
  // setIsOrderCreated: () => {},
  orderId: null,
  // setOrderId: () => {},
  table: null,
  // setTable: () => {},
});

export const OrderProvider = ({ children }) => {
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [table, setTable] = useState("");

  return (
    <OrderContext.Provider
      value={{
        isOrderCreated,
        setIsOrderCreated,
        orderId,
        setOrderId,
        table,
        setTable,
      }}
    >
      {children}
      {/* {console.log(isOrderCreated, orderId, table)} */}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
