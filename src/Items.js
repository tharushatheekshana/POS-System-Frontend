import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";

function Items() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState(null);
  const [Items, setItems] = useState(null);
  const [edit, setEdit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [activeTab, setActiveTab] = useState("items");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [file, setFile] = useState("");
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/items", config)
        .then((res) => {
          setItems(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("http://localhost:8080/categories", config)
        .then((res) => {
          setCategories(res.data);
          if (res.data.length > 0) {
            setSelectedCategory(res.data[0].name); // Auto select first category
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePrice(event) {
    setPrice(event.target.value);
  }

  function handleDescription(event) {
    setDescription(event.target.value);
  }

  function handleCategory(event) {
    setCategoryId(event.target.value);
  }

  function filterItemsByCategory(category) {
    setSelectedCategory(category);
  }

  function handleAddCategory(event) {
    setCategoryName(event.target.value);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleCancel() {
    setEdit(null);
    clearFormFields();
  }

  function clearFormFields() {
    setName("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setFile("");
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSize = Math.min(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const offsetX = (img.width - maxSize) / 2;
        const offsetY = (img.height - maxSize) / 2;
        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          maxSize,
          maxSize,
          0,
          0,
          maxSize,
          maxSize
        );
        // Convert the cropped image to a Blob
        canvas.toBlob(function (blob) {
          const croppedFile = new File([blob], file.name, { type: file.type });
          setFile(croppedFile);
        }, file.type);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .post("http://localhost:8080/items", formData, config)
      .then((res) => {
        console.log(res.data);
        console.log(file);
        getItems();
        clearFormFields();
        setEdit(null);
        toast.success("Item added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCategories() {
    axios
      .get("http://localhost:8080/categories", config)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCategory(categoryId) {
    axios
      .delete("http://localhost:8080/categories/" + categoryId, config)
      .then((res) => {
        getCategories();
        toast.success("Category deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Category cannot be deleted as it is associated with items"
        );
      });
  }

  function addCategory(event) {
    event.preventDefault();

    const data = {
      name: categoryName,
    };

    axios
      .post("http://localhost:8080/categories", data, config)
      .then((res) => {
        setCategoryName("");
        setCategories([...categories, res.data]);
        toast.success("Category added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateCategory(categoryId) {
    const data = {
      name: newCategoryName,
    };

    axios
      .put("http://localhost:8080/categories/" + categoryId, data, config)
      .then((res) => {
        getCategories();
        setNewCategoryName("");
        setCategoryId("");
        toast.success("Category updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(ItemId) {
    axios
      .delete("http://localhost:8080/items/" + ItemId, config)
      .then((res) => {
        getItems();
        toast.success("Item deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdate(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .put("http://localhost:8080/items/" + edit, formData, config)
      .then((res) => {
        toast.success("Item updated successfully");
        console.log(res.data);
        getItems();
        clearFormFields();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getItems() {
    axios
      .get("http://localhost:8080/items", config)
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <div class="container">
        <div className="row">
          <div className="col-md-4">
            <h2 className="mt-4">Manage</h2>
            <div className="col-md-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "items" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("items")}
                  >
                    <h5>Manage Items</h5>
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "categories" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("categories")}
                  >
                    <h5>Manage Categories</h5>
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === "items" ? "show active" : ""
                  }`}
                  role="tabpanel"
                >
                  {!edit && (
                    <form
                      onSubmit={handleSubmit}
                      className="mt-4"
                      encType="multipart/form-data"
                    >
                      <h2 className="mt-4 text-success">Add Item</h2>

                      <div className="mb-3">
                        <label className="form-label">Item Category</label>
                        <select
                          className="form-select"
                          onChange={handleCategory}
                          value={categoryId}
                          required
                        >
                          <option>Select Category</option>
                          {categories &&
                            categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Item Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleName}
                          value={name}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Item Price</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handlePrice}
                          value={price}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Item Description</label>
                        <textarea
                          className="form-control"
                          onChange={handleDescription}
                          value={description}
                          rows="3"
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Item Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                        {file && (
                          <img
                            src={URL.createObjectURL(file)}
                            className="img-fluid img-thumbnail"
                            alt="Preview"
                          />
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  )}

                  {edit && (
                    <form
                      onSubmit={handleUpdate}
                      className="mt-4"
                      encType="multipart/form-data"
                    >
                      <h2 className="mt-4">Update Item</h2>

                      <div className="mb-3">
                        <label className="form-label">Item Category</label>
                        <select
                          className="form-select"
                          onChange={handleCategory}
                          value={categoryId}
                          required
                        >
                          <option disabled>Select Category</option>
                          {categories &&
                            categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Item Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={handleName}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Item Price</label>
                        <input
                          type="text"
                          className="form-control"
                          value={price}
                          onChange={handlePrice}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Item Description</label>
                        <textarea
                          className="form-control"
                          value={description}
                          onChange={handleDescription}
                          rows="3"
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Item Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                        {file && (
                          <img
                            src={URL.createObjectURL(file)}
                            className="img-fluid img-thumbnail"
                            alt="Preview"
                          />
                        )}
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>

                      <button
                        className="btn btn-primary ms-2"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "categories" ? "show active" : ""
                  }`}
                  role="tabpanel"
                >
                  <form onSubmit={addCategory} className="mt-2">
                    <h2 className="">Add Category</h2>
                    <label className="form-label">Category Name</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleAddCategory}
                        value={categoryName}
                        required
                      />
                      <button type="submit" className="btn btn-primary me-2">
                        Add Category
                      </button>
                    </div>
                  </form>
                  <div className="mt-4">
                    <h2>Delete Category</h2>
                    <div className="input-group mb-1">
                      <select
                        className="form-select"
                        onChange={handleCategory}
                        required
                      >
                        <option selected>Select Category</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                      <button
                        type="submit"
                        className="btn btn-danger mt-2"
                        onClick={() => {
                          deleteCategory(categoryId);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mt-4">
                      <h2>Update Category</h2>
                      <div className="input-group mb-1">
                        <select
                          className="form-select"
                          onChange={handleCategory}
                          required
                        >
                          <option selected>Select Category</option>
                          {categories &&
                            categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="New Category Name"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-2"
                        onClick={() => {
                          updateCategory(categoryId);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h2 className="mt-4">Menu</h2>

            {/* <div class="container"> */}
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              {categories &&
                categories.map((category) => (
                  <li class="nav-item" role="presentation">
                    <button
                      class={`nav-link ${
                        selectedCategory === category.name ? "active" : ""
                      }`}
                      onClick={() => filterItemsByCategory(category.name)}
                      role="tab"
                    >
                      <h5>{category.name}</h5>
                    </button>
                  </li>
                ))}
            </ul>

            <div class="tab-content" id="pills-tabContent">
              {categories &&
                categories.map((category) => (
                  <div
                    class={`tab-pane fade ${
                      selectedCategory === category.name ? "show active" : ""
                    }`}
                    role="tabpanel"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Category</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Description</th>
                          <th scope="col">Image</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Items &&
                          Items.filter(
                            (item) => item.category.name === category.name
                          ).map((item) => (
                            <tr key={item.id}>
                              <td>{item.category?.name}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.description}</td>
                              <td>
                                {item.image && (
                                  <img
                                    src={`/images/${item.image}`}
                                    alt="Item Image"
                                    style={{ maxWidth: "100px" }}
                                  />
                                )}
                              </td>
                              <td>
                                <div className="btn-group" role="group">
                                  <button
                                    className="btn btn-primary me-2"
                                    onClick={() => {
                                      setEdit(item.id);
                                      setName(item.name);
                                      setPrice(item.price);
                                      setDescription(item.description);
                                      setCategoryId(item.category.id);
                                      setActiveTab("items");
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
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
                ))}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
