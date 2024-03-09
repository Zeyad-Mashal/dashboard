import React from "react";
import image from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./DoneOrders.css";
const DoneOrders = () => {
  const openDeleteproduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-none", "d-block");
    document
      .querySelector(".done-ordes-holder")
      .classList.replace("d-block", "d-none");
  };
  const closeDeleteProduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-block", "d-none");
    document
      .querySelector(".done-ordes-holder")
      .classList.replace("d-none", "d-block");
  };
  return (
    <div className="orders-container">
      <div className="search-box">
        <input type="text" placeholder="ابحث بالباركود او الاسم" />
      </div>
      <div className="done-orders">
        <div className="done-ordes-holder">
          <table>
            <tr>
              <th>الاسم</th>
              <th>حالة الطلب</th>
              <th>السعر</th>
              <th>التاريخ</th>
              <th>كود الطلب</th>
              <th>التفاصيل</th>
            </tr>
            <tr>
              <td>
                <h5>اسم العميل</h5>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                      <a href="#">تفاصيل الطلب</a>
                    </li>
                    <li onClick={openDeleteproduct}>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>اسم العميل</h4>
              </td>
              <td className="td-done">
                <p className="done">المكتلمة</p>
              </td>
              <td>400</td>
              <td>2024/3/6</td>
              <td>A12b24d</td>
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
                    <li>تفاصيل الطلب</li>
                    <li>حذف</li>
                  </ul>
                </div>
              </td>
            </tr>
          </table>
        </div>
        {/* delete product popup */}
        <div className="delete-product d-none ">
          <h1>هل تريد حذف هذا المنتج ؟</h1>
          <div>
            <button>نعم</button>
            <button onClick={closeDeleteProduct}>لا</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneOrders;
