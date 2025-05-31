import React from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
export default function LoginPage() {
  const navigate = useNavigate();
  const [enteredValues, setEnteredValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
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
  //adding somethingn in frontedn
  //adding Login page;
  const newFrontend = 5;

  async function handleSubmit(event) {
    event.preventDefault();

    //removing previous
    console.log(enteredValues);
    enteredValues.username = enteredValues.username.trim();
    enteredValues.password = enteredValues.password.trim();
    //enteredValues.confirmPassword = enteredValues.confirmPassword.trim();

    if (enteredValues.username.length === 0) {
      console.log("username cannot be empty");
      alert("Username cannot be empty!!");
      return;
    }
    if (enteredValues.password.length === 0) {
      console.log("password cannot be empty");
      alert("password cannot be empty!!");
      return;
    }
    const graphqlQuery = {
      query: `
        mutation loginUser($username: String!, $password: String!){
          loginUser(
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
        alert("login failed");
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
      if (!result.data.loginUser.success) {
        alert("Signup Failed!!");
      }
      if (result.data.loginUser.success) {
        //true Signup Successfull
        localStorage.setItem("token", result.data.loginUser.token);
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
  return (
    <>
      <div className={classes.login}>
        <div className={classes.form}>
          <div className={classes.inputWrapper}>
            <label htmlFor="username" className={classes.Label}>
              USERNAME OR EMAIL{" "}
            </label>
            <input
              type="text"
              id="username"
              onChange={(event) =>
                handleInputChange("username", event.target.value)
              }
              className={classes.inputElement}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="password" className={classes.Label}>
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
              className={classes.inputElement}
            />
          </div>
          <button className={classes.buttonWrapper} onClick={handleSubmit}>
            <SvgArrow />
            <p className={classes.buttonParagraph}>Log in</p>
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

          <div className={classes.createAccount}>
            <p className={classes.createAccountParagraph}>
              doesn't have account? <Link to="/signup">Create Account</Link>
            </p>
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
