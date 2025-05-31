import classes from "./showFriendsComponent.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function showFriendsComponent() {
  const [friends, updateFriends] = useState([]);
  const params = useParams();
  //showFriends(curr_user_id:String!): [String]
  //only 1 time useEffect will run at first then, jaise hi friends update
  //useSTate h friends, automatically it will render UI component again
  // showFriends(curr_user_id:String!): [String]
  //useEffect se, without any function banaye ek baar function ki tarah kaam karega
  //and without any click event
  async function showfriend() {
    try {
      const query = `
    mutation showFriends($curr_user_id: String!) {
      showFriends(curr_user_id: $curr_user_id)
      }
      `;
      const variables = {
        curr_user_id: params.username,
      };
      const token = localStorage.getItem("token");
      console.log("username is: " + params.username);
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
      const result = await response.json();
      console.log(result.data.showFriends);
      updateFriends(result.data.showFriends || []);
    } catch (err) {
      alert("error in displaying friends");
      throw new Error("error in showing friend");
    }
  }
  useEffect(() => {
    showfriend();
  }, []);
  return (
    <>
      <div className={classes.outerDiv}>
        {!friends || friends.length === 0 ? (
          <div className={classes.divOutsideParagraph}>
            <p className={classes.Paragraph}>No Friends!! Add Friends</p>
          </div>
        ) : (
          friends.map((val) => {
            return (
              <div key={val} className={classes.innerDiv}>
                {val}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
