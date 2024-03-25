import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage/ui/MainPage";
import { PostPage } from "../pages/PostPage/ui/PostPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="post/:postId" element={<PostPage />} />
    </Routes>
  )
}