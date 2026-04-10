import React, { useState } from "react";
import './LoginSignup.css'

import user from '../Assests/person.png'
import email from '../Assests/email.png'
import password from '../Assests/password.png'

const LoginSignup=()=>{
    const [act, setAct] = useState("Sign Up");

  const [name, setName] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

const handleSubmit = async (type) => {

  if (type === "Sign Up") {
    if (name === "" || emailVal === "" || passwordVal === "") {
      alert("Please fill all fields");
      return;
    }
  } else {
    if (emailVal === "") {
      alert("Please enter email");
      return;
    }
  }

  try {
    let endpoint = "";

    if (type === "Sign Up") {
      endpoint = "/auth/register";
    } else {
      endpoint = "/auth/login";
    }

    const url = `https://dipvsion-test.onrender.com${endpoint}`;
    console.log("Calling API:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(
        type === "Sign Up"
          ? { name, email: emailVal, password: passwordVal }
          : { email: emailVal }   // login = only email
      )
    });

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPONSE DATA:", data);

    if (response.ok) {
      alert(`${type} successful`);

      if (type === "Login") {
        alert("OTP sent to your email");
      }

    } else {
      alert("Error: " + (data.message || response.status));
    }

  } catch (error) {
    console.error("FULL ERROR:", error);
    alert("Error: " + error.message);
  }
};

    return(
        <div className="container">

      <div className="header">
        <div className="text">{act}</div>
      </div>

      <div className="inputs">

        {act === "Login" ? null :
          <div className="input">
            <img src={user} alt="" />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        }
        <div className="input">
          <img src={email} alt="" />
          <input
            type="email"
            placeholder="Enter your email"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password} alt="" />
          <input
            type="password"
            placeholder="Enter your password"
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
        </div>

      </div>

      {act === "Sign Up" ? null :
        <div className="forgot-password">
          Forget Password? <span>Click Here</span>
        </div>
      }

      <div className="submits">

        <div
          className={act === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            if (act !== "Sign Up") {
              setAct("Sign Up");   
            } else {
              handleSubmit("Sign Up");  
            }
          }}
        >
          Sign Up
        </div>

        <div
          className={act === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            if (act !== "Login") {
              setAct("Login");   
            } else {
              handleSubmit("Login");
            }
          }}
        >
          Login
        </div>

      </div>

    </div>

    )
}
export default LoginSignup;
