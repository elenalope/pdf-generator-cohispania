import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from '../layout/LayoutPublic';
import Home from '../pages/home/Home';
import Template from '../pages/template/Template'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/template",
        element: <Template />,
      }
    ]
  }
]);

export default router;
