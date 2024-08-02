import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogNavbar from "./components/layout/navbar";
import BlogIndex from "./components/pages/index";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import FooterForm from "./components/layout/footerForm";
import FooterInfo from "./components/layout/footerInfo";

import "./Blog.css";
import Blackboard from "./components/pages/blackboard";

function Blog() {
  const [view, setView] = useState(localStorage.getItem('view') || "home");

  useEffect(() => {
    const path = location.pathname.slice(1); // Elimina la barra inicial
    if (path === 'login' || path === 'signup' || path === 'home' || path === 'blackboard') {
      setView(path);
      localStorage.setItem('view', path);
    }
  }, [location]);

  const renderContent = () => {
    switch (view) {
      case "home":
        return (
          <>
            <div className="row">
              <h1 className="text-center mb-4">Bienvenido a Blog Narva</h1>
              <BlogIndex />
            </div>
            <div className="container my-5">
              <div className="row equal-height">
                <div className="col-md-4 d-flex align-items-stretch">
                  <div className="info-card shadow-lg p-4 mb-4 bg-white rounded">
                    <FooterInfo />
                  </div>
                </div>
                <div className="col-md-8 d-flex align-items-stretch">
                  <div className="form-card shadow-lg p-4 mb-4 bg-white rounded">
                    <FooterForm />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "login":
        return (
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Login setView={setView} />
              </div>
            </div>
          </div>
        );
      case "signup":
        return (
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Signup setView={setView} />
              </div>
            </div>
          </div>
        );
      case "blackboard":
        return <Blackboard setView={setView} />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      {view !== "blackboard" && <BlogNavbar setView={setView} />}
      {renderContent()}
    </div>
  );
}
export default Blog;
