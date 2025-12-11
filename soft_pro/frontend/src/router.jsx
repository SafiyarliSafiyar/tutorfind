import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TutorProfile from "./pages/TutorProfile";
import TutorDashboard from "./pages/TutorDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import ProfileSettings from "./pages/ProfileSettings";
import Availability from "./pages/Availability";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchResults /> },
      { path: "tutor/:id", element: <TutorProfile /> },
      { path: "dashboard", element: <TutorDashboard /> },
      { path: "learner", element: <LearnerDashboard /> },
      { path: "settings/profile", element: <ProfileSettings /> },
      { path: "settings/availability", element: <Availability /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> }
    ]
  }
]);

export default router;
