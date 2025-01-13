import { useState } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

// pages import
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/movies/MovieListPage";
import MovieDetailsPage from "./pages/movies/MovieDetailsPage";

// layouts import
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* default pages */}
          <Route index element={<HomePage />}></Route>

          {/* movies pages */}
          <Route path="movies">
            <Route index element={<MovieListPage />}></Route>
            <Route path=":id" element={<MovieDetailsPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
