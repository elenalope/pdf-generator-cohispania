import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from '../layout/LayoutPublic';
import Home from '../pages/home/Home.jsx';
import Config from '../pages/config/Config.jsx';
import Chapter from '../views/Chapter.jsx';
import Section from '../views/Section.jsx';
import Subsection from  '../views/Subsection.jsx';
import MyDocument from "../pages/document/MyDocument.jsx";


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
        path: "/document",
        element: <MyDocument />,
        children: [
          {
            path: "chapter",
            element: <Chapter />,
          },
          {
            path: "section",
            element: <Section />,
          },
          {
            path: "subsection",
            element: <Subsection />,
          },
        ]
      }
    ]
  }
]);

export default router;
