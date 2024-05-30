import React from "react";
import "./App.css"
import { Hero, Login , Signup, Footer, Dashboard, Contact} from "./components";
import { Route, Routes } from "react-router";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from './components/UpdatePassword';
import VerifyEmail from "./components/VerifyEmail";
import Navbar from './components/Navbar'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/Settings';
import StudentPredictionForm from "./components/StudentPredictionForm";
import LayoffPredictionForm from "./components/LayoffPredictionForm"
import Result from "./components/Result";
import PrivateRoute from "./constants/PrivateRoutes";
import Error from "./components/Error";

const App = () => {
  return(
    <div className="min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
    <Navbar/>

  <Routes>

    <Route path="/" element= {<Hero  />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Error />} />

      <Route path="placement-prediction" 
      element={
        <PrivateRoute >
          < StudentPredictionForm/>
        </PrivateRoute>
        
      } />

      <Route path="layoff-prediction" 
      element={
        <PrivateRoute>
          < LayoffPredictionForm/>
        </PrivateRoute>
      } />
      <Route path="result" element={<Result/>} />

    <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
            
          }
        />
      <Route
          path="login"
          element={
            <OpenRoute>
            <Login />
          </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
            
          }
        />
       
        
        <Route
          element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

        </Route>


  </Routes>
  
  <Footer />
  </div>
  )


  };

export default App;
