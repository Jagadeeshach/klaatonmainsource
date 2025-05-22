import {Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewReferer } from "../../actions/deliveryTeamActions";
import { clearDeliveryMan, clearDeliveryTeamError } from "../../slices/deliveryTeamSlice";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "../compcss/DeliveryTeamNew.css";

export default function DeliveryTeamNew () {
    const [userCouponCode, setUserCouponCode] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const { isDeliveryManCreated, deliveryMan = {}, error } = useSelector((state) => state.deliveryTeamState)
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deliveryTeamSubmit = (e) => {
        e.preventDefault();
        const formData = {
            userEmail: userEmail,
            userCouponCode: userCouponCode,
          
      };
      dispatch(createNewReferer(formData));
    }


    useEffect(() => {
        if (isDeliveryManCreated) {
            toast("Deliveryman created successfully!", {
                position: "bottom-center",
                type: "success",
                onOpen: () => {
                    dispatch(clearDeliveryMan());
                },
            });
            navigate("/admin/deliveryteam/list");
        }
    
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: "error",
                onOpen: () => {
                    dispatch(clearDeliveryTeamError());
                },
            });
        }
    }, [isDeliveryManCreated, error, dispatch, navigate]);

    return (
    <Fragment>
        <div className="delivery-team-new-head">
          <div className="delivery-sidebar-new">
           <Sidebar className="side-bar-tag" />
          </div>
          <div className="delivery-team-new-inside">
            <form className="delivery-team-new-form" onSubmit={deliveryTeamSubmit}>
            <h2>
                Create Referer
            </h2>
                <div className="email-box">
                    <label htmlFor="email_field">User Email :&nbsp;</label>
                    <input 
                    type="email" 
                    id="email_field" 
                    className="email_input_field" 
                    onChange={(e)=>setUserEmail(e.target.value)}
                    />
                </div>
                <div className="coupon-box">
                    <label htmlFor="coupon_field">Coupon Code :&nbsp;</label>
                    <input 
                    type="text" 
                    id="coupon_field" 
                    className="coupon_input_field" 
                    onChange={(e)=>setUserCouponCode(e.target.value)}
                    />
                </div>
                <button 
                 type="submit" 
                 id="create_referer_btn" 
                 className="create-referer-main-btn" >Create</button>
            </form>
          </div>
        </div>
    </Fragment>
    )
}