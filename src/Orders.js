import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/orders`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getOrders() {
    axios
      .get(`http://localhost:8080/orders`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeItemFromOrder(orderId, itemId) {
    axios
      .delete(`http://localhost:8080/orders/${orderId}/item/${itemId}`)
      .then((response) => {
        console.log(response.data);
        getOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString("en-US", options);
  }

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Date and Time</th>
            <th>Table No</th>
            <th>Order Items</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatDateTime(order.orderDate)}</td>
                <td>{order.tableNo}</td>
                <td>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.id}>
                        <p>
                          {item.quantity} x {item.item.name} (Rs.
                          {item.item.price}){" "}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              removeItemFromOrder(order.id, item.item.id)
                            }
                          >
                            <i class="bi bi-trash3"></i>
                          </button>
                        </p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>Rs.{order.totalPrice}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8080/orders/${order.id}`)
                        .then((response) => {
                          console.log(response.data);
                          getOrders();
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Order Cancel
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
