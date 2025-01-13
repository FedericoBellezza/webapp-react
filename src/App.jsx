import { useState } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

// pages import
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/movies/MovieListPage";

// layouts import
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="movies" element={<MovieListPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
