import { Fragment, useEffect, useState } from "react";
import { createReview, getProduct } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { Button, Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  clearError,
  clearProduct,
  clearReviewSubmitted,
} from "../../slices/productSlice";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
  const {
    loading,
    product = {},
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selSize, setSelectSize] = useState("");

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber === 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  //Review
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const transformationMap = {
    "Extra Small": "XS",
    Small: "S",
    Medium: "M",
    Large: "L",
    "Extra Large [XL]": "XL",
    "2XL": "2XL",
    "3XL": "3XL",
    "4XL": "4XL",
    "5XL": "5XL",
  };

  //const newSizesAvailable = product.sizesAvailable.map(size => transformationMap[size]);

  const addSizes = (sizeVal) => {
    setSelectSize(sizeVal);
    console.log(selSize);
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast("Review submitted successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearReviewSubmitted());
        },
      });
    }
    if (error) {
      handleClose();
      toast(error, {
        type: "error",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }
    // return () => {
    //   dispatch(clearProduct());
    // };
  }, [dispatch, id, isReviewSubmitted, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image._id}>
                      <LazyLoadImage
                        className="d-block w-100"
                        src={image.image}
                        alt={product.name}
                        effect="blur"
                        onError={(e) => {
                          e.target.src = "placeholder.jpg";
                        }}
                        height="500"
                        width="500"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product ID # {product.productUId}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">&#8377;{product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <div>
                {product.sizesAvailable
                  ? product.sizesAvailable.map((sizeCat) => (
                      <p onClick={() => addSizes(sizeCat)}>{sizeCat}</p>
                    ))
                  : ""}
                {selSize ? (
                  <p>Selected Size: {selSize}</p>
                ) : (
                  <p>Please select the perfect size to proceed.</p>
                )}
              </div>

              <button
                type="button"
                id="cart_btn"
                disabled={product.stock == 0 ? true : false}
                onClick={() => {
                  dispatch(addCartItem(product._id, quantity, selSize));
                  toast("Cart Item Added!", {
                    type: "success",
                    position: "bottom-center",
                  });
                }}
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:
                <span
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                  id="stock_status"
                >
                  {product ? (product.stock > 0 ? "In Stock" : "Out of Stock") : "Refresh the page"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
              {user ? (
                <button
                  onClick={handleShow}
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">
                  Login to Post Review
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ul className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <li
                            value={star}
                            onClick={() => setRating(star)}
                            className={`star ${star <= rating ? "orange" : ""}`}
                            onMouseOver={(e) =>
                              e.target.classList.add("yellow")
                            }
                            onMouseOut={(e) =>
                              e.target.classList.remove("yellow")
                            }
                          >
                            <i className="fa fa-star"></i>
                          </li>
                        ))}
                      </ul>

                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        name="review"
                        id="review"
                        className="form-control mt-3"
                      ></textarea>
                      <button
                        disabled={loading}
                        onClick={reviewHandler}
                        aria-label="Close"
                        className="btn my-3 float-right review-btn px-4 text-white"
                      >
                        Submit
                      </button>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 ? (
            <ProductReview reviews={product.reviews} />
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
