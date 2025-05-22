import {Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllDeliveryPeople } from "../../actions/deliveryTeamActions";
import { clearDeliveryTeamError } from "../../slices/deliveryTeamSlice";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import "../compcss/DeliveryTeamList.css";

export default function DeliveryTeamList () {
    const { loading = true, allDeliveryPeople=[], error = null, } = useSelector((state)=> state.deliveryTeamState)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setDeliveryTeam = () => {
        const data = {
          columns: [
            {
              label: "ID",
              field: "id",
              sort: "asc",
            },
            {
              label: "Name",
              field: "name",
              sort: "asc",
            },
            {
              label: "Email",
              field: "email",
              sort: "asc",
            },
            {
              label: "Role",
              field: "role",
              sort: "asc",
            },
            {
              label: "Coupon Code",
              field: "couponcode",
              sort: "asc",
            },
            {
              label: "Total Earnings",
              field: "userearning",
              sort: "asc",
            },
            {
              label: "Actions",
              field: "actions",
              sort: "asc",
            },
          ],
          rows: [],
        };

        if (allDeliveryPeople && allDeliveryPeople.length > 0) {
          data.rows = allDeliveryPeople.map((man) => ({
            id: man.id,
            name: man.name,
            email: man.email,
            role: man.role,
            couponcode: man.userCouponCode,
            userearning: man.refererEarned,
            actions: (
              <Fragment>
                <Link
                  to={`/admin/deliveryteam/update/${man.id}`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              </Fragment>
            ),
          }));
        }
        return data;
      };

    useEffect( ()=>{
        dispatch(getAllDeliveryPeople);

        if(error){
            toast(error, {
                position: "bottom-center",
                type: "error",
                onOpen: () => {
                  dispatch(clearDeliveryTeamError());
                },
          });
        }

    }, [error]);

    return (
    <Fragment>
        <div className="delivery-team-list-head">
          <div className="delivery-sidebar-list">
           <Sidebar className="side-bar-tag" />
          </div>
          <div className="delivery-team-list-inside">
            <h2>Delivery Team</h2>
            <Fragment>
           {loading ? (
            <Loader />
            ) : (
             <MDBDataTable
                data={setDeliveryTeam()}
                bordered
                striped
                hover
                className="px-3"
              />
            )}
           </Fragment>
          </div>
        </div>
    </Fragment>
    )
}