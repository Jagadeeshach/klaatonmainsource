import {Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateReferer, getSingleDeliveryManFunc } from "../../actions/deliveryTeamActions";
import { clearUpdatedDeliveryMan, clearDeliveryTeamError } from "../../slices/deliveryTeamSlice";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "../compcss/DeliveryTeamUpdate.css";

export default function DeliveryTeamUpdate () {
    const [userCouponCode, setUserCouponCode] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userMainId, setUserMainId] = useState("");
    

    const { isDeliveryManUpdated = false, getSingleDeliveryMan = {}, error = null } = useSelector((state) => state.deliveryTeamState)
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: userId } = useParams();

    const deliveryTeamSubmit = (e) => {
        e.preventDefault();
        const formData = {
            userCouponCode,
          
      };
      dispatch(updateReferer(userId, formData));
    }


    useEffect(() => {
        dispatch(getSingleDeliveryManFunc(userId));

        if (isDeliveryManUpdated) {
            toast("Deliveryman updated successfully!", {
                position: "bottom-center",
                type: "success",
                onOpen: () => {
                    dispatch(clearUpdatedDeliveryMan());
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
    }, [isDeliveryManUpdated, error, dispatch, navigate]);

    useEffect(()=>{
        if(getSingleDeliveryMan) {
            setUserEmail(getSingleDeliveryMan.email);
            setUserCouponCode(getSingleDeliveryMan.userCouponCode);
            setUsername(getSingleDeliveryMan.name);
            setUserRole(getSingleDeliveryMan.role);
            setUserMainId(getSingleDeliveryMan.id);
            
        }

    }, [getSingleDeliveryMan])

    // useEffect(() => {
    //     if (!getSingleDeliveryMan?.id) return;
      
    //     setUserEmail(getSingleDeliveryMan.email);
    //     setUserCouponCode(getSingleDeliveryMan.userCouponCode);
    //     setUsername(getSingleDeliveryMan.name);
    //     setUserRole(getSingleDeliveryMan.role);
    //     setUserMainId(getSingleDeliveryMan.id);
    //   }, [getSingleDeliveryMan]);

    return (
    <Fragment>
        <div className="delivery-team-update-head">
          <div className="delivery-sidebar-update">
           <Sidebar className="side-bar-tag" />
          </div>
          <div className="delivery-team-update-inside">
            <form className="delivery-team-update-form" onSubmit={deliveryTeamSubmit}>
            <h2>
                Update Referer
            </h2>
                <div className="email-box">
                    <p>User Id:&nbsp;{userMainId}</p>
                    <p>User Name:&nbsp;{userName}</p>
                    <p>User Email:&nbsp;{userEmail}</p>
                    <p>User Role:&nbsp;{userRole}</p>
                </div>
                <div className="coupon-box">
                    <label htmlFor="coupon_field">Coupon Code :&nbsp;</label>
                    <input 
                    type="text" 
                    id="coupon_field" 
                    className="coupon_input_field" 
                    onChange={(e)=>setUserCouponCode(e.target.value)}
                    value={userCouponCode}
                    />
                </div>
                <button 
                 type="submit" 
                 id="create_referer_btn" 
                 className="create-referer-main-btn" >Update</button>
            </form>
          </div>
        </div>
    </Fragment>
    )
}