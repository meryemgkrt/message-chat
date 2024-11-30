import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterChat from "../chatPages/RegisterChat";
import CheckEmailPage from "../chatPages/CheckEmailPage";
import CheckPasswordPage from "../chatPages/CheckPasswordPage";
import Home from "../chatPages/Home";
import MessagePages from "../components/MessagePages";
import AuthLayouts from "../layout";
import ForgotPassord from "../chatPages/ForgotPassord";


const router = createBrowserRouter([
  {
      path : "/",
      element : <App/>,
      children : [
          {
              path : "register",
              element : <AuthLayouts><RegisterChat/></AuthLayouts>
          },
          {
              path : 'email',
              element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
          },
          {
              path : 'password',
              element : <AuthLayouts><CheckPasswordPage/></AuthLayouts>
          },
          {
              path : 'forgot-password',
              element : <AuthLayouts><ForgotPassord/></AuthLayouts>
          },
          {
              path : "",
              element : <Home/>,
              children : [
                  {
                      path : ':userId',
                      element : <MessagePages/>
                  }
              ]
          }
      ]
  }
  ])
  
  export default router
