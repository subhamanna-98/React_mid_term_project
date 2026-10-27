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
import AdminPRotected from "../componantes/AdminPRotected";
import Dashboard from "../pages/Admin/Dashboard";
import AdminCategory from "../pages/Admin/AdminCategory";
import Adminwrapper from "../layout/Adminwrapper";
import AdminCars from "../pages/Admin/AdminCars";
import AdminBooking from "../pages/Admin/AdminBooking";
import Cart from "../pages/Cars";
import MyBookings from "../pages/Customer/MyBookings";

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
       {
        path: "cart",
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "my-bookings",
        element: (
          <Suspense fallback={<Loading />}>
            <MyBookings />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
   {
    path:"/admin",
    element: <AdminPRotected/>,
    children:[
       {
    path: "",
    element: <Adminwrapper />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "category",
        // element:<Category/>
        element: (
          <Suspense fallback={<Loading />}>
            <AdminCategory />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "cars",
       
        element: (
          <Suspense fallback={<Loading />}>
            <AdminCars />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "bookings",
      
        element: (
          <Suspense fallback={<Loading />}>
            <AdminBooking />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
    ]
   },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Routes;
