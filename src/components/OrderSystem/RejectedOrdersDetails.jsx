import React from "react";
import image from "../../images/logo.png";
import "./OrderDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./DoneOrders.css";
const RejectedOrdersDetails = () => {
  const openDeleteproduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-none", "d-block");
    document
      .querySelector(".prodcuts-view")
      .classList.replace("d-block", "d-none");
  };
  const closeDeleteProduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-block", "d-none");
    document
      .querySelector(".prodcuts-view")
      .classList.replace("d-none", "d-block");
  };
  return (
    <div className="order-container">
      <div className="order-box">
        <div className="img-holder">
          <img src={image} width={250} />
          <img src={image} width={250} />
          <img src={image} width={250} />
        </div>
        <div className="order-details">
          <h1> تفاصيل الطلب الملغي</h1>
          <h4>اسم العميل: زياد احمد</h4>
          <h5>كود الطلب: Ab12356</h5>
          <h5>اجمالي المبلغ: 500 ريال</h5>
          <h5>تاريخ الطلب: 2024/3/6</h5>
          <h5>المدينة التي يتم الشحن لها: الرياض</h5>
        </div>
        <div className="order-btns">
          <p className="done-p">تم إلغاء الطلب</p>
          <button>الي المؤكدة</button>
        </div>
      </div>
      <div className="order-view w-100">
        <h2 className="mt-4">تفاصيل الطلب الملغي</h2>
        <table>
          <tr>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>الباركود</th>
            <th>البراند</th>
            <th>الفئة</th>
            <th>اجمالي السعر</th>
            <th>الكمية المطلوبة</th>
            <th>الالوان</th>
            <th>التفاصيل</th>
          </tr>
          <tr>
            <td>
              <img src={image} alt="" width={100} />
            </td>
            <td>
              <h4>اسم المنتج</h4>
            </td>
            <td>
              <p>123456789</p>
            </td>
            <td>البراند</td>
            <td>العناية الليلة</td>
            <td>300</td>
            <td>5 قطع</td>
            <td>الاسود و الاحمر</td>
            <td>
              <div class="btn-group dropend w-100">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#">تفاصيل المنتج</a>
                  </li>
                  <li onClick={openDeleteproduct}>
                    <a>حذف</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img src={image} alt="" width={100} />
            </td>
            <td>
              <h4>اسم المنتج</h4>
            </td>
            <td>
              <p>123456789</p>
            </td>
            <td>البراند</td>
            <td>العناية الليلة</td>
            <td>300</td>
            <td>5 قطع</td>
            <td>الاسود و الاحمر</td>
            <td>
              <div class="btn-group dropend w-100">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <ul class="dropdown-menu">
                  <li>تفاصيل المنتج</li>
                  <li>حذق</li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img src={image} alt="" width={100} />
            </td>
            <td>
              <h4>اسم المنتج</h4>
            </td>
            <td>
              <p>123456789</p>
            </td>
            <td>البراند</td>
            <td>العناية الليلة</td>
            <td>300</td>
            <td>5 قطع</td>
            <td>الاسود و الاحمر</td>
            <td>
              <div class="btn-group dropend w-100">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <ul class="dropdown-menu">
                  <li>تفاصيل المنتج</li>
                  <li>حذق</li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img src={image} alt="" width={100} />
            </td>
            <td>
              <h4>اسم المنتج</h4>
            </td>
            <td>
              <p>123456789</p>
            </td>
            <td>البراند</td>
            <td>العناية الليلة</td>
            <td>300</td>
            <td>5 قطع</td>
            <td>الاسود و الاحمر</td>
            <td>
              <div class="btn-group dropend w-100">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <ul class="dropdown-menu">
                  <li>تفاصيل المنتج</li>
                  <li>حذق</li>
                </ul>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default RejectedOrdersDetails;
