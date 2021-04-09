import React from "react";
import { API } from "../config";
// import '../styles/image.css'

//it takes the props as an argument
const CatImage = ({ item, url }) => (
    <div className="category-img">
        <img
            src={`${API}/category/photo/${item.slug}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default CatImage;