import classes from "./pendingRequestsComponent.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function SmallComponent({ username, senderUsers, updateSenderUsers }) {
  const params = useParams();
  async function handleAccept(event) {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Or however you store the token
    const recieverUsername = params.username;
    const senderUsername = username;
    const graphqlQuery = {
      query: `
    mutation addToFriends($username: String!, $friendsUsername: String!) {
      addToFriends(username: $username, friendsUsername: $friendsUsername)
    }
  `,
      variables: {
        username: senderUsername,
        friendsUsername: recieverUsername,
      },
    };

    const response = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(graphqlQuery),
    });

    const result = await response.json();

    if (result.data.addToFriends) {
      console.log("Friend added successfully!");
      alert("friends added succefully");
      updateSenderUsers(senderUsers.filter((user) => user !== username));
    } else {
      alert("friends not added succesfully");
      console.log("Failed to add friend.");
    }
  }
  async function handleReject(event) {
    //delte username from pending requests and then again run query of
    //sender users
    event.preventDefault();
    const token = localStorage.getItem("token"); // Or however you store the token
    const recieverUsername = params.username;
    const senderUsername = username;
    const graphqlQuery = {
      query: `
    mutation delelteFromPendingRequests($username: String!, $friendsUsername: String!) {
      delelteFromPendingRequests(username: $username, friendsUsername: $friendsUsername)
    }
  `,
      variables: {
        username: senderUsername,
        friendsUsername: recieverUsername,
      },
    };
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(graphqlQuery),
      });

      const result = await response.json();

      if (result.data.delelteFromPendingRequests) {
        console.log("Friend deleted successfully!");
        alert("pending request removed succefully");
        updateSenderUsers(senderUsers.filter((user) => user !== username));
      } else {
        alert("pending request NOT succesfully");
        console.log("Failed to delte friend.");
      }
    } catch (err) {
      alert("error in delting pending req thrown error");
      throw new Error("error in deleting pending request");
    }
  }
  return (
    <>
      <div key={username} className={classes.smallComponentOuterDiv}>
        <p className={classes.SmallComponentParagraph}>{username}</p>
        <div className={classes.buttonWrapper}>
          <button className={classes.acceptButton} onClick={handleAccept}>
            Accept
          </button>
          <button className={classes.rejectButton} onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>
    </>
  );
}
export default function pendingRequestsComponent() {
  //these are incoming request that someone has send to this user..
  const params = useParams();
  const username = params.username;
  const [senderUsers, updateSenderUsers] = useState([]);
  const fetchIncomingRequests = async (username) => {
    const token = localStorage.getItem("token"); // Replace with actual token retrieval if needed

    const graphqlQuery = {
      query: `
      mutation incomingRequests($username: String!) {
        incomingRequests(username: $username) {
          friends
          message
          success
        }
      }
    `,
      variables: {
        username: username,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(graphqlQuery),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        alert("Error fetching incoming friend requests");
        return [];
      }
      updateSenderUsers(result.data.incomingRequests.friends);
      //return result.data.incomingRequests;
      return;
    } catch (error) {
      console.error("Fetch failed:", error);
      return [];
    }
  };
  //first get all the data in array in useState
  //yeh component load hote hi krna h, check all incoming requests
  useEffect(() => {
    fetchIncomingRequests(username);
  }, []);
  return (
    <>
      {senderUsers.length === 0 ? (
        <div className={classes.divOutsideParagraph}>
          <p className={classes.paragraph}>
            No Friend Request To Accept or Reject!!
          </p>
        </div>
      ) : (
        <div className={classes.outerDiv}>
          {senderUsers.map((val) => {
            return (
              <SmallComponent
                username={val}
                updateSenderUsers={updateSenderUsers}
                senderUsers={senderUsers}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
