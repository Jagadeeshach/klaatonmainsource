import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [placeholder, setPlaceholder] = useState("Loading...");

  useEffect(() => {
    const words = [
      "Trendy summer styles",
      "Best college outfits",
      "Latest office styles",
      "Top travel outfits",
      "New casual styles",
      "Everyday best looks",
      "Stylish night dress",
      "Best winter outfits",
      "Luxury designer fit",
      "New men's styles",
      "Trendy party wears",
      "Best fashion picks",
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      setPlaceholder(words[index].substring(0, charIndex));

      if (!isDeleting && charIndex < words[index].length) {
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          index = (index + 1) % words.length;
        }
      }

      setTimeout(typeEffect, isDeleting ? 100 : 200);
    };

    const typingInterval = setTimeout(typeEffect, 200);

    return () => clearTimeout(typingInterval);
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder={placeholder}
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Search() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [keyword, setKeyword] = useState("");

//   const searchHandler = (e) => {
//     e.preventDefault();
//     navigate(`/search/${keyword}`);
//   };

//   const clearKeyword = () => {
//     setKeyword("");
//   };

//   useEffect(() => {
//     if (location.pathname === "/") {
//       clearKeyword();
//     }
//   }, [location]);

//   return (
//     <form onSubmit={searchHandler}>
//       <div className="input-group">
//         <input
//           type="text"
//           id="search_field"
//           className="form-control"
//           placeholder="Enter Product Name ..."
//           onChange={(e) => {
//             setKeyword(e.target.value);
//           }}
//           value={keyword}
//         />
//         <div className="input-group-append">
//           <button id="search_btn" className="btn">
//             <i className="fa fa-search" aria-hidden="true"></i>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
