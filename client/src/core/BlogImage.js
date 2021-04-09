import React from "react";
import { API } from "../config";
// import '../styles/image.css'

//it takes the props as an argument
const CatImage = ({ blogImage, url }) => (
    <div className="blog-img">
        <img
            src={`${API}/blogs/photo/${blogImage.slug}`}
            alt={blogImage.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default CatImage;