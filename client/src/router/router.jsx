import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from '../layout/LayoutPublic';
import Home from '../pages/Home';

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
        path: "/pdf",
        element: <Home />, // o el componente correspondiente para la generación de PDF
      }
     // {
     //   path: "/interface",
     //   element: <Interface />, // Asegúrate de importar Interface si lo necesitas
     // }
    ]
  }
]);

export default router;
