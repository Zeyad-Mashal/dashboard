import React from "react";
import "./ProductDetails.css";
import image from "../../images/logo.png";
const ProductDetails = () => {
  return (
    <div className="details-container">
      <div className="product-holder">
        <div>
          <img src={image} width={350} />
        </div>
        <div className="product-info">
          <div>
            <h4>الاسم هنا</h4>
            <p>سعر : 300 ريال</p>
            <p>الباركود: 123456789</p>
          </div>
          <div className="desc-product">
            <p>
              الوصف: هذا المنتج هو المنتج الذي يطير و انا انا و الحديد اتني و
              اعوذ بالله من كلمة انا
            </p>
            <p>المخزن: 100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
