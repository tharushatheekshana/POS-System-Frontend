// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function CheckOut({ itemId }) {
//   const [order, setOrder] = useState(null);
//   const [items, setItems] = useState(null);

//   console.log(order);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/orders/${1}`)
//       .then((response) => {
//         setOrder(response.data);
//         getOrdersById(1);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .get("http://localhost:8080/items")
//       .then((res) => {
//         setItems(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [itemId]);

//   function getOrdersById(id) {
//     axios
//       .get(`http://localhost:8080/orders/${1}`)
//       .then((response) => {
//         setOrder(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   return (
    
//   );
// }

// export default CheckOut;
