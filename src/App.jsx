import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import CreateSoftware from "./pages/CreateSoftware";
import RequestAccess from "./pages/RequestAccess";
import PendingRequests from "./pages/PendingRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
