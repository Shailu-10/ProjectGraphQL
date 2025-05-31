import classes from "./MutualfriendsComponent.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function mutualFriends() {
  const [username, setUsername] = useState("");
  const [firstUsername, setFirstUsername] = useState("");
  const [mutualFriends, updateMutualFriends] = useState([]);
  // const params = useParams();
  //const friendsUsername=username;//username updates on typing
  async function handleClick() {
    if (username === firstUsername) {
      alert("Enter Different User names...");
      return;
    }
    if (username.length === 0 || firstUsername.length === 0) {
      alert("Enter valid username! cannot be empty!!");
      return;
    }
    const query = `
  mutation mutualFriends($currUserId: String!, $friendUserId: String!) {
    mutualFriends(curr_user_id: $currUserId, friend_user_id: $friendUserId) {
      friends
      message
      success
    }
  }
`;

    const variables = {
      currUserId: firstUsername,
      friendUserId: username,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // your JWT or auth token here
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        console.error(result.errors);
        alert("Failed to fetch mutual friends. Please try again.");
        //result.errors is array of object we can acces each error message like result.errors[0].message
        return;
      }
      //working before updating
      if (result.data.mutualFriends.success) {
        console.log(result.data.mutualFriends.friends);
        updateMutualFriends(result.data.mutualFriends.friends);
        return;
      } else {
        alert(
          "unsuccessfull in finding mutual frineds! MayBe invalid Usernames!"
        );
        return;
      }
    } catch (err) {
      alert("errorn, can't fetch mutual friends!!");
      throw new Error("error");
    }
  }
  return (
    <>
      <div className={classes.inputContainer}>
        <input
          className={classes.inputClass}
          id="firstUsername"
          type="text"
          placeholder="Enter First Username"
          value={firstUsername}
          onChange={(event) => setFirstUsername(event.target.value)}
        />
        <input
          className={classes.inputClass}
          id="friendUsername"
          type="text"
          placeholder="Enter Second Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className={classes.buttonClass} onClick={handleClick}>
          Fetch Mutual Friends
        </button>
      </div>
      {mutualFriends.length === 0 ? (
        <div className={classes.mutualFriends}>
          <p className={classes.para}>
            No Mutual Friends!! Send Requests and Make Some!!
          </p>
        </div>
      ) : (
        <div className={classes.outerDiv}>
          {mutualFriends.map((val) => {
            return (
              <div className={classes.innerDiv} key={val}>
                {val}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
