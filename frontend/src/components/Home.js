import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts, getCategoryProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import "../components/compcss/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(""); // Default to load all products

  // Categories List
  const categories = [
    "Formal Shirts",
    "T-Shirts",
    "Casual Shirts",
    "Jeans",
    "Shorts",
    "Hoodies",
    "Sweatshirts",
    "Designer Shirts",
    "Party Blazers",
    "Velvet Jackets",
    "Ethnic Wear",
    "Gym & Sports",
    "Winter Wear",
  ];

  // Pagination Handler
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  // Fetch Products
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
    }

    // Fetch products based on category
    if (category) {
      dispatch(getCategoryProducts(category));
    } else {
      dispatch(getProducts(null, null, null, null, currentPage)); // Fetch all products
    }
  }, [dispatch, category, currentPage, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <div className="home-category">
            <h1
              id="products_heading"
              onClick={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1); // Reset to the first page
              }}
            >
              All Trends
            </h1>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1); // Reset to the first page
              }}
              className="form-control"
              id="category_field"
            >
              <option value="">Looking for..?</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <section id="products" className="container mt-1">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={3} key={product._id} product={product} />
                ))}
            </div>
          </section>

          {productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
