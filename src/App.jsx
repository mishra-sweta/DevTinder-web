import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        { path: "/", element: <Feed /> },
        { path: "/login", element: <Login /> },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/connections",
          element: <Connections />,
        },
        {
          path: "/requests",
          element: <Requests />,
        },
        {
          path: "/chat/:userId",
          element: <Chat />,
        },
      ],
    },
  ]);
  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
