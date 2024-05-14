import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";

function Cart() {
  const { isAuthenticated, jwtToken } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
    }
  }, [isAuthenticated]);

  const getCart = () => {
    axios
      .get("http://localhost:8080/cart", config)
      .then((response) => {
        setCart(response.data);
        updateTotal(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        toast.error("Failed to fetch cart data");
      });
  };

  const updateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const data = {
      quantity: newQuantity,
    };

    axios
      .put(`http://localhost:8080/cart/${id}`, data, config)
      .then(() => {
        getCart();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity");
      });
  };

  const handleRemoveItem = (id) => {
    axios
      .delete(`http://localhost:8080/cart/${id}`, config)
      .then(() => {
        getCart();
        toast.success("Item removed from cart");
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item from cart");
      });
  };

  const handleCheckout = () => {
    // Placeholder for checkout functionality
    toast.success("Checkout functionality will be implemented soon!");
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div>
            <ul className="list-group">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <img
                        src={`/images/${item.image}`}
                        alt={item.name}
                        style={{ maxWidth: "100px" }}
                      />
                    </div>
                    <div className="col-7">
                      <h5>{item.name}</h5>
                      <p className="mb-0">
                        Price: Rs. {item.price * item.quantity}
                      </p>
                    </div>
                    <div className="col text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-primary ms-2"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between mt-3">
              <h4>Total: Rs. {total}</h4>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
