import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./layouts/HomeLayout.tsx";
import HomePage from "./features/home/pages/HomePage.tsx";
import QuizStartPage from "./features/quiz/pages/QuizStartPage.tsx";
import QuizLayout from "./layouts/QuizLayout.tsx";
import QuizPage from "./features/quiz/pages/QuizPage.tsx";
import HeaderOnlyLayout from "./layouts/HeaderOnlyLayout.tsx";
import ProfilePage from "./features/profile/pages/ProfilePage.tsx";
import LoginPage from "./features/auth/pages/LoginPage.tsx";
import RegisterPage from "./features/auth/pages/RegisterPage.tsx";
import AuthSessionSync from "./providers/AuthSessionSync.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthSessionSync />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/quiz-start" element={<QuizStartPage />} />
        </Route>
        <Route path="/" element={<HeaderOnlyLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/quiz" element={<QuizLayout />}>
          <Route path=":categoryId" element={<QuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
