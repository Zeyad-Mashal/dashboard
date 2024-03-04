import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import IndexPage from "./pages/Index"
import Layout from "./components/Layout"
import Dashboard from "./pages/dashboard"
import Categories from "./pages/categories"
import Customers from "./pages/customers"
import CustomerProfile from "./pages/customers/profile"
import Orders from "./pages/orders"
import EditOrder from "./pages/orders/EditOrder"
import Delivery from "./pages/delivery"
import Subscriptions from "./pages/subscriptions"
import Coupons from "./pages/coupons"
import Packages from "./pages/packages"
import Sliders from "./pages/sliders"
import Users from "./pages/users"
import AddUser from "./pages/users/AddUser";
import FinancialReports from "./pages/financial-reports"
import Settings from "./pages/settings"
import About from "./pages/about";
import EditUser from "./pages/users/EditUser";
import Products from "./pages/products"
import AddProduct from "./pages/products/AddProduct"
import ViewProduct from "./pages/products/ViewProduct"
import ViewCustomer from "./pages/customers/ViewCustomer"
import AddPackage from "./pages/packages/AddPackage"
import ViewPackage from "./pages/packages/ViewPackage"
import EditProduct from "./pages/products/EditProduct"
import SearchResultList from "./components/products/SearchResultList"
import DeliveryAgents from "./pages/delivery-agents"
import NewsLetters from "./pages/newsletters"
import CategorySearchResult from "./components/categories/CategorySearchResult"
import Blogs from "./pages/blogs"
import AddBlog from "./pages/blogs/AddBlog"
import EditBlog from "./pages/blogs/EditBlog"
import ViewBlog from "./pages/blogs/ViewBlog"


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customer-view/:id" element={<ViewCustomer />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categorysearch" element={<CategorySearchResult />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/productsearch" element={<SearchResultList />} />
                    <Route path="/product-add" element={<AddProduct />} />
                    <Route path="/product-view/:id" element={<ViewProduct />} />
                    <Route path="/product-edit/:id" element={<EditProduct />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:orderId" element={<EditOrder />} />
                    <Route path="/delivery" element={<Delivery />} />
                    <Route path="/delivery-agents" element={<DeliveryAgents />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/coupons" element={<Coupons />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/package-add" element={<AddPackage />} />
                    <Route path="/package-view/:id" element={<ViewPackage />} />
                    <Route path="/sliders" element={<Sliders />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/user-add" element={<AddUser />} />
                    <Route path="/user-edit/:id" element={<EditUser />} />
                    <Route path="/newsletters" element={<NewsLetters />} />
                    <Route path="/reports" element={<FinancialReports />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blog-add" element={<AddBlog />} />
                    <Route path="/blog-edit/:id" element={<EditBlog />} />
                    <Route path="/blog-view/:id" element={<ViewBlog />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter
