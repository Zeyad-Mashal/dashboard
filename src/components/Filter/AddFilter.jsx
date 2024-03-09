import React from "react";
import "./AddFilter.css";
const AddFilter = () => {
  const openUpdateproduct = () => {
    document
      .querySelector(".filter-input-udpate")
      .classList.replace("d-none", "d-block");
  };
  const closeUpdateProduct = () => {
    document
      .querySelector(".filter-input-udpate")
      .classList.replace("d-block", "d-none");
  };
  const openDeleteproduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-none", "d-block");
  };
  const closeDeleteProduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-block", "d-none");
  };
  return (
    <div className="filter-container">
      <div className="addFillter-box">
        <h1>اضف قسم جديد في الفيلتر</h1>

        <div className="filter-input">
          <input
            type="text"
            placeholder="اضف الفيلتر    مثال: خالي من ..."
            className="filter-ar"
          />
          <input type="text" placeholder="Add Filter" className="filter-en" />
          <button>حفظ</button>
        </div>
      </div>

      <div className="filter-view">
        <h2>عناصر الفيلتر المضافة</h2>
        <table>
          <tr>
            <th>اسم الفيلتر</th>
            <th>تعديل</th>
            <th>حذف</th>
          </tr>
          <tr>
            <td>الفيلتر الاول</td>
            <td>
              <button className="update-filter-btn" onClick={openUpdateproduct}>
                تعديل
              </button>
            </td>
            <td>
              <button className="delete-filter-btn" onClick={openDeleteproduct}>
                حذف
              </button>
            </td>
          </tr>
        </table>
      </div>

      {/* update filter */}
      <div className="filter-input-udpate d-none ">
        <h1>تعديل الفيلتر</h1>
        <input
          type="text"
          placeholder="اضف الفيلتر    مثال: خالي من ..."
          className="filter-ar"
        />
        <input type="text" placeholder="Add Filter" className="filter-en" />
        <button>حفظ</button>
        <button onClick={closeUpdateProduct}>إلغاء</button>
      </div>

      {/* delete product popup */}
      <div className="delete-product d-none ">
        <h1>هل تريد حذف هذا الفيلتر ؟</h1>
        <div>
          <button>نعم</button>
          <button onClick={closeDeleteProduct}>لا</button>
        </div>
      </div>
    </div>
  );
};

export default AddFilter;
