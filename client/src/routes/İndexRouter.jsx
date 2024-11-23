import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterChat from "../chatPages/RegisterChat";
import CheckEmailPage from "../chatPages/CheckEmailPage";
import CheckPasswordPage from "../chatPages/CheckPasswordPage";
import Home from "../chatPages/Home";
import MessagePages from "../components/MessagePages";
import AuthLayouts from "../layout";
import ForgotPassord from "../chatPages/ForgotPassord";
import Sidebar from "../components/Sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <RegisterChat />,
      },
      {
        path: "/email",
        element: <CheckEmailPage />,
      },
      {
        path: "/password",
        element: <CheckPasswordPage />,
      },
      {
        path:"forgot-password",
        element: <ForgotPassord />,
      },
      {
        path: "",
        element: (
          <AuthLayouts>
            <Home />
          </AuthLayouts>
        ),
        children: [
         /*  {
            path: ":userId",
            element: <Sidebar />,
          }, */
          {
            path: ":userId", // Dinamik parametre ":" ile belirtilmeli
            element: <MessagePages />,
          },
        ],
      },
    ],
  },
]);

export default router;
