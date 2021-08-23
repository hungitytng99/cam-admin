import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import ListProducts from "views/admin/ListProducts.js";
import AddProducts from "views/admin/AddProducts.js";
import ListCategory from "views/admin/ListCategory.js";
import AddCategory from "views/admin/AddCategory";
import EditMainCategory from "views/admin/EditMainCategory";
import ListHotProduct from "views/admin/ListHotProduct";
import EditProduct from "views/admin/EditProduct";
import ListInquiry from "views/admin/ListInquiry";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/list-products" exact component={ListProducts} />
            <Route path="/admin/add-products" exact component={AddProducts} />
            <Route path="/admin/list-hot-products" exact component={ListHotProduct} />
            <Route path="/admin/edit-products/:id" exact component={EditProduct} />

            <Route path="/admin/category" exact component={ListCategory} />
            <Route path="/admin/add-category" exact component={AddCategory} />
            <Route path="/admin/edit-main-category/:id" exact component={EditMainCategory} />
            <Route path="/admin/list-inquiry" exact component={ListInquiry} />
            <Redirect from="/admin" to="/admin/list-products" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
