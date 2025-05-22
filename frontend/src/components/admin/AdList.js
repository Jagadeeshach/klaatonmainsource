import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAdminAdError } from "../../slices/adsSlice";
import { deleteAd, getAdminAds } from "../../actions/adActions";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearAdDeleted } from "../../slices/adSlice";
import "../compcss/AdList.css";

export default function AdList() {
  const {
    ads = [],
    loading = true,
    error,
  } = useSelector((state) => state.adsState);
  const { isAdDeleted, error: adError } = useSelector((state) => state.adState);

  const dispatch = useDispatch();

  const setAds = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Title", field: "title", sort: "asc" },
        { label: "Description", field: "description", sort: "asc" },
        { label: "Second Title", field: "secTitle", sort: "asc" },
        { label: "Sec Desc", field: "secDec", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };
    ads.forEach((ad) => {
      data.rows.push({
        id: ad._id,
        title: ad.mainAd.title,
        description: ad.mainAd.description,
        secTitle: ad.secMainAd.secTitle,
        secDec: ad.secMainAd.secDescription,
        actions: (
          <Fragment>
            <Link to={`/admin/ad/${ad._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, ad._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    e.target.disabled = true;
    dispatch(deleteAd(id));
  };

  useEffect(() => {
    if (error || adError) {
      toast(error || adError, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAdminAdError());
        },
      });
      return;
    }

    if (isAdDeleted) {
      toast("Ad deleted successfully", {
        position: "bottom-center",
        type: "success",
        onOpen: () => {
          dispatch(clearAdDeleted());
        },
      });
      return;
    }

    dispatch(getAdminAds);
  }, [dispatch, error, adError, isAdDeleted]);

  return (
    <div className="parent-div">
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="main-div">
        <h1>Ad List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setAds()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
