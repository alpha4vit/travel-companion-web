import React from 'react';
import './styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import Posts from "./pages/Posts";

function App() {

  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
          <Route path={"/posts"} element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
