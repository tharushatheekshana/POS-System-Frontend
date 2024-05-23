import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";

function EditOrders() {
  const { id } = useParams();
  const [tableNo, setTableNo] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const { isAuthenticated, jwtToken } = useAuth();
  // const [orderItems, setOrderItems] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOrder();

      axios
        .get("http://localhost:8080/items", config)
        .then(function (response) {
          setItems(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id]);

  const getOrder = () => {
    axios
      .get(`http://localhost:8080/orders/${id}`, config)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleUpdateOrder = (id) => {
    const order = {
      tableNo: tableNo,
      orderDate: orderDate,
      totalPrice: totalPrice,
    };
    console.log("Updated Order: ", order);
  };

  const handleRemoveItemFromOrder = (orderId, itemId) => {
    axios
      .delete(`http://localhost:8080/orders/${orderId}/item/${itemId}`, config)
      .then(() => {
        toast.success("Item removed from order");
        getOrder();
      })
      .catch((error) => {
        console.error("Error removing item from order:", error);
        toast.error("Failed to remove item from order");
      });
  };

  return (
    <div className="item-body" style={{ marginTop: "65px" }}>
      <div className="container">
        <h1> Add items to order #{id}</h1>
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.item.id}</td>
                      <td>{item.item.name}</td>
                      <td>{item.item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleRemoveItemFromOrder(order.id, item.item.id)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            {items &&
              items.map((item) => (
                <div key={item.id} className=" shadow-sm p-3 rounded mb-3">
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={{ maxWidth: "200px" }}
                  />
                  <h4>{item.name}</h4>
                  <p>Rs. {item.price}</p>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      const data = {
                        itemId: item.id,
                        quantity: 1,
                      };

                      axios
                        .post(
                          `http://localhost:8080/orders/${id}/addItem`,
                          data,
                          config
                        )
                        .then(function (response) {
                          setOrder(response.data);
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    }}
                  >
                    Add
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrders;
