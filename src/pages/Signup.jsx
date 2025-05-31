import classes from "./Signup.module.css";
/*export default function Signup() {
  return (
    <>
      <p>Signup Page!!</p>
    </>
  );
}
  
*/
import { useNavigate } from "react-router-dom";

import React from "react";
import { useState } from "react";
const SvgArrow = () => {
  return (
    <svg
      className={classes.svgArrow}
      width="49"
      height="37"
      viewBox="0 0 49 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.996 0.556454C32.3285 -0.185485 31.2175 -0.185485 30.5266 0.556454C29.859 1.27333 29.859 2.46644 30.5266 3.18165L43.0481 16.6284H1.72877C0.765576 16.6301 0 17.4523 0 18.4866C0 19.521 0.765576 20.3699 1.72877 20.3699H43.0481L30.5266 33.7916C29.859 34.5336 29.859 35.7283 30.5266 36.4435C31.2175 37.1855 32.33 37.1855 32.996 36.4435L48.4818 19.8134C49.1727 19.0966 49.1727 17.9034 48.4818 17.1882L32.996 0.556454Z"
        fill={classes.arrowPath}
      />
    </svg>
  );
};
export default function Signup() {
  const navigate = useNavigate();
  const [enteredValues, setEnteredValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  async function handleSubmit(event) {
    event.preventDefault();
    //only username at time of signup then later add mail
    //check spelling of submit..
    //1. first check user entering (unique) username or email
    //step 2;username shouldn't contain specialCharacters and . (because email will use it)
    //check shouldn't be malware script SQL query attack shouldn't be
    //step4; then check password and confirm password same or not?
    //if all correct then create account and useNavigator,
    //step5: navigate to user's own unique page with default syling
    //event.preventDefault();
    console.log("page reloading??");
    //password cannot be empty also check
    //regex for mail
    //min length2 max length 10 so that no SQL injection
    console.log(enteredValues);

    /*
      const graphqlQuery = {
        query: `
        query{
          showAllDocument{
          _id
          name
          friends
          }
        }
      `,
      };
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(graphqlQuery),
      });
    */
    enteredValues.username = enteredValues.username.trim();
    enteredValues.password = enteredValues.password.trim();
    enteredValues.confirmPassword = enteredValues.confirmPassword.trim();
    if (enteredValues.password.length === 0) {
      console.log("password cannot be empty");
      alert("password cannot be empty!!");
      return;
    }
    if (enteredValues.password !== enteredValues.confirmPassword) {
      alert("Enter same password and confirm passwords!");
      return;
    }
    if (enteredValues.username.length === 0) {
      console.log("username cannot be empty");
      alert("Username cannot be empty!!");
      return;
    }
    const graphqlQuery = {
      query: `
        mutation createUser($username: String!, $password: String!){
          createUser(
            username: $username,
            password: $password
          ) {
            success
            token
            message
          }
        }
      `,
      variables: {
        username: enteredValues.username,
        password: enteredValues.password,
      },
    };

    try {
      console.log(enteredValues.password);
      console.log(enteredValues.username);
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      /*
{
  "data": {
    "createUser": {
      "success": true,
      "token": "abcd1234",
      "message": "User created successfully"
    }
  }
}

      */
      if (!result.data.createUser.success) {
        alert("Signup Failed!!");
      }
      if (result.data.createUser.success) {
        //true Signup Successfull
        localStorage.setItem("token", result.data.createUser.token);
        navigate(`/${enteredValues.username}`);
        //set login variable as true so to show correct frontend;
        //unique username send ho jayega
      }
    } catch (err) {
      console.log("error in fetching from backend");
      //code crash na ho, whi aa jaye wapis
      return;
    }
  }
  function handleInputChange(identifier, value) {
    //identifier can be username password aisa good for login
    //handle input change is for input element in the login and signup form
    //previous values will be same of the object property will be copied as it is
    //the property which we are setting only that will change
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
  //identifier, event changed to above how??
  //[identifier]:event, changed to value how??
  //onChange gets value through event object..event.target.value
  return (
    <>
      <div className={classes.login}>
        <div className={classes.form}>
          <div className={classes.inputWrapper}>
            <label htmlFor="username" className={classes.Label}>
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className={classes.inputElement}
              onChange={(event) =>
                handleInputChange("username", event.target.value)
              }
              value={enteredValues.username}
              required
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="password" className={classes.Label}>
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className={classes.inputElement}
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
              value={enteredValues.password}
              required
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="confirmPassword" className={classes.Label}>
              CONFIRM PASSWORD
            </label>
            <input
              id="confirmPassword"
              type="password"
              minLength={4}
              className={classes.inputElement}
              onChange={(event) =>
                handleInputChange("confirmPassword", event.target.value)
              }
              value={enteredValues.confirmPassword}
              required
            />
          </div>
          <button className={classes.buttonWrapper} onClick={handleSubmit}>
            <SvgArrow />
            <p className={classes.buttonParagraph}>Create Account</p>
          </button>
          <div className={classes.container}>
            <div className={classes.helloWrapper}>
              <h1 className={classes.headerWrapper}>
                <span>W</span>
                <span>E</span>
                <span>L</span>
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>E</span>
                <span>!</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//use curly braces for assigning class because,
//class is an variable not string, we need to access property value
//so do like {this}
/*
className={classes.svgArrow}
<div className={classes.Login}>
        <div>
          <div className={classes.form}>
            <div>
              <label>Email or UserName: </label>
              <input
                className={classes.inputText}
                placeholder="Input Login Credentials"
                type="email"
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                className={classes.inputText}
                placeholder="Login Password"
                type="password"
              />
            </div>

            <button className={classes.loginButton}>
              <SvgArrow />
              <span className={classes.svgPara}>Log In</span>
            </button>
          </div>

          <div className={classes.createAccount}>
            <p className={classes.paragraphCreateAccount}>
              doesn't have account? <a href="/">Create Account</a>
            </p>
          </div>
        </div>
      </div>
*/
