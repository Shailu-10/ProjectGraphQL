import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
export default function Header({ activeIndex, setActiveIndex, setFriends }) {
  const navigate = useNavigate();
  const params = useParams();
  const username = params.username;
  //const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    "showFriends",
    "Send Request",
    "Incoming Requests",
    "All Users",
    "Mutual Friends",
    "LogOut!",
  ];

  async function showFriends() {
    const query = `
    query showAllFriends($username: String!) {
      showAllFriends(username: $username) {
        friends
        message
        success
      }
    }
  `;

    const variables = {
      username: username,
    };
    const token = localStorage.getItem("token");
    if (!token) {
      alert("login again session expired!");
      navigate("/");
    }
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 Pass token in Authorization header
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      const friendsArray = result.data.showAllFriends.friends;
      console.log("friends array is: " + friendsArray);
      //friends Array empty or if users present
      setFriends(friendsArray);
    } catch (err) {
      console.log("error in fetching friends");
    }
  }
  function sendRequest() {
    //shows current pending requests and
    //then option to send request
    //load a jsx component
  }
  function incomingRequests() {}
  function allUsers() {}
  function mySelf() {}
  function logout() {
    console.log("logging out");
    localStorage.removeItem("token");

    navigate("/");
  }
  const actions = [
    showFriends,
    sendRequest,
    incomingRequests,
    allUsers,
    mySelf,
    logout,
  ];

  return (
    <div className={classes.Header}>
      {items.map((label, index) => (
        <button
          key={index}
          className={`${classes.headerButton} ${classes.item} ${
            activeIndex === index ? classes.active : ""
          }`}
          onClick={() => {
            setActiveIndex(index);
            actions[index]();
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
