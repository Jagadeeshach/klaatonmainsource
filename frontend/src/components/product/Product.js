import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../compcss/Cardc.css";

export default function Product({ product, col }) {
  const imageUrl =
    product?.images?.[0]?.image || "../../../public/images/jcublur.jpg";

  const name = product?.name || "Product Name";

  return (
    <>
      <Link to={`/product/${product._id}`}>
       <div className="child-card">
        <LazyLoadImage
          className="card-img-top"
          src={imageUrl}
          alt={name}
          effect="blur"
          onError={(e) => {
            e.target.src = "placeholder.jpg"; 
          }}
        />
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="size-head-box">
          {product.sizesAvailable
            ? product.sizesAvailable.map((sizeCat) => <p className="size-box">{sizeCat}</p>)
            : ""}

          </div>
          
          <p className="card-text">&#8377;<span>{product.strategicPrice}</span>&nbsp;{product.price}</p>
          {/* <Link
            to={`/product/${product._id}`}
            // id="view_btn"
            className="mbl-btn"
          >
            Check
          </Link> */}
        </div>
       </div>
      </Link>
    </>
  );
}
