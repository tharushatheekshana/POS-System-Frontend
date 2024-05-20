import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark menu-nav fixed-top">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">
          <h2>Shanghai Family Restaurant</h2>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/items" class="nav-link active" aria-current="page">
                Items
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/orders" class="nav-link active" aria-current="page">
                Orders
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/stocks" class="nav-link active" aria-current="page">
                Stocks
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/categories"
                class="nav-link active"
                aria-current="page"
              >
                Categories
              </Link>
            </li>

            {/* <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li> */}
          </ul>
          {/* <Button onClick={() => toggleColorMode()} mr={2}>
            {colorMode === "dark" ? (
              <SunIcon color="orange.200" />
            ) : (
              <MoonIcon color="blue.700" />
            )}
          </Button> */}

          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success me-3" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* <Link to="/cart" className="nav-link active" aria-current="page">
                <i
                  className="bi bi-cart-plus-fill"
                  style={{ fontSize: "35px" }}
                ></i>
              </Link> */}
              <button
                className="btn btn-lg btn-primary"
                type="button"
                onClick={() => {
                  window.location.href = "/cart";
                }}
              >
                Cart <i className="bi bi-cart-plus-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
