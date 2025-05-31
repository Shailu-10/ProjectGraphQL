import classes from "./sendRequestComponent.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function SendRequestComponent() {
  const [username, setUsername] = useState("");
  const [pendingRequests, updatePendingRequests] = useState([]);
  const params = useParams();

  const fetchData = async () => {
    console.log(params.username);
    const graphqlQuery = {
      query: `
        mutation allPendingRequestSendByUser($username: String!){
          allPendingRequestSendByUser(username: $username) {
            friends
            message
            success
            }
        }
      `,
      variables: {
        username: params.username,
      },
    };
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(graphqlQuery),
    });
    const result = await response.json();
    if (result.data) {
      console.log("updating pendingrequests arrays");
      const friendsArray = result.data.allPendingRequestSendByUser.friends;
      updatePendingRequests(friendsArray);
      console.log(friendsArray);
    }
  };
  async function handleWithdrawRequest(val) {
    //val is the username to withdraw from params
    const sender = params.username;
    const reciever = val; //val is the reciever, we are the sender so we have to delete request of sender to reciever
    //from pending request delte
    const graphqlQuery = {
      query: `
      mutation handleWithdrawRequest($sender:String!, $reciever:String!){
        handleWithdrawRequest(sender:$sender,reciever:$reciever)
      }`,
      variables: {
        sender: sender,
        reciever: reciever,
      },
    };
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(graphqlQuery),
    });
    const result = await response.json();
    if (result.data.handleWithdrawRequest) {
      //so update the UI again..
      //means, message come
      //console.log
      fetchData();
    } else {
      alert("failed somewhere at withdraw Request!!");
    }
  }
  useEffect(() => {
    //setUsername(params.username);

    fetchData();
  }, []);
  async function handleClick(event) {
    event.preventDefault();
    //const username = document.getElementById("friendUsername");
    const friendsUsername = username.trim();
    if (friendsUsername.length === 0) {
      alert("Enter atleast 1 length long friend Username!");
      return;
    }
    const name = params.username;
    //if success false so, can be already user, friend not found, request already sent
    //if string ===success then ok otherwise not ok
    //mutation query
    const graphqlQuery = {
      query: `
        mutation addFriend($curr_user_id: String!, $friend_user_id: String!){
          addFriend(
            curr_user_id: $curr_user_id,
            friend_user_id: $friend_user_id
          ) 
        }
      `,
      variables: {
        curr_user_id: name,
        friend_user_id: friendsUsername,
      },
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(graphqlQuery),
      });

      const result = await response.json();
      console.log("request came back!!");
      if (result.errors) {
        //it checking result having errors object or not that't it
        console.error(result.errors);
        alert("Signup failed");
        return;
      }
      if (result.data.addFriend === "success") {
        alert("Request send succesfully");
        //again call niche all pending req show function
        console.log("pendingRequests arraya:");
        console.log(pendingRequests);
        fetchData();
      } else {
        alert("Invalid friend ID or already Request send or already Friend");
        return;
      }
    } catch (err) {
      console.log("error is sending request to add friend");
      console.log("eror in chrome inspect console.");
    }
  }
  return (
    <>
      <div className={classes.inputContainer}>
        <input
          className={classes.inputClass}
          id="friendUsername"
          type="text"
          placeholder="Enter Friends Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className={classes.buttonClass} onClick={handleClick}>
          Send Friend Request
        </button>
      </div>
      {pendingRequests.length === 0 ? (
        <div className={classes.noPendingRequests}>
          <p className={classes.para}>No pending Requests!!</p>
        </div>
      ) : (
        <div className={classes.outerDiv}>
          {pendingRequests.map((val) => {
            return (
              <>
                <div className={classes.middleDiv}>
                  <div className={classes.innerDiv} key={val}>
                    {val}
                  </div>
                  <button
                    className={classes.innerDivButton}
                    onClick={() => {
                      handleWithdrawRequest(val);
                    }}
                  >
                    Withdraw Send Request
                  </button>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
//we can use component also with buttons to provide extra functionality's
/*
{pendingRequests.length === 0 ? (
        <div className={classes.noPendingRequests}>
          {pendingRequests.length === 0 && (
            <p className={classes.para}>No pending Requests!!</p>
          )}
        </div>
      ) : (
        <div className={classes.outerDiv}>
          {pendingRequests.length !== 0 &&
            pendingRequests.forEach((val) => {
              <div className={classes.innerDiv} key={val}>
                {val}
              </div>;
            })}
        </div>
      )}

      */
