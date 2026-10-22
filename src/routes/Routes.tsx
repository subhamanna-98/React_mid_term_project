import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Wrapper from "../layout/Wrapper";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Vehicles from "../pages/Vehicles";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";
import { Suspense } from "react";
import Loading from "../componantes/Loading";
import ErrorBoundary from "../componantes/ErrorBoundary";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "aboutus",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "vechiles",
        element: (
          <Suspense fallback={<Loading />}>
            <Vehicles />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "cardetails",
        element: (
          <Suspense fallback={<Loading />}>
            <CarDetails />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "contactus",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactUs />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Routes;
