import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from '../layout/LayoutPublic';
import Home from '../pages/home/Home.jsx';
import Config from '../pages/config/Config.jsx';
import Chapter from '../views/Chapter.jsx';
import Section from '../views/Section.jsx';
import Subsection from  '../views/Subsection.jsx';
import MyDocument from "../pages/document/MyDocument.jsx";
import LayoutDocument from "../layout/LayoutDocument.jsx"


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
        path: "/config",
        element: <Config />,
      },
      {
        path: "/document/:id",
        element: <LayoutDocument />,
        children: [
          {
            index: true,
            element: <MyDocument/>,
          },
          {
            path: "chapter",
            element: <Chapter />,
          },
          {
            path: "section/:id",
            element: <Section />,
          },
          {
            path: "subsection/:id",
            element: <Subsection />,
          },
        ]
      }
    ]
  }
]);

export default router;
