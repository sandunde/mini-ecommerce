import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Fav from "./pages/favourite/Fav";
import New from "./pages/new/New";
import Edit from "./pages/edit/Edit";
import Navbar from "./components/navbar/Navbar";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Fav />} />
          <Route path="create" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
