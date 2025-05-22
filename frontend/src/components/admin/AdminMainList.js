import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import { 
  clearAdminMainDeleted, 
  clearAdminMainDetailsError, 
  clearAdminMainArray,
  clearPriceUpdatesAllPro } from "../../slices/adminMainSlice";
import { getAllAdminMains, deleteAdminMain, updatePriceOfAllProduts } from "../../actions/adminMainActions";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import "../compcss/AdminMainDetails.css";

export default function AdminMainList () {
    const [reload, setReload] = useState(false);
    const { loading, adminMains = [], error, adminMainDeleted, updatedProPrice } = useSelector((state)=> state.adminMainState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteAdminMainButton = async (id) => {
        await dispatch(deleteAdminMain(id));
        setReload((prev) => !prev); 
    };

    useEffect(() => {
        dispatch(getAllAdminMains); 
        dispatch(clearAdminMainArray());

        if(adminMainDeleted){
            toast("Deletion successful!", {
                position: "bottom-center",
                type: "success",
                onOpen: () => {
                  dispatch(clearAdminMainDeleted());
                },
              })
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

        
    }, [dispatch, reload, adminMainDeleted, error]); 

    useEffect(()=> {
      if(updatedProPrice){
        toast(`${updatedProPrice} Products updated!`, {
            position: "bottom-center",
            type: "success",
            onOpen: () => {
              dispatch(clearPriceUpdatesAllPro());
            },
          })
       };
    }, [dispatch, updatedProPrice])

    const changeProductPric = () => {
      dispatch(updatePriceOfAllProduts)
    }

    return (
    <Fragment>
      <div className="admin-main-details-head-box">
        <div className="admin-main-details-sidebar">
            <Sidebar className="admin-main-sidebar-component"/>
        </div>

       <div className="admin-main-details-main-box">
        <h2>
          Income & Tax Management
        </h2>
        <div className="admin-main-details-content">
        {loading ? <Loader /> : (
            adminMains.map((adminMainElement)=>(
                <div className="admin-det-card">
                  <h4>Tax rates</h4>
                  <h5>Platform Charge: {adminMainElement.platFormCharge}%</h5>
                  <h5>GST Rate: {adminMainElement.percentGst}%</h5>
                  <h5>Actual Rate: {adminMainElement.strategicCharge}%</h5>
                  <h5>Max. Rate: {adminMainElement.outOfCharge}%</h5>
                  <h5>Discount Rate: {adminMainElement.discountCharge}%</h5>
                  <h5>Discount Times: {adminMainElement.discountTimes}</h5>
                  <h5>Referer Amount: Rs.{adminMainElement.refererAmount}</h5>
                  <h4>Coupon Codes</h4>
                  {adminMainElement.couponCodes.map((coup, index) => (
                   <> 
                    <span key={index}>{coup}</span>
                   </>
                  ))}
                  <h4>Product Categories</h4>
                  {adminMainElement.productCategories.map((catg, index) => (
                   <> 
                    <span key={index}>{catg}</span>
                   </>
                  ))}
                  <h4>Top Categories</h4>
                  {adminMainElement.productTopCategories.map((topcatg, index) => (
                   <> 
                    <span key={index}>{topcatg}</span>
                   </>
                  ))}

                  <div className="content-delt-updt-btn">
                      <div onClick={() => deleteAdminMainButton(adminMainElement._id)}>
                        <i class="fa fa-trash dlt-icon" aria-hidden="true">Delete</i>
                      </div>

                      <Link
                      to={`/admin/admincontrols/update/${adminMainElement._id}`}
                      className="admin-main-link-updt"
                        >
                      <i class="fa fa-pencil updt-icon" aria-hidden="true">Edit</i>
                    </Link>
                  </div>
                  <div>
                    <h5>{adminMainElement.madeByUser}</h5>
                  </div>
                </div>
                ))
          
         )}
        </div>
        <div>
          <button onClick={changeProductPric}>Apply Changes</button>
        </div>
       </div>
      </div>
    </Fragment>
    );
}