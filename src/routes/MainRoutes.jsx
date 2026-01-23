import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/register" element={<h1>Register Page</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/chat" element={<h1>Chat Page</h1>} />
    </Routes>
  );
};

export default MainRoutes;
