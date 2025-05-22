
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTotalEarnings } from "../../actions/orderActions"
import Loader from "../layouts/Loader";
import "../compcss/DeliveryTeam.css";


export default function DeliveryTeam() {
    const [myRefer, setMyRefer] = useState("");
    const [myEarnings, setMyEarnings] = useState(0);
    const [myTotalReference, setMyTotalReference] = useState(0);

    const { loading, myReferEarnings = {}} = useSelector((state) => state.deliveryTeamPState);

    const dispatch = useDispatch();
    

    useEffect(()=> {
        dispatch(getMyTotalEarnings);
    }, []);

    useEffect(()=> {
        if(myReferEarnings){
            setMyRefer(myReferEarnings.myReferCode);
            setMyEarnings(myReferEarnings.referEarnedAmount);
            setMyTotalReference(myReferEarnings.numberOfMyReference);
        }

    }, [myReferEarnings])

  return (
    <div className="earning-head">
     <section className="earnings">
      <h4>My Earnings</h4>
      {loading ? (
      <Loader />
      ) : (
      <ul className="content-earnings">
        <li>My Coupon Code: {myRefer ? myRefer : "N/A"}</li>
        <li>My Total Reference: {myTotalReference ? myTotalReference : 0}</li>
        <li>Total Earnings: {myEarnings ? myEarnings : 0}</li>
      </ul>
      )}
     </section>
   </div>
  );
}
