import { useEffect, useState } from "react";
import classes from "./allUsersComponent.module.css";
export default function allUsersComponent() {
  /*
  showAllUsers:[String]
  static async fetchAllUsers() {
    return await db.execute("SELECT * FROM users");
    //returns all users present in our database..+ passwords also returning
    //don't return password
  }
  */
  const [users, updateUsers] = useState([]);
  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token"); // or however you're storing the JWT

    const graphqlQuery = {
      query: `
      query {
        showAllUsers
      }
    `,
    };

    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add your auth header
        },
        body: JSON.stringify(graphqlQuery),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        alert("Failed to fetch users");
        return;
      }

      console.log("Fetched users:", result.data.showAllUsers);
      updateUsers(result.data.showAllUsers);
      return;
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      {users.length === 0 ? (
        <p>No Users Present Add Some!!</p>
      ) : (
        <div className={classes.outerDiv}>
          {users.map((val) => {
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
