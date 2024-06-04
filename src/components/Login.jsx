import loginImg from "../assets/login.webp"
import Template from "./core/Auth/Templete"
import React from "react"

function Login() {
  return (
    
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow,"
      description2="and beyond."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login
