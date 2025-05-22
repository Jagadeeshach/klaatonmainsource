import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewSellProduct } from "../../actions/productActions";
import { getAllVendorPolicy } from "../../actions/adminMainActions";
import { toast } from "react-toastify";
import { clearError, clearProductCreated } from "../../slices/productSlice";

export default function NewProduct() {
  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);
  const [flatFormCharge, setFlatFormCharge] = useState(0);
  const [finalProductPrice, setFinalProductPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [strategicPrice, setStrategicPrice] = useState(0);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );

  const { loading: policyLoading, vendorAdminDetails = [] } = useSelector((state) => state.adminMainState);

  
  const taxPolicy = vendorAdminDetails.length > 0 ? vendorAdminDetails[0] : null;

  const profitPerCentt = taxPolicy?.platFormCharge ?? 0;  
  const taxPerCentt = taxPolicy?.percentGst ?? 0;
  const outOfMax = taxPolicy?.outOfCharge && taxPolicy?.outOfCharge !== 0 ? taxPolicy?.outOfCharge : 1; 
  const actualPerCentt = taxPolicy?.strategicCharge ?? 0;
  const categories = taxPolicy?.productCategories ?? [];

 useEffect(() => {
  if (!price || isNaN(Number(price))) return; 

  let numericPrice = Number(price);

  const flatFormChargeT = Math.round(numericPrice * profitPerCentt / outOfMax); 
  const finalProductPriceT = Math.round(numericPrice + flatFormChargeT);
  const taxPriceT = Math.round(finalProductPriceT * taxPerCentt / outOfMax); 
  const totalPriceT = Math.round(finalProductPriceT + taxPriceT);

  const sPricePercent = Math.round(totalPriceT * actualPerCentt / outOfMax);
  const priceWithSprice = Math.round(sPricePercent + totalPriceT);

  setFlatFormCharge(flatFormChargeT);
  setFinalProductPrice(finalProductPriceT);
  setTaxPrice(taxPriceT);
  setTotalPrice(totalPriceT);
  setStrategicPrice(priceWithSprice);
 }, [price]); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    formData.append("basePrice", price);
    formData.append("price", totalPrice);
    formData.append("flatFormCharge", flatFormCharge);
    formData.append("finalProdPrice", finalProductPrice);
    formData.append("taxPrice", taxPrice);
    formData.append("totalPrice", totalPrice);
    formData.append("strategicPrice", strategicPrice);

    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewSellProduct(formData));
  };

  useEffect(() => {
    dispatch(getAllVendorPolicy);

    if (isProductCreated) {
      toast("Product Created Successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/vendor/products/create");
      return;
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
  }, [isProductCreated, error, dispatch]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div>
                <ul>
                  <li>Platform Charge({`${profitPerCentt}%`}):&nbsp; {flatFormCharge}</li>
                  <li>Price with P Charge:&nbsp; {finalProductPrice}</li>
                  <li>GST({`${taxPerCentt}%`}):&nbsp; {taxPrice}</li>
                  <li>Total(with GST({`${taxPerCentt}%`})):&nbsp; {totalPrice}</li>
                  {/* <li>Strategic Price(20%):&nbsp; {strategicPrice}</li> */}
                </ul>
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.map((image) => (
                  <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

// import { Fragment, useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createNewProduct } from "../../actions/productActions";
// import { toast } from "react-toastify";
// import { clearError, clearProductCreated } from "../../slices/productSlice";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// export default function NewProduct() {
//   const [name, setName] = useState("");
//   const [myUser, setMyUser] = useState("");
//   const [price, setPrice] = useState(0.0);
//   const [category, setCategory] = useState("");
//   const [seller, setSeller] = useState("");
//   const [stock, setStock] = useState(0);
//   const [sizesAvailable, setSizesAvailable] = useState([]);
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);

//   const { loading, isProductCreated, error } = useSelector(
//     (state) => state.productState
//   );

//   const { user } = useSelector((state) => state.authState);

//   const categories = [
//     "Formal Shirts",
//     "T-Shirts",
//     "Casual Shirts",
//     "Jeans",
//     "Shorts",
//     "Hoodies",
//     "Sweatshirts",
//     "Designer Shirts",
//     "Party Blazers",
//     "Velvet Jackets",
//     "Ethnic Wear",
//     "Gym & Sports",
//     "Winter Wear",
//   ];

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onImagesChange = (e) => {
//     const files = Array.from(e.target.files);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState == 2) {
//           setImagesPreview((oldArray) => [...oldArray, reader.result]);
//           setImages((oldArray) => [...oldArray, file]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSizeChange = (event) => {
//     const { options } = event.target;
//     const newValues = Array.from(options)
//       .filter((option) => option.selected)
//       .map((option) => option.value);

//     setSizesAvailable((prevSizes) => {
//       const updatedSizes = [...prevSizes];
//       newValues.forEach((value) => {
//         if (!updatedSizes.includes(value)) {
//           updatedSizes.push(value);
//         }
//       });
//       return updatedSizes;
//     });
//   };

//   const removeString = (strToRemove) => {
//     setSizesAvailable((prevArray) =>
//       prevArray.filter((item) => item !== strToRemove)
//     );
//   };

//   const sizeCateg = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("myUser", myUser);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("seller", seller);
//     formData.append("stock", stock);
//     formData.append("description", description);
//     formData.append("setSizesAvailable", sizesAvailable);
//     images.forEach((image) => {
//       formData.append("images", image);
//     });
//     dispatch(createNewProduct(formData));
//   };

//   useEffect(() => {
//     if (isProductCreated) {
//       toast("Product Created Successfully", {
//         type: "success",
//         position: "bottom-center",
//         onOpen: () => dispatch(clearProductCreated()),
//       });
//       navigate("/admin/products");
//       return;
//     }

//     if (error) {
//       toast(error, {
//         position: "bottom-center",
//         type: "error",
//         onOpen: () => {
//           dispatch(clearError());
//         },
//       });
//       return;
//     }
//     if (user) {
//       setMyUser(user.name);
//     }
//   }, [isProductCreated, error, dispatch, user]);

//   return (
//     <div className="row">
//       <div className="col-12 col-md-2">
//         <Sidebar />
//       </div>
//       <div className="col-12 col-md-10">
//         <Fragment>
//           <div className="wrapper my-5">
//             <form
//               onSubmit={submitHandler}
//               className="shadow-lg"
//               encType="multipart/form-data"
//             >
//               <h1 className="mb-4">New Product</h1>

//               <div className="form-group">
//                 <label htmlFor="name_field">Name</label>
//                 <input
//                   type="text"
//                   id="name_field"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                   value={name}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="price_field">Price</label>
//                 <input
//                   type="number"
//                   id="price_field"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                   value={price}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="description_field">Description</label>
//                 <textarea
//                   className="form-control"
//                   id="description_field"
//                   rows="8"
//                   onChange={(e) => setDescription(e.target.value)}
//                   value={description}
//                 ></textarea>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="seller_field">Seller Name</label>
//                 <input
//                   type="text"
//                   id="seller_field"
//                   className="form-control"
//                   onChange={(e) => setSeller(e.target.value)}
//                   value={seller}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="stock_field">Available Stocks</label>
//                 <input
//                   type="number"
//                   id="stock_field"
//                   className="form-control"
//                   onChange={(e) => setStock(e.target.value)}
//                   value={stock}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="category_field">Category</label>
//                 <select
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="form-control"
//                   id="category_field"
//                 >
//                   <option value="">Select</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="category_field">Select Available Sizes</label>
//                 <select
//                   onChange={handleSizeChange}
//                   className="form-control"
//                   id="category_field"
//                 >
//                   {sizeCateg.map((sizecat) => (
//                     <option key={sizecat} value={sizecat}>
//                       {sizecat}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {sizesAvailable && <p>Available: {sizesAvailable}</p>}

//               {sizesAvailable.map((str, index) => (
//                 <li key={index}>
//                   {str}
//                   <button onClick={() => removeString(str)}>Remove</button>
//                 </li>
//               ))}
//               <div className="form-group">
//                 <label>Images</label>

//                 <div className="custom-file">
//                   <input
//                     type="file"
//                     name="product_images"
//                     className="custom-file-input"
//                     id="customFile"
//                     multiple
//                     onChange={onImagesChange}
//                   />
//                   <label className="custom-file-label" htmlFor="customFile">
//                     Choose Images
//                   </label>
//                 </div>
//                 {imagesPreview.map((image) => (
//                   <LazyLoadImage
//                     className="mt-3 mr-2"
//                     key={image}
//                     src={image}
//                     alt={`Image Preview`}
//                     effect="blur"
//                     width="55"
//                     height="52"
//                   />
//                 ))}
//               </div>

//               <button
//                 id="login_button"
//                 type="submit"
//                 disabled={loading}
//                 className="btn btn-block py-3"
//               >
//                 CREATE
//               </button>
//             </form>
//           </div>
//         </Fragment>
//       </div>
//     </div>
//   );
// }
