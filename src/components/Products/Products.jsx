import React from "react";
import "./Poducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  faEllipsisVertical,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import categoryEn from "../data/category_en";
import categoryAr from "../data/category_ar";
import brandEn from "../data/brand_en";
import brandAr from "../data/brand_ar";
import getAllProduct from "../../api/getAllProduct.api";
import addProduct from "../../api/addProduct.api";
import getFilter from "../../api/getFilter.api";
import updateProduct from "../../api/updateProduct.api";
import searchInput from "../../api/searchInput.api";
import deleteProduct from "../../api/deleteProduct.api";
const Products = () => {
  useEffect(() => {
    getProducts();
  }, []);

  const [allProduct, setAllProduct] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);
  const [serverloading, setServerloading] = useState(true);

  const getProducts = async () => {
    await getAllProduct(
      setAllProduct,
      setServerErrors,
      setServerloading,
      1,
      setTotalPage,
      setCurrentPage
    );
  };

  const [prevImage, setPrevImage] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [pNameAr, setPNameAr] = useState("");
  const [pNameEn, setPNameEn] = useState("");
  const [pDescAr, setpDescAr] = useState("");
  const [pDescEn, setpDescEn] = useState("");
  const [pCategoryAr, setpCategoryAr] = useState("");
  const [pCategoryEn, setpCategoryEn] = useState("");
  const [pBrandAr, setpBrandAr] = useState("");
  const [pBrandEn, setpBrandEn] = useState("");
  const [Price, setPrice] = useState("");
  const [priceBeforeDisc, setpriceBeforeDisc] = useState("");
  const [section, setSection] = useState("");
  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loading, setloading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [productID, setProductID] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [costPrice, setCostPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [filterAr, setFilterAr] = useState("");
  const [filterEn, setFilterEn] = useState("");
  const [color, setColor] = useState("");
  const [colorStock, setColorStock] = useState("");
  const [mainStock, setMainStock] = useState("");

  const [filter, setFilter] = useState([]);
  const [allFilter, setAllFilter] = useState([]);
  const [filterEnBox, setFilterEnBox] = useState([]);

  const [colorBox, setColorBox] = useState([]);
  const [colorStockBox, setColorStockBox] = useState([]);

  const addToColorBox = () => {
    setColorBox((current) => [...current, color]);
    setColor("");
  };

  const addToColorStockBox = () => {
    setColorStockBox((current) => [...current, colorStock]);
    setColorStock("");
  };

  const addToFilterArBox = () => {
    setFilter((current) => [...current, filterAr]);
    setFilterAr("");
  };

  const addToFilterEnBox = () => {
    setFilterEnBox((current) => [...current, filterEn]);
    setFilterEn("");
  };

  const selectImage = (e) => {
    const allImages = e.target.files;
    const imagesArr = Array.from(allImages);
    const prevImage = [];
    const allFiles = [];
    for (let i = 0; i < imagesArr.length; i++) {
      prevImage.push(URL.createObjectURL(imagesArr[i]));
      allFiles.push(imagesArr[i]);
    }
    setPrevImage(prevImage);
    setAllFiles(allFiles);
  };

  const addProductFunc = () => {
    if (allFiles.length == 0) {
      setError("قم برفع صور المنتج اولا");
    } else {
      if (
        pNameAr == "" ||
        pNameEn == "" ||
        pDescAr == "" ||
        pDescEn == "" ||
        costPrice == "" ||
        barcode == "" ||
        Price == "" ||
        pCategoryAr == "" ||
        pCategoryEn == "" ||
        pBrandAr == "" ||
        pBrandEn == "" ||
        mainStock == "" ||
        filter.length != filterEnBox.length ||
        colorBox.length != colorStockBox.length ||
        pCategoryEn == "Choice Category" ||
        pCategoryAr == "اختر الفئة" ||
        pBrandAr == "اختر البراند" ||
        pBrandEn == "Choice Brand"
      ) {
        setError("قم بإدخال بيانات المنتج كاملة");
      } else {
        let productData = new FormData();
        for (let i = 0; i < allFiles.length; i++) {
          productData.append("image", allFiles[i]);
        }
        productData.append("translation.ar.productName", pNameAr);
        productData.append("translation.ar.description", pDescAr);
        productData.append("translation.ar.category", pCategoryAr);
        productData.append("translation.ar.brand", pBrandAr);
        productData.append("translation.en.productName", pNameEn);
        productData.append("translation.en.description", pDescEn);
        productData.append("translation.en.category", pCategoryEn);
        productData.append("translation.en.brand", pBrandEn);
        productData.append("price", Price);
        productData.append("productCode", barcode);
        productData.append("stock", mainStock);
        productData.append("costPrice", costPrice);
        if (priceBeforeDisc != "")
          productData.append("priceBeforeDiscount", priceBeforeDisc);
        else productData.append("priceBeforeDiscount", 0);
        if (section != "") productData.append("sectionType", section);
        if (colorBox.length != 0) {
          for (let i = 0; i < colorBox.length; i++) {
            productData.append("colors.name", colorBox[i]);
          }
          for (let i = 0; i < colorStockBox.length; i++) {
            productData.append("colors.stock", colorStockBox[i]);
          }
        }
        if (filter.length != 0) {
          for (let i = 0; i < filter.length; i++) {
            productData.append("translation.ar.filter", filter[i]);
          }
        }
        if (filterEnBox.length != 0) {
          for (let i = 0; i < filterEnBox.length; i++) {
            productData.append("translation.en.filter", filterEnBox[i]);
          }
        }
        addProduct(
          productData,
          setError,
          setloading,
          setAllProduct,
          setTotalPage,
          setCurrentPage
        );
      }
    }
  };

  const updateProductFunc = () => {
    console.log("test");
    if (prevImage.length == 0) {
      setError("قم برفع صور المنتج اولا");
    } else {
      if (
        pNameAr == "" ||
        pNameEn == "" ||
        pDescAr == "" ||
        pDescEn == "" ||
        costPrice == "" ||
        barcode == "" ||
        Price == "" ||
        pCategoryAr == "" ||
        pCategoryEn == "" ||
        pBrandAr == "" ||
        pBrandEn == "" ||
        mainStock == "" ||
        filter.length != filterEnBox.length ||
        colorBox.length != colorStockBox.length ||
        pCategoryEn == "Choice Category" ||
        pCategoryAr == "اختر الفئة" ||
        pBrandAr == "اختر البراند" ||
        pBrandEn == "Choice Brand"
      ) {
        setError("قم بإدخال بيانات المنتج كاملة");
      } else {
        let productData = new FormData();
        if (allFiles.length != 0) {
          for (let i = 0; i < allFiles.length; i++) {
            productData.append("image", allFiles[i]);
          }
        }
        productData.append("translation.ar.productName", pNameAr);
        productData.append("translation.ar.description", pDescAr);
        productData.append("translation.ar.category", pCategoryAr);
        productData.append("translation.ar.brand", pBrandAr);
        productData.append("translation.en.productName", pNameEn);
        productData.append("translation.en.description", pDescEn);
        productData.append("translation.en.category", pCategoryEn);
        productData.append("translation.en.brand", pBrandEn);
        productData.append("price", Price);
        productData.append("productCode", barcode);
        productData.append("stock", mainStock);
        productData.append("costPrice", costPrice);
        if (priceBeforeDisc != "")
          productData.append("priceBeforeDiscount", priceBeforeDisc);
        else productData.append("priceBeforeDiscount", 0);
        if (section != "") productData.append("sectionType", section);
        if (colorBox.length != 0) {
          for (let i = 0; i < colorBox.length; i++) {
            productData.append("colors.name", colorBox[i]);
          }
          for (let i = 0; i < colorStockBox.length; i++) {
            productData.append("colors.stock", colorStockBox[i]);
          }
        }
        if (filter.length != 0) {
          for (let i = 0; i < filter.length; i++) {
            productData.append("translation.ar.filter", filter[i]);
          }
        }
        if (filterEnBox.length != 0) {
          for (let i = 0; i < filterEnBox.length; i++) {
            productData.append("translation.en.filter", filterEnBox[i]);
          }
        }

        updateProduct(
          productData,
          setError,
          setloading,
          setAllProduct,
          setTotalPage,
          setCurrentPage,
          productID
        );
      }
    }
  };

  const openPopup = () => {
    setPrevImage([]);
    setAllFiles([]);
    setPNameAr("");
    setPNameEn("");
    setpDescAr("");
    setpDescEn("");
    setpCategoryAr("");
    setpCategoryEn("");
    setpBrandAr("");
    setpBrandEn("");
    setPrice("");
    setpriceBeforeDisc("");
    setSection("");
    setPrevImage([]);
    setProductID("");
    setError("");
    setColor([]);
    setColorStock([]);
    setFilter([]);
    setFilterEnBox([]);
    setCostPrice("");
    setBarcode("");
    getFilter(setAllFilter);
    document
      .querySelector(".add-prodcut_popup")
      .classList.replace("d-none", "d-flex");
  };
  const closePopup = () => {
    document
      .querySelector(".add-prodcut_popup")
      .classList.replace("d-flex", "d-none");
  };
  const openUpdatePopup = (
    pNameAr,
    pNameEn,
    pCategoryAr,
    pCategoryEn,
    pBrandAr,
    pBrandEn,
    price,
    image,
    cost,
    code,
    stock,
    section,
    colors,
    filterAr,
    filterEn,
    descriptionAr,
    descriptionEn,
    _id
  ) => {
    setPNameAr(pNameAr);
    setPNameEn(pNameEn);
    setpCategoryAr(pCategoryAr);
    setpCategoryEn(pCategoryEn);
    setpBrandAr(pBrandAr);
    setpBrandEn(pBrandEn);
    setPrice(price);
    setPrevImage(image);
    setCostPrice(cost);
    setBarcode(code);
    setpDescAr(descriptionAr);
    setpDescEn(descriptionEn);
    setMainStock(stock);
    setSection(section);
    setFilter(filterAr);
    setFilterEnBox(filterEn);
    setProductID(_id);
    getFilter(setAllFilter);
    if (colors.length != 0) {
      for (let index = 0; index < colors.length; index++) {
        const element = colors[index];
        setColorBox((current) => [...current, element.name]);
        setColorStockBox((current) => [...current, element.stock]);
      }
    }

    document
      .querySelector(".update-prodcut_popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdatePopup = () => {
    document
      .querySelector(".update-prodcut_popup")
      .classList.replace("d-flex", "d-none");
  };
  const openDeleteproduct = (productID) => {
    setProductID(productID);
    document
      .querySelector(".delete-product")
      .classList.replace("d-none", "d-block");
  };
  const closeDeleteProduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-block", "d-none");
    document
      .querySelector(".prodcuts-view")
      .classList.replace("d-none", "d-block");
  };

  if (serverloading)
    return (
      <div className="loaderDiv container ">
        <span class="loader"></span>
      </div>
    );
  if (serverErrors)
    return (
      <div className="errorDiv container ">
        <p>{serverErrors}</p>
      </div>
    );

  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      getAllProduct(
        setAllProduct,
        setServerErrors,
        setServerloading,
        newpage,
        setTotalPage,
        setCurrentPage
      );
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      console.log(newpage);
      getAllProduct(
        setAllProduct,
        setServerErrors,
        setServerloading,
        newpage,
        setTotalPage,
        setCurrentPage
      );
    }
  };

  const searchProduct = (searchKey) => {
    if (searchKey == "") {
      getAllProduct(
        setAllProduct,
        setServerErrors,
        setServerloading,
        1,
        setTotalPage,
        setCurrentPage
      );
    } else {
      searchInput(setSearchError, setSearchLoading, setAllProduct, searchKey);
    }
  };

  const deleteProductFunc = () => {
    deleteProduct(setDeleteError, setDeleteLoading, setAllProduct, productID);
  };

  const removeColor = (color) => {
    setColorBox((prev) => prev.filter((item) => item != color));
  };

  const removeColorStock = (stock) => {
    setColorStockBox((prev) => prev.filter((item) => item != stock));
  };

  const removeFilterAr = (filterAr) => {
    setFilter((prev) => prev.filter((item) => item != filterAr));
  };

  const removeFilterEn = (filterEn) => {
    setFilterEnBox((prev) => prev.filter((item) => item != filterEn));
  };

  return (
    <div className="product-container">
      <div className="header d-flex ">
        <div className="search-box">
          <input
            type="text"
            placeholder="ابحث بالباركود او الاسم"
            onChange={(e) => {
              searchProduct(e.target.value);
            }}
          />
        </div>
        <div className="add-porduct">
          <button onClick={openPopup}>اضافة منتج جديد</button>
        </div>
      </div>
      {/* add prodcut popup */}
      <div className="add-prodcut_popup d-none">
        <div className="popup-product">
          <div className="imageHolder">
            {prevImage.length != 0 ? (
              <div className="d-flex flex-wrap gap-2 ">
                {prevImage.map((item) => {
                  return (
                    <div key={item} className="productImageBox">
                      <img src={item} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <label>
                <div className="d-flex justify-content-center align-items-center flex-direction-column add-product-pic">
                  <FontAwesomeIcon icon={faCamera} />
                  <p>اختر صور المنتج المطلوب</p>
                </div>
                <input
                  className="select-input"
                  multiple
                  type="file"
                  name="images"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={selectImage}
                />
              </label>
            )}
          </div>
          <div className="add-prodcut-content">
            <div className="name-inputs">
              <input
                type="text"
                placeholder="اسم المنتج"
                value={pNameAr}
                onChange={(e) => setPNameAr(e.target.value)}
              />
              <input
                type="text"
                placeholder="product name"
                value={pNameEn}
                onChange={(e) => setPNameEn(e.target.value)}
              />
            </div>
            <div className="desc-inputs">
              <input
                type="text"
                placeholder="وصف المنتج"
                value={pDescAr}
                onChange={(e) => setpDescAr(e.target.value)}
              />
              <input
                type="text"
                placeholder="product description"
                value={pDescEn}
                onChange={(e) => setpDescEn(e.target.value)}
              />
            </div>
            <div className="price-inputs">
              <input
                type="text"
                placeholder="تكلفة المنتج"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="سعر بيع المنتج"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="باركود المنتج"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </div>
            <div className="categorys">
              <select
                className="category-select_ar"
                value={pCategoryAr}
                onChange={(e) => setpCategoryAr(e.target.value)}
              >
                <option value="اختر الفئة">اختر الفئة</option>
                {categoryAr.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
              <select
                className="category-select_en"
                value={pCategoryEn}
                onChange={(e) => setpCategoryEn(e.target.value)}
              >
                <option value="Choise Category">Choise Category</option>
                {categoryEn.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="brands">
              <select
                className="brand-select_ar"
                value={pBrandAr}
                onChange={(e) => setpBrandAr(e.target.value)}
              >
                <option value="اختر البراند">اختر البراند</option>
                {brandAr.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
              <select
                className="brand-select_en"
                value={pBrandEn}
                onChange={(e) => setpBrandEn(e.target.value)}
              >
                <option value="Choise brand">Choise brand</option>
                {brandEn.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="filter">
              <div className="filter-ar">
                <div className="w-100 filterBox">
                  <select
                    className="filter-select_ar"
                    value={filterAr}
                    onChange={(e) => setFilterAr(e.target.value)}
                  >
                    <option value="الفيلتر ">الفيلتر</option>
                    {allFilter.map((item) => {
                      return (
                        <option key={item.filterName_Ar}>
                          {item.filterName_Ar}
                        </option>
                      );
                    })}
                  </select>
                  <span className="pushFilter-ar" onClick={addToFilterArBox}>
                    +
                  </span>
                </div>
                <div className="pushFilterBox-ar">
                  {filter.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeFilterAr(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="filter-en">
                <div className="w-100 filterBox">
                  <select
                    className="filter-select_en"
                    value={filterEn}
                    onChange={(e) => setFilterEn(e.target.value)}
                  >
                    <option value="Filter">Filter</option>
                    {allFilter.map((item) => {
                      return (
                        <option key={item.filterName_En}>
                          {item.filterName_En}
                        </option>
                      );
                    })}
                  </select>
                  <span className="pushFilter-en" onClick={addToFilterEnBox}>
                    +
                  </span>
                </div>
                <div className="pushFilterBox-en">
                  {filterEnBox.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeFilterEn(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="color">
              <div>
                <div className="color-box">
                  <input
                    type="text"
                    placeholder="اضف اللون"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <span className="pushColor" onClick={addToColorBox}>
                    +
                  </span>
                </div>
                <div className="pushColor-box">
                  {colorBox.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeColor(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="color-stock-box">
                  <input
                    type="number"
                    placeholder="اضف عدد المنتج من هذا اللون"
                    value={colorStock}
                    onChange={(e) => setColorStock(e.target.value)}
                  />
                  <span className="pushColorStock" onClick={addToColorStockBox}>
                    +
                  </span>
                </div>
                <div className="pushColorStock-box">
                  {colorStockBox.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p key={item}>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeColorStock(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="section-stock">
              <div className="section">
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="اختر القسم">اختر القسم</option>
                  <option value="Trending">Trending</option>
                  <option value="Our Selection">Our Selection</option>
                  <option value="On Sale">On Sale</option>
                </select>
              </div>
              <div className="mainStock">
                <input
                  type="number"
                  placeholder="المخزن الكلي"
                  value={mainStock}
                  onChange={(e) => setMainStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="error">
            <p>{error}</p>
          </div>
          <div className="add-product-btns">
            <button onClick={addProductFunc}>
              {loading ? <span className="loaderAdd"></span> : "إضافة"}
            </button>
            <button onClick={closePopup}>الغاء</button>
          </div>
        </div>
      </div>
      {/* update prodcut popup */}
      <div className="update-prodcut_popup d-none">
        <div className="popup-product">
          <div className="imageHolder">
            <div className="d-flex flex-wrap gap-2 ">
              {prevImage.map((item) => {
                return (
                  <div key={item} className="productImageBox">
                    <img src={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <label>
            <div className="d-flex justify-content-center align-items-center flex-direction-column add-product-pic">
              <p className="update-pic">اختر صور جديدة للمنتج</p>
            </div>
            <input
              className="select-input"
              multiple
              type="file"
              name="images"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={selectImage}
            />
          </label>
          <div className="add-prodcut-content">
            <div className="name-inputs">
              <input
                type="text"
                value={pNameAr}
                onChange={(e) => setPNameAr(e.target.value)}
                placeholder="اسم المنتج"
              />
              <input
                type="text"
                value={pNameEn}
                onChange={(e) => setPNameEn(e.target.value)}
                placeholder="product name"
              />
            </div>
            <div className="desc-inputs">
              <input
                type="text"
                value={pDescAr}
                onChange={(e) => setpDescAr(e.target.value)}
                placeholder="وصف المنتج"
              />
              <input
                type="text"
                value={pDescEn}
                onChange={(e) => setpDescEn(e.target.value)}
                placeholder="product description"
              />
            </div>
            <div className="price-inputs">
              <input
                type="text"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="تكلفة المنتج"
              />
              <input
                type="text"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="سعر بيع المنتج"
              />
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="باركود المنتج"
              />
            </div>
            <div className="categorys">
              <select
                className="category-select_ar"
                value={pCategoryAr}
                onChange={(e) => setpCategoryAr(e.target.value)}
              >
                <option value="اختر الفئة">اختر الفئة</option>
                {categoryAr.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
              <select
                className="category-select_en"
                value={pCategoryEn}
                onChange={(e) => setpCategoryEn(e.target.value)}
              >
                <option value="Choise Category">Choise Category</option>
                {categoryEn.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="brands">
              <select
                className="brand-select_ar"
                value={pBrandAr}
                onChange={(e) => setpBrandAr(e.target.value)}
              >
                <option value="اختر البراند">اختر البراند</option>
                {brandAr.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
              <select
                className="brand-select_en"
                value={pBrandEn}
                onChange={(e) => setpBrandEn(e.target.value)}
              >
                <option value="Choise brand">Choise brand</option>
                {brandEn.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="filter">
              <div className="filter-ar">
                <div className="w-100 filterBox">
                  <select
                    value={filterAr}
                    onChange={(e) => setFilterAr(e.target.value)}
                    className="filter-select_ar"
                  >
                    <option value="الفيلتر ">الفيلتر </option>
                    {allFilter.map((item) => {
                      return (
                        <option key={item.filterName_Ar}>
                          {item.filterName_Ar}
                        </option>
                      );
                    })}
                  </select>
                  <span className="pushFilter-ar" onClick={addToFilterArBox}>
                    +
                  </span>
                </div>
                <div className="pushFilterBox-ar">
                  {filter.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeFilterAr(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="filter-en">
                <div className="w-100 filterBox">
                  <select
                    value={filterEn}
                    onChange={(e) => setFilterEn(e.target.value)}
                    className="filter-select_en"
                  >
                    <option value="Filter">Filter</option>
                    {allFilter.map((item) => {
                      return (
                        <option key={item.filterName_En}>
                          {item.filterName_En}
                        </option>
                      );
                    })}
                  </select>
                  <span className="pushFilter-en" onClick={addToFilterEnBox}>
                    +
                  </span>
                </div>
                <div className="pushFilterBox-en">
                  {filterEnBox.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeFilterEn(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="color">
              <div>
                <div className="color-box">
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    type="text"
                    placeholder="اضف اللون"
                  />
                  <span className="pushColor" onClick={addToColorBox}>
                    +
                  </span>
                </div>
                <div className="pushColor-box">
                  {colorBox.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeColor(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="color-stock-box">
                  <input
                    type="text"
                    value={colorStock}
                    onChange={(e) => setColorStock(e.target.value)}
                    placeholder="اضف عدد المنتج من هذا اللون"
                  />
                  <span className="pushColorStock" onClick={addToColorStockBox}>
                    +
                  </span>
                </div>
                <div className="pushColorStock-box">
                  {colorStockBox.map((item) => {
                    return (
                      <div key={item} className="pushColor-item">
                        <p>{item}</p>
                        <span
                          className="delete-color"
                          onClick={() => removeColorStock(item)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="section-stock">
              <div className="section">
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="اختر القسم">اختر القسم</option>
                  <option value="Trending">Trending</option>
                  <option value="Our Selection">Our Selection</option>
                  <option value="On Sale">On Sale</option>
                </select>
              </div>
              <div className="mainStock">
                <input
                  type="number"
                  value={mainStock}
                  onChange={(e) => setMainStock(e.target.value)}
                  placeholder="المخزن الكلي"
                />
              </div>
            </div>
          </div>
          <div className="error">
            <p>{error}</p>
          </div>
          <div className="add-product-btns">
            <button onClick={updateProductFunc}>
              {loading ? <span className="loaderAdd"></span> : "تعديل"}
            </button>
            <button onClick={closeUpdatePopup}>الغاء</button>
          </div>
        </div>
      </div>
      {/* delete product popup */}
      <div className="delete-box">
        <div className="delete-product d-none ">
          <h2>هل تريد حذف هذا المنتج ؟</h2>
          <p>{deleteError}</p>
          <div>
            <button onClick={deleteProductFunc}>
              {deleteLoading ? <span className="loaderAdd"></span> : "حذف"}
            </button>
            <button onClick={closeDeleteProduct}>لا</button>
          </div>
        </div>
      </div>
      <br />
      {/* all products here */}
      <div className="prodcuts-view w-100  d-block">
        <div className="prodcut-card d-flex gap-5 w-100">
          {searchLoading ? (
            <span className="loaderSearch"></span>
          ) : searchError != "" ? (
            <p>{searchError}</p>
          ) : (
            <table>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>الباركود</th>
                <th>البراند</th>
                <th>الفئة</th>
                <th>السعر</th>
                <th>التفاصيل</th>
              </tr>
              {allProduct.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.images[0]} alt="" width={100} />
                    </td>
                    <td>
                      <h4>{item.translation.ar.productName}</h4>
                    </td>
                    <td>
                      <p>{item.productCode}</p>
                    </td>
                    <td>{item.translation.ar.brand}</td>
                    <td>{item.translation.ar.category}</td>
                    <td>{item.price}</td>
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
                          <li
                            onClick={() =>
                              openUpdatePopup(
                                item.translation.ar.productName,
                                item.translation.en.productName,
                                item.translation.ar.category,
                                item.translation.en.category,
                                item.translation.ar.brand,
                                item.translation.en.brand,
                                item.price,
                                item.images,
                                item.costPrice,
                                item.productCode,
                                item.stock,
                                item.sectionType,
                                item.colors,
                                item.translation.ar.filter,
                                item.translation.en.filter,
                                item.translation.ar.description,
                                item.translation.en.description,
                                item._id
                              )
                            }
                          >
                            <a>تعديل</a>
                          </li>
                          <li onClick={() => openDeleteproduct(item._id)}>
                            <a>حذف</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
      <div className="pagination-controls">
        <button onClick={next}>التالي</button>
        <button onClick={previous}>السابق</button>
      </div>
    </div>
  );
};

export default Products;
