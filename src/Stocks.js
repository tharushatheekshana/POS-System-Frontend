import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";

function Stocks() {
  const [Stocks, setStocks] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stockCategories, setStockCategories] = useState(null);
  const [edit, setEdit] = useState(false);
  const { jwtToken, isAuthenticated } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useState(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/stocks", config)
        .then((response) => {
          console.log(response.data);
          setStocks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:8080/stockcategories", config)
        .then((response) => {
          console.log(response.data);
          setStockCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    setEdit(null);
  };

  function getStocks() {
    axios
      .get("http://localhost:8080/stocks", config)
      .then((response) => {
        console.log(response.data);
        setStocks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdate(event) {
    event.preventDefault();

    const data = {
      quantity: quantity,
      name: name,
      stockCategoryId: category,
      description: description,
    };

    axios
      .put("http://localhost:8080/stocks" + edit, data, config)
      .then((response) => {
        console.log(response.data);
        setStocks(response.data);
        toast.success("Product updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddProduct() {
    const data = {
      quantity: quantity,
      name: name,
      stockCategoryId: category,
      description: description,
    };

    console.log(data);

    axios
      .post("http://localhost:8080/stocks", data, config)
      .then((response) => {
        console.log(response.data);
        console.log(data);
        getStocks();
        toast.success("Product added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1> Kitchen Stocks</h1>
      <hr />
      <div className="row">
        <div className="col-md">
          <div className="card">
            <div className="card-body">
              {!edit && (
                <div>
                  <h5 className="card-title">Add Product</h5>
                  <select
                    className="form-control"
                    onChange={handleCategory}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select Category
                    </option>
                    {stockCategories &&
                      stockCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={handleName}
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={handleQuantity}
                  />
                  <br />

                  <textarea
                    className="form-control"
                    placeholder="Description"
                    onChange={handleDescription}
                    rows={3}
                  />

                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </button>
                </div>
              )}
              {edit && (
                <div>
                  <h5 className="card-title">Update Product</h5>
                  <select
                    className="form-control"
                    onChange={handleCategory}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select Category
                    </option>
                    {stockCategories &&
                      stockCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={handleName}
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={handleQuantity}
                  />
                  <br />

                  <textarea
                    className="form-control"
                    placeholder="Description"
                    onChange={handleDescription}
                    rows={3}
                  />
                  <br />
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update Product
                  </button>
                  <button className="btn btn-danger" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Stocks &&
                Stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.stockCategory?.name}</td>
                    <td>{stock.name}</td>
                    <td>{stock.description}</td>
                    <td>{stock.quantity}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setEdit(stock.id);
                            setQuantity(stock.quantity);
                            setName(stock.name);
                            setCategory(stock.category);
                            setDescription(stock.description);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:8080/stocks/${stock.id}`,
                                config
                              )
                              .then((response) => {
                                console.log(response.data);
                                getStocks();
                                toast.success("Product deleted successfully");
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Stocks;
