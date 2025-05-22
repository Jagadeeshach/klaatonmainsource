import { Fragment, useState, useEffect } from "react";
import { getAds } from "../../actions/adActions";
import Product from "../product/Product";
import { getCatProducts } from "../../actions/productCatActions";
import { getUserProductDetailFilter } from "../../actions/adminMainActions";
import { useDispatch, useSelector } from "react-redux";
// import Loader from "../layouts/Loader";
// import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import {clearProductCat, clearProductErrror} from "../../slices/productCatSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../compcss/Adboard.css";

export default function Adboard() {
  const [gategory, setGategory]= useState("");
  const dispatch = useDispatch();
  const { ads = [], loading, error } = useSelector((state) => state.adsState);
  const { productCat =[], loading:ProductCatLoading, error:productCatError } = useSelector((state) => state.prodCatState);
  const { userProdCat = [] } = useSelector((state) => state.adminMainState);
  const { productTopCategories = [] } = userProdCat[0] || {};
  

  const reloadAds =()=>{
    dispatch(clearProductCat())
  }

  const clearCtError = () =>{
    dispatch(clearProductErrror())
  }

  const categories = (productTopCategories === null || productTopCategories === undefined) 
  ? ["Loadfing....", "Loadfing"] 
  : productTopCategories;



  useEffect(() => {
    dispatch(getAds);
    dispatch(clearProductErrror());
    dispatch(getUserProductDetailFilter);

    if(productCat){
      dispatch(clearProductCat());
    }

  }, [dispatch]);
  
  useEffect(() => {
    if(gategory){
      dispatch(getCatProducts(gategory));
    }
  }, [gategory, dispatch]);

  return (
    <div className="parent-div-board">
      <MetaData title={`Wear it. Own it. Turn heads.`} />
      <div className="filt-div">
        <div>
          {!ProductCatLoading && (
          <>
           {productCat.length > 0 || productCatError ? (
            <h4 onClick={productCat.length > 0 ? reloadAds : clearCtError} className="home-back-btn">Back To Home</h4>
           ) : (
            <h4 className="home-trend-btn">Trending....</h4>
           )}
         </>
         )}
        </div>
        <select className="form-control" 
        id="category_field" 
        onChange={(e)=>{
          setGategory(e.target.value)
        }}>
          <option value="Product">Looking for..?</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

       {!ProductCatLoading && !productCatError && (
        <>
          {productCat.length === 0 ? (
            ads.map((ad) => (
              <>
                <div className="main-div">
                  <div className="mainad-div">
                    <Carousel pause="hover">
                      {ad.mainAd.mainImages &&
                        ad.mainAd.mainImages.map((image) => (
                          <Carousel.Item key={image._id}>
                            <LazyLoadImage 
                            src={image.image}
                            className="lazymainLoadImage" 
                            alt="abc" 
                            effect="blur"
                           />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                    {/* <div className="desc">
                      <h3>{ad.mainAd.title}</h3>
                      <p>{ad.mainAd.description}</p>
                    </div> */}
                  </div>
                  <div className="secad-div">
                    <Carousel pause="hover">
                      {ad.secMainAd.secImages &&
                        ad.secMainAd.secImages.map((image) => (
                          <Carousel.Item key={image._id}>
                            <LazyLoadImage 
                            className="LazyLoadImage"
                            src={image.image} 
                            alt="abc" 
                            effect="blur" // Built-in blur effect
                            onError={(e) => {
                            e.target.src = "placeholder.jpg"; // Fallback image
                          }}/>
                          </Carousel.Item>
                        ))}
                    </Carousel>
                    {/* <div className="secdev">
                      <h4>{ad.secMainAd.secTitle}</h4>
                      <p>{ad.secMainAd.secDescription} </p>
                    </div> */}
                  </div>
                </div>
                <div>
                  <h4 className="top-fash-collc">Top Fashion Collections On Each.... </h4>
                </div>
                <div className="maincat-div">
                  <div className="cat-div" onClick={()=>setGategory(ad.trendProducts.formals.formalCategory)}>
                    <LazyLoadImage
                      src={ad.trendProducts.formals.formalImage.image}
                      className="LazyLoadImage"
                      alt="formal"
                      effect="blur" 
                      onError={(e) => {
                      e.target.src = "placeholder.jpg";
                      }}
                    />
                    <p>{ad.trendProducts.formals.formalTitle}</p>
                  </div>
                  <div className="cat-div" onClick={()=>setGategory(ad.trendProducts.casuals.casualCategory)}>
                    <LazyLoadImage
                      src={ad.trendProducts.casuals.casualImage.image}
                      className="LazyLoadImage"
                      alt="formal"
                      effect="blur" // Built-in blur effect
                      onError={(e) => {
                      e.target.src = "placeholder.jpg"; // Fallback image
                      }}
                    />
                    <p>{ad.trendProducts.casuals.casualTitle}</p>
                  </div>
                  <div className="cat-div" onClick={()=>setGategory(ad.trendProducts.shoes.shoesCategory)}> 
                    <LazyLoadImage 
                    src={ad.trendProducts.shoes.shoesImage.image} 
                    className="LazyLoadImage"
                    alt="formal" 
                    effect="blur" 
                    onError={(e) => {
                    e.target.src = "placeholder.jpg"; 
                    }}
                    />
                    <p>{ad.trendProducts.shoes.shoesTitle}</p>
                  </div>
                  <div className="cat-div" onClick={()=>setGategory(ad.trendProducts.hoodies.hoodiesCategory)}>
                    <LazyLoadImage
                      src={ad.trendProducts.hoodies.hoodiesImage.image}
                      className="LazyLoadImage"
                      alt="formal"
                      effect="blur"
                      onError={(e) => {
                      e.target.src = "placeholder.jpg";
                      }}
                    />
                    <p>{ad.trendProducts.hoodies.hoodiesTitle}</p>
                  </div>
                  <div className="cat-div" onClick={()=>setGategory(ad.trendProducts.capps.cappsCategory)}>
                    <LazyLoadImage 
                    src={ad.trendProducts.capps.cappsImage.image} 
                    className="LazyLoadImage"
                    alt="formal" 
                    effect="blur" 
                    onError={(e) => {
                    e.target.src = "placeholder.jpg";
                    }}
                    />
                    <p>{ad.trendProducts.capps.cappsTitle}</p>
                  </div>
                  <div className="cat-div" onClick={()=>setGategory(ad.trendProducts.shirts.shirtsCategory)}>
                    <LazyLoadImage
                      src={ad.trendProducts.shirts.shirtsImage.image}
                      className="LazyLoadImage"
                      alt="formal"
                      effect="blur" 
                      onError={(e) => {
                      e.target.src = "placeholder.jpg";
                      }}
                    />
                    <p>{ad.trendProducts.shirts.shirtsTitle}</p>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="card-head">
             {productCat.length > 0 && productCat.some((product) => product.stock > 0) ? (
               productCat
                 .filter((product) => product.stock > 0)
                 .map((product) => (
                   <Product key={product._id} product={product} />
                 ))
              ) : (             
              <>
                <div className="not-found-adboard">
                        <h4>Not Found</h4>
                        <p>We are in the process of adding fashion products to our platform. Sorry for not showing the fashion product you are looking for. All kinds of fashion items will be available soon.</p>
                        <h5 onClick={reloadAds}>Go to Home</h5>
                </div>
              </>
             )}
           </div>
          )}
        </>
      )} 

      

      <div>
        {productCatError && (
          <>
          {gategory === "Product" ? "":<h4>{gategory} not found</h4>}
          <p className="tet-yg">Sorry for not showing the product you want, we are in the stage of adding Products</p>
          <h4 onClick={clearCtError} className="no-product-btn">Go to Home</h4>
          </>
          )}
      </div>
    </div>
  );
}
