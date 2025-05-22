import { Fragment, useEffect, useState } from "react";
import MetaData from ".././layouts/MetaData";
import { getProducts } from "../../actions/productActions";
import { getUserProductDetailFilter } from "../../actions/adminMainActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { clearProduct } from "../../slices/productSlice";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "../compcss/Search.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const { userProdCat = [] } = useSelector((state) => state.adminMainState);
  const { productCategories = [] } = userProdCat[0] || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 4000]);
  // const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const { keyword } = useParams();
  
  const categories = (productCategories === null || productCategories === undefined) 
  ? ["Loadfing....", "Loadfing"] 
  : productCategories;

  // Function to handle page change
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    dispatch(getUserProductDetailFilter);

    if (error) {
      toast.error(error, { position: "bottom-center" });
    }
    dispatch(clearProduct())
    

    dispatch(getProducts(keyword, price, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, price, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <section id="productss">
            <div className="head-product-search">
              <div className="large-dev">
                 <select
                  className="form-control"
                  id="category_field"
                  onChange={(e) => {
                  setPrice(JSON.parse(e.target.value)); 
                  }}
                  value={JSON.stringify(price)}
                  >
                   <option value={JSON.stringify([1, 4000])}>All Price</option>
                   <option value={JSON.stringify([1, 500])}>&#8377;1 to &#8377;500</option>
                   <option value={JSON.stringify([500, 1000])}>&#8377;500 to &#8377;1000</option>
                   <option value={JSON.stringify([1000, 1500])}>&#8377;1000 to &#8377;1500</option>
                   <option value={JSON.stringify([1500, 2000])}>&#8377;1500 to &#8377;2000</option>
                   <option value={JSON.stringify([2000, 2500])}>&#8377;2000 to &#8377;2500</option>
                   <option value={JSON.stringify([2500, 3000])}>&#8377;2500 to &#8377;3000</option>
                   <option value={JSON.stringify([3000, 3500])}>&#8377;3000 to &#8377;3500</option>
                   <option value={JSON.stringify([3500, 4000])}>&#8377;3500 to &#8377;4000</option>
                 </select>
              </div>
              <div className="mobile-content-head">
                <div className="rotf">
                 {loading ? (
                      <Loader />
                    ) : Array.isArray(products) && products.some((product) => product.stock > 0) ? ( 
                      products
                        .filter((product) => product.stock > 0)
                        .map((product) => <Product key={product._id} product={product} className="prod-search-card"/>)
                    ) : ( 
                      <div className="not-found-search">
                        <h4>Not Found</h4>
                        <p>We are in the process of adding fashion products to our platform. Sorry for not showing the fashion product you are looking for. All kinds of fashion items will be available soon.</p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </section>

          {/* Pagination Condition */}
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
