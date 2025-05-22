import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { clearAdminMainCreated, clearAdminMainDetailsError } from "../../slices/adminMainSlice";
import { createNewAdminMain } from "../../actions/adminMainActions";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import "../compcss/AdminMainNew.css";

export default function AdminMainNew () {
    const [platFormCharge, setPlatFormCharge] = useState(0);
    const [madeByUser, setMadeByUser] = useState("");
    const [percentGst, setGstRate] = useState(0);
    const [strategicCharge, setActualChargePernt] = useState(0);
    const [outOfCharge, setOutOfCharge] = useState(100);
    const [refererAmount, setRefererAmount] = useState(0);
    const [discountCharge, setDiscountRate] = useState(0);
    const [discountTimes, setDiscountTimes] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [couponCodes, setCouponList] = useState([]);

    const [prodCat, setProdCat] = useState("");
    const [productCatt, setProductCatt] = useState([]);

    const [prodTopCat, setProdTopCat] = useState("");
    const [productTopCatt, setProductTopCatt] = useState([]);

    

    const { loading, adminMainCreated, error } = useSelector(
      (state) => state.adminMainState
    );
    const { user = {} } = useSelector((state) => state.authState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addCoupon = () => {
      if (couponCode.trim() !== "") {
          setCouponList([...couponCodes, couponCode]);
          setCouponCode("");
      }
    };

    const removeCoupon = (index) => {
      const updatedList = couponCodes.filter((_, i) => i !== index);
      setCouponList(updatedList);
    };

    const addProd = () => {
      if (prodCat.trim() !== "") {
        setProductCatt([...productCatt, prodCat]);
        setProdCat("");
      }
    };

    const removeProd = (index) => {
      const updatedProdList = productCatt.filter((_, i) => i !== index);
      setProductCatt(updatedProdList);
    };

    const addTopProd = () => {
      if (prodTopCat.trim() !== "") {
        setProductTopCatt([...productTopCatt, prodTopCat]);
        setProdTopCat("");
      }
    };

    const removeTopProd = (index) => {
      const updatedTopList = productTopCatt.filter((_, i) => i !== index);
      setProductTopCatt(updatedTopList);
    };

    const adminNewFormSubmitBtn = (e) => {
      e.preventDefault();
  
      const formData = {
          discountCharge,
          couponCodes,
          outOfCharge,
          strategicCharge,
          percentGst,
          platFormCharge,
          discountTimes,
          refererAmount,
          productCategories: productCatt,
          productTopCategories: productTopCatt,
          madeByUser,
      };
  
      dispatch(createNewAdminMain(formData));
  };

    useEffect(() => {
      if(adminMainCreated){
        toast("Created successfully!", {
            position: "bottom-center",
            type: "success",
            onOpen: () => {
              dispatch(clearAdminMainCreated());

            },
          })
          navigate("/admin/admincontrols");
      };
        if(error){
          toast(error, {
              position: "bottom-center",
              type: "error",
              onOpen: () => {
                dispatch(clearAdminMainDetailsError());

              },
            })  
      };
      setMadeByUser(`Policy created by :${ user.name}`)
    }, [dispatch, error, adminMainCreated]); 

    return (
    <Fragment>
      <div className="admin-main-new-head-box">
        <div className="admin-main-new-sidebar">
            <Sidebar className="admin-main-new-component"/>
        </div>

       <div className="admin-main-new-main-box">
        <h2>
          Create New Policy
        </h2>
        <div className="admin-main-new-content">
        <form onSubmit={adminNewFormSubmitBtn}>
          <div className="admin-main-headbx">
            <div className="admin-mainbx-first-part">
                <div>
                 <label htmlFor="platform_charge">Platform Charge (%) :</label>
                 <input type="number" 
                 id="platform_charge" 
                 className="platform_charge_field" 
                 onChange={(e)=>setPlatFormCharge(e.target.value)} 
                  />
                </div>

               <div>
                 <label htmlFor="gst_rate">GST Rate (%) :</label>
                 <input 
                 type="number" 
                 id="gst_rate" 
                 className="gst_rate_field"
                 onChange={(e)=>setGstRate(e.target.value)} 
                  
                 />
               </div>

               <div>
                 <label htmlFor="discount_rate">Discount Rate (%) :</label>
                 <input 
                 type="number" 
                 id="discount_rate" 
                 className="discount_rate_field"
                 onChange={(e)=>setDiscountRate(e.target.value)} 
                   
                 />
               </div>

               <div>
                 <label htmlFor="discount_times">Discount Times :</label>
                 <input 
                 type="number" 
                 id="discount_times"
                 className="discount_times_field"
                 onChange={(e)=>setDiscountTimes(e.target.value)} 
                   
                 />
               </div>

               <div>
                 <label htmlFor="referer_amount">Referer Amount :</label>
                 <input 
                 type="number" 
                 id="referer_amount"
                 className="referer_amount_field"
                 onChange={(e)=>setRefererAmount(e.target.value)} 
                   
                 />
               </div>
            </div>

            <div className="admin-mainbx-second-part">
                <div>
                 <label htmlFor="actual_charge">Actual Rate (%) :</label>
                 <input 
                 type="number" 
                 id="actual_charge" 
                 className="actual_charge_field"
                 onChange={(e)=>setActualChargePernt(e.target.value)} 
                 
                 />
                </div>

               <div>
                 <label htmlFor="maxm_rate">Max. Rate (%) :</label>
                 <input 
                 type="number" 
                 id="maxm_rate" 
                 className="maxm_rate_field"
                 onChange={(e)=>setOutOfCharge(e.target.value)} 
                  
                 />
               </div>

               <div>
                  <label htmlFor="coupon_code">Coupon Codes :</label>
                  <input 
                      type="text" 
                      id="coupon_code" 
                      className="coupon_code_field" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value)} 
                  />
                 <div onClick={addCoupon}>Add Coupon</div>
                 <div onClick={addCoupon}>{couponCodes.length}</div>

                 <div className="coupon-code-list">
                     {couponCodes.map((code, index) => (
                         <p key={index}>{code}<span onClick={() => removeCoupon(index)}> Remove</span></p>
                     ))}
                 </div>
                </div>

                <div>
                  <label htmlFor="prod_cat_field">Product Categories :</label>
                  <input 
                      type="text" 
                      id="prod_cat_field" 
                      className="prod_cat_field_main" 
                      value={prodCat} 
                      onChange={(e) => setProdCat(e.target.value)} 
                  />
                 <div onClick={addProd}>Add Coupon</div>
                 <div onClick={addProd}>{productCatt.length}</div>

                 <div className="coupon-code-list">
                     {productCatt.map((code, index) => (
                         <p key={index}>{code}<span onClick={() => removeProd(index)}> Remove</span></p>
                     ))}
                 </div>
                </div>

                <div>
                  <label htmlFor="product__main_cat">Product Top Categories :</label>
                  <input 
                      type="text" 
                      id="product__main_cat" 
                      className="product_main_field" 
                      value={prodTopCat} 
                      onChange={(e) => setProdTopCat(e.target.value)} 
                  />
                 <div onClick={addTopProd}>Add Coupon</div>
                 <div onClick={addTopProd}>{productTopCatt.length}</div>

                 <div className="coupon-code-list">
                     {productTopCatt.map((code, index) => (
                         <p key={index}>{code}<span onClick={() => removeTopProd(index)}> Remove</span></p>
                     ))}
                 </div>
                </div>
            </div>
          </div>

          <button 
          type="submit" 
          id="create_adminmain_btn" 
          className="create-admin-main-btn" >Create</button>

        </form>
        </div>
       </div>
      </div>
    </Fragment>
    );
}