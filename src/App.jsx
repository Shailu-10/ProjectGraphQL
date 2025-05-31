import { useParams } from "react-router-dom";
import { useEffect } from "react";
//import Header from "./pages/Header.jsx";
//import headerClasses from "./pages/Header.module.css";
import React, { useState } from "react";
import classes from "./pages/Header.module.css"; // your CSS module
//export default
import { useNavigate } from "react-router-dom";

import Header from "./pages/Header.jsx";
//6 component excluding header
import ShowFriendsComponent from "./pages/showFriendsComponent.jsx";
import SendRequestComponent from "./pages/sendRequestComponent.jsx";
import PendingRequestsComponent from "./pages/pendingRequestsComponent.jsx";
import AllUsers from "./pages/allUsersComponent.jsx";
import MutualFriendsComponent from "./pages/MutualfriendsComponent.jsx";
//import logout from "./pages/logout.jsx";
export default function App() {
  //{activeIndex === 5 && <logout />}
  //for logout no component needed
  const [activeIndex, setActiveIndex] = useState(4);
  const [friends, setFriends] = useState([]);
  const params = useParams();
  const username = params.username;
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If token is missing, redirect to login
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Header
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setFriends={setFriends}
      />
      {activeIndex === 4 || activeIndex === 1 ? (
        <div
          style={{
            height: "2px",
            backgroundColor: "whitesmoke",
            margin: "0px",
            padding: "0px",
          }}
        ></div>
      ) : (
        <></>
      )}
      <div>
        {activeIndex === 0 && <ShowFriendsComponent />}
        {activeIndex === 1 && <SendRequestComponent />}
        {activeIndex === 2 && <PendingRequestsComponent />}
        {activeIndex === 3 && <AllUsers />}
        {activeIndex === 4 && <MutualFriendsComponent />}
      </div>
    </>
  );
}
//        {activeIndex === 0 && <ShowFriendsComponent friends={friends} />}
