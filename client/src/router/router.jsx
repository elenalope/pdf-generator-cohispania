import createBrowserRouter from 'react-router-dom';

const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPublic />,
      children: [
        {
          path: "/pdf",
          element: <PDF />,
        },
        {
          path: "/interface",
          element: <Interface />,
        }
    ]}])

export default router;