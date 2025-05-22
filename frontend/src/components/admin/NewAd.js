import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewAd } from "../../actions/adActions";
import { toast } from "react-toastify";
import { clearMyError, clearAdCreated } from "../../slices/adSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Sidebar from "./Sidebar";
import "../compcss/NewAd.css";

export default function NewAd() {
  const [maintitle, setMainTitle] = useState("");
  const [mainDescrip, setMainDescription] = useState("");
  const [secAdTitle, setSecAdTitle] = useState("");
  const [secAdDescrip, setSecAdDescrip] = useState("");
  const [formal, setFormal] = useState("");
  const [casual, setCausal] = useState("");
  const [shoes, setShoes] = useState("");
  const [hoodie, setHoodie] = useState("");
  const [capp, setCapp] = useState("");
  const [shirtt, setShirtt] = useState("");
  const [adUser, setAdUser] = useState("");
  const [formalCategory, setFormalCategory]=useState("");
  const [casualCategory, setCasualCategory]=useState("");
  const [shoesCategory, setShoesCategory]=useState("");
  const [hoodiesCategory, setHoodiesCategory]=useState("");
  const [cappsCategory, setCappsCategory]=useState("");
  const [shirtsCategory, setShirtsCategory]=useState("");
  const [mainAdImages, setMainAdImages] = useState([]);
  const [mainAdImagesPreview, setMainAdImagesPreview] = useState([]);
  const [secAdImages, setSecAdImages] = useState([]);
  const [secAdImagesPreview, setSecAdImagesPreview] = useState([]);
  const [formalimage, setFormalimage] = useState(null);
  const [formalimagePreview, setFormalimagePreview] = useState(null);
  const [casualimage, setCasualimage] = useState(null);
  const [casualimagePreview, setCasualimagePreview] = useState(null);
  const [shoesImage, setShoesImage] = useState(null);
  const [shoesImagePreview, setShoesImagePreview] = useState(null);
  const [hoodieImage, setHoodieImage] = useState(null);
  const [hoodieImagePreview, setHoodieImagePreview] = useState(null);
  const [cappImage, setCappImage] = useState(null);
  const [cappImagePreview, setCappImagePreview] = useState(null);
  const [shirttImage, setShirtImage] = useState(null);
  const [shirttImagePreview, setShirtImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authState);
  const { loading, isAdCreated, error } = useSelector((state) => state.adState);

  const onMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setMainAdImagesPreview((oldArray) => [...oldArray, reader.result]);
          setMainAdImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const onSecImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setSecAdImagesPreview((oldArray) => [...oldArray, reader.result]);
          setSecAdImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const onFormalChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormalimage(file);
          setFormalimagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const onCasualChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCasualimage(file);
          setCasualimagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const onShoesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setShoesImage(file);
          setShoesImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const onHoodieChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setHoodieImage(file);
          setHoodieImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const onCappChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCappImage(file);
          setCappImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const onShirttChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setShirtImage(file);
          setShirtImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const submitter = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", maintitle);
    formData.append("description", mainDescrip);
    formData.append("secTitle", secAdTitle);
    formData.append("secDescription", secAdDescrip);
    formData.append("formalTitle", formal);
    formData.append("casualTitle", casual);
    formData.append("shoesTitle", shoes);
    formData.append("hoodiesTitle", hoodie);
    formData.append("cappsTitle", capp);
    formData.append("shirtsTitle", shirtt);
    formData.append("myUser", adUser);
    formData.append("formalimage", formalimage);
    formData.append("casualimage", casualimage);
    formData.append("shoesImage", shoesImage);
    formData.append("hoodiesImage", hoodieImage);
    formData.append("cappsImage", cappImage);
    formData.append("shirtsImage", shirttImage);
    formData.append("formalCategory", formalCategory);
    formData.append("casualCategory", casualCategory);
    formData.append("shoesCategory", shoesCategory);
    formData.append("hoodiesCategory", hoodiesCategory);
    formData.append("cappsCategory", cappsCategory);
    formData.append("shirtsCategory", shirtsCategory);

    mainAdImages.forEach((image) => {
      formData.append("mainImages", image);
    });
    secAdImages.forEach((imagetwo) => {
      formData.append("secImages", imagetwo);
    });
    dispatch(createNewAd(formData));
  };

  useEffect(() => {
    if (isAdCreated) {
      toast("Ad created successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearAdCreated()),
      });
      navigate("/admin/ads");
      return;
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearMyError());
        },
      });
      return;
    }
    if (user) {
      setAdUser(user.name);
    }
  }, [isAdCreated, error, dispatch, user]);

  const categories = [
    "Formal Shirts",
    "T-Shirts",
    "Casual Shirts",
    "Jeans",
    "Shorts",
    "Hoodies",
    "Sweatshirts",
    "Designer Shirts",
    "Party Blazers",
    "Velvet Jackets",
    "Ethnic Wear",
    "Gym & Sports",
    "Winter Wear",
  ];

  return (
    <div className="parent-div-new">
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="main-div">
        <h1>Create Ad</h1>
        <div>
          <form
            onSubmit={submitter}
            className="form-parent"
            encType="multipart/form-data"
          >
            <div class="first-part">
              <div className="subdiv-main">
                <div className="main-ad-image-parent">
                  <label>Main Ad Images</label>
                  <div className="ad-image-input-div">
                    <input
                      type="file"
                      name="ad-images"
                      className="ad-images-class"
                      id="customFile"
                      multiple
                      onChange={onMainImageChange}
                    />
                    <label className="custom-file-lbl" htmlFor="customFile">
                      Main Ads
                    </label>
                    {mainAdImagesPreview.map((image) => (
                      <LazyLoadImage
                        src={image}
                        key={image}
                        effect="blur"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    ))}
                  </div>
                </div>
                <div className="ad-title">
                  <label htmlFor="title-put">Ad Title</label>
                  <input
                    type="text"
                    id="title-put"
                    className="title-c"
                    onChange={(e) => setMainTitle(e.target.value)}
                    value={maintitle}
                  />
                </div>
                <div className="ad-description">
                  <label htmlFor="description-put">Ad Description</label>
                  <input
                    type="text"
                    id="description-put"
                    className="description-c"
                    onChange={(e) => setMainDescription(e.target.value)}
                    value={mainDescrip}
                  />
                </div>
              </div>

              <div className="secsub">
                <div className="second-ad-image-parent">
                  <label>Second Ad Images</label>
                  <div className="sec-ad-image-input-div">
                    <input
                      type="file"
                      name="sec-ad-images"
                      className="sec-ad-images-class"
                      id="seccustomFile"
                      multiple
                      onChange={onSecImageChange}
                    />
                    <label
                      className="seccustom-file-lbl"
                      htmlFor="seccustomFile"
                    >
                      Second Ads
                    </label>
                    {secAdImagesPreview.map((image) => (
                      <LazyLoadImage
                        src={image}
                        key={image}
                        effect="blur"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    ))}
                  </div>
                </div>
                <div className="secad-title">
                  <label htmlFor="secad-put">Second Ad Title</label>
                  <input
                    type="text"
                    id="secad-put"
                    className="secad-c"
                    onChange={(e) => setSecAdTitle(e.target.value)}
                    value={secAdTitle}
                  />
                </div>

                <div className="secad-description">
                  <label htmlFor="secdescription-put">
                    Second Ad Description
                  </label>
                  <input
                    type="text"
                    id="secdescription-put"
                    className="secdescription-c"
                    onChange={(e) => setSecAdDescrip(e.target.value)}
                    value={secAdDescrip}
                  />
                </div>
              </div>
            </div>

            <div className="second-part">
              <div className="formal-parent">
                <div className="formal-image-parent">
                  <label>Formal Image</label>
                  <div className="formal-image-input-div">
                    <input
                      type="file"
                      name="formal-image"
                      className="formal-image-class"
                      id="formalFile"
                      onChange={onFormalChange}
                    />
                    <label
                      className="formal-file-lbl"
                      htmlFor="formalFile"
                    ></label>
                    {formalimagePreview && (
                      <LazyLoadImage
                        src={formalimagePreview}
                        effect="blur"
                        alt="formal-img"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="formal-put">Formal</label>
                <input
                  type="text"
                  id="formal-put"
                  className="formal-c"
                  onChange={(e) => setFormal(e.target.value)}
                  value={formal}
                />
                <select className="form-control" id="category_field" 
                onChange={(e)=>{
                setFormalCategory(e.target.value)
                }}>
                 {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
                ))}
               </select>
              </div>
              <hr />

              <div className="casual-parent">
                <div className="casual-image-parent">
                  <label>Casual Image</label>
                  <div className="casual-image-input-div">
                    <input
                      type="file"
                      name="casual-image"
                      className="casual-image-class"
                      id="casualFile"
                      onChange={onCasualChange}
                    />

                    <label
                      className="casual-file-lbl"
                      htmlFor="casualFile"
                    ></label>
                    {casualimagePreview && (
                      <LazyLoadImage
                        src={casualimagePreview}
                        effect="blur"
                        alt="formal-img"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="casual-put">Casual</label>
                <input
                  type="text"
                  id="casual-put"
                  className="casual-c"
                  onChange={(e) => setCausal(e.target.value)}
                  value={casual}
                />
                <select className="form-control" id="category_field" 
                onChange={(e)=>{
                setCasualCategory(e.target.value)
                }}>
                 {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
                ))}
               </select>
              </div>
              <hr />

              <div className="shoes-parent">
                <div className="shoes-image-parent">
                  <label>Shoes Image</label>
                  <div className="shoes-image-input-div">
                    <input
                      type="file"
                      name="shoes-image"
                      className="shoes-image-class"
                      id="shoesFile"
                      onChange={onShoesChange}
                    />
                    <label
                      className="shoes-file-lbl"
                      htmlFor="shoesFile"
                    ></label>
                    {shoesImagePreview && (
                      <LazyLoadImage
                        src={shoesImagePreview}
                        effect="blur"
                        alt="formal-img"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="shoes-put">Shoe</label>
                <input
                  type="text"
                  id="shoes-put"
                  className="shoes-c"
                  onChange={(e) => setShoes(e.target.value)}
                  value={shoes}
                />
                <select className="form-control" id="category_field" 
                onChange={(e)=>{
                  setShoesCategory(e.target.value)
                }}>
                 {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
                ))}
               </select>
              </div>
              <hr />
            </div>

            <div className="third-part">
              <div className="hoodies-parent">
                <div className="hoodies-image-parent">
                  <label>Hoody Image</label>
                  <div className="hoodies-image-input-div">
                    <input
                      type="file"
                      name="hoodies-image"
                      className="hoodies-image-class"
                      id="hoodiesFile"
                      onChange={onHoodieChange}
                    />
                    <label
                      className="hoodies-file-lbl"
                      htmlFor="hoodiesFile"
                    ></label>
                    {hoodieImagePreview && (
                      <LazyLoadImage
                        src={hoodieImagePreview}
                        effect="blur"
                        alt="formal-img"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="hoodies-put">Hoody</label>
                <input
                  type="text"
                  id="hoodies-put"
                  className="hoodies-c"
                  onChange={(e) => setHoodie(e.target.value)}
                  value={hoodie}
                />
                <select className="form-control" id="category_field" 
                onChange={(e)=>{
                  setHoodiesCategory(e.target.value)
                }}>
                 {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
                ))}
               </select>
              </div>
              <hr />

              <div className="caps-parent">
                <div className="caps-image-parent">
                  <label>Cap Image</label>
                  <div className="caps-image-input-div">
                    <input
                      type="file"
                      name="caps-image"
                      className="caps-image-class"
                      id="capsFile"
                      onChange={onCappChange}
                    />
                    <label className="caps-file-lbl" htmlFor="capsFile"></label>
                    {cappImagePreview && (
                      <LazyLoadImage
                        src={cappImagePreview}
                        effect="blur"
                        alt="formal-img"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="caps-put">Cap</label>
                <input
                  type="text"
                  id="caps-put"
                  className="caps-c"
                  onChange={(e) => setCapp(e.target.value)}
                  value={capp}
                />
                <select className="form-control" id="category_field" 
                onChange={(e)=>{
                  setCappsCategory(e.target.value)
                }}>
                 {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
                ))}
               </select>
              </div>
              <hr />

              <div className="shirts-parent">
                <div className="shirts-image-parent">
                  <label>Shirt Image</label>
                  <div className="shirts-image-input-div">
                    <input
                      type="file"
                      name="shirts-image"
                      className="shirts-image-class"
                      id="shirtsFile"
                      onChange={onShirttChange}
                    />
                    <label
                      className="shirts-file-lbl"
                      htmlFor="shirtsFile"
                    ></label>
                    {shirttImagePreview && (
                      <LazyLoadImage
                        src={shirttImagePreview}
                        effect="blur"
                        alt="formal-img"
                        width="50"
                        height="50"
                        className="main-pre-img"
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="shirts-put">Shirt</label>
                <input
                  type="text"
                  id="shirts-put"
                  className="shirts-c"
                  onChange={(e) => setShirtt(e.target.value)}
                  value={shirtt}
                />
                <select className="form-control" id="category_field" 
                onChange={(e)=>{
                  setShirtsCategory(e.target.value)
                }}>
                 {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
                ))}
               </select>
              </div>
              <hr />
            </div>

            <button
              id="create_btn"
              type="submit"
              className="create-btn-click"
              disabled={loading}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
