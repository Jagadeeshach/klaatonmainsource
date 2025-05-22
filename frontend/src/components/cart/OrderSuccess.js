import { LazyLoadImage } from "react-lazy-load-image-component";

export default function OrderSuccess() {
  return (
    <div className="row justify-content-center">
      <div className="col-6 mt-5 text-center">
        <LazyLoadImage
          className="my-5 img-fluid d-block mx-auto"
          src="/images/success.png"
          alt="Order Success"
          effect="blur"
          width="200"
          height="200"
        />

        <h2>Order Success!</h2>

        <a href="/orders">Go to Orders</a>
      </div>
    </div>
  );
}
