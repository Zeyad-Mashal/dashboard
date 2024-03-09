import React from "react";
import "./AnalysisPage.css";
const AnalysisPage = () => {
  return (
    <div className="container">
      <div className="profit">
        <h2>عدد الطلبات اليوم</h2>
        <p>10,000SAR</p>
      </div>
      <div className="productsSold">
        <h2>عدد المنتجات المباعة</h2>
        <p>150 منتج</p>
      </div>
      <div className="things">
        <h2>حاجات تانية</h2>
        <p>تفاصيل الحاجات التانية</p>
      </div>
    </div>
  );
};

export default AnalysisPage;
