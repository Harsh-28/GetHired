import React from "react"
import signupImg from "../assets/signup.webp"
import Template from "./core/Auth/Templete"

function Signup() {
  return (
    <Template
      title="Join to get your personalized with Get-Hired for free"
      description1="Build skills for today, tomorrow,"
      description2="and beyond."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
