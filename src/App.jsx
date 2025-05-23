import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreateSoftware from "./pages/CreateSoftware";
import RequestAccess from "./pages/RequestAccess";
import PendingRequests from "./pages/PendingRequests";
import ProtectedRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-software"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <CreateSoftware />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-access"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <RequestAccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending-requests"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <PendingRequests />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
