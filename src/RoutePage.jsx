//define routes
//import classes from "./Login.module.css";
import React from "react";
/*
const SvgBackground=()=>(
  
)
*/
//import Canvas from "./Canvas.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/*export default function Login() {
  let isLoggedIn = false;
  return (
    <>
      <Canvas />
      {isLoggedIn ? <App /> : <LoginPage />}
    </>
  );
}
*/
import Canvass from "./pages/Canvas.jsx";
import Signup from "./pages/Signup.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Canvass />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/:username",
    element: <App />,
  },
  {
    path: "/signup",
    element: (
      <>
        <Canvass />
        <Signup />
      </>
    ),
  },
]);
/*
  Older version of react 
  const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
  </Route>
  );
  const router = createBrowserRouter(routeDefinitions);
  function App(){
  return <RouterProvider router={router}/>;
  */
function SApp() {
  return <RouterProvider router={router} />;
}
export default SApp;
