import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/home/Index";
import Profile from "./pages/profile/Index";
import SavedProducts from "./pages/save-products/Index";
import AuthProvider from "./providers/AuthProvider";
import ProductDetail from "./pages/home/ProductDetail";
import Admin from "./pages/admin/Admin";
import { AdminProvider } from "./context/AdminContext";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        },
        {
          path: "/admin",
          element: (
            <AuthProvider>
              <AdminProvider>
                <Admin />
              </AdminProvider>
            </AuthProvider>
          ),
        },

        {
          path: "/saved-products",
          element: (
            <AuthProvider>
              <SavedProducts />
            </AuthProvider>
          ),
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
