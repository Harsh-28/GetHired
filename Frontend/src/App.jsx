import styles from "./style";
import { Hero, Navbar, Login , Signup, Footer, Dashboard} from "./components";
import { Route, Routes } from "react-router";
import { useState } from "react"; 
import PrivateRoute from './constants/PrivateRoutes'
import ChatBot from './chatbot/main';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return(
    <div className="bg-[#00040f] overflow-hidden">
  <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

  <Routes>

    <Route path="/" element= {<Hero  />} />
    <Route path="/login" element = {<Login   setIsLoggedIn={setIsLoggedIn}/>} />
    <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn}/>} />
    <Route path="/dashboard" element = {
      <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
      </PrivateRoute>
   
    } />
    <Route path="/placement-prediction" element = {
      <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
      </PrivateRoute>
   
    } />
    <Route path="/layoff-prediction" element = {
      <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
      </PrivateRoute>
   
    } />

    <Route path="/job-search" element = {
      <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
      </PrivateRoute>
   
    } />

  </Routes>
  
  <Footer />
  {/* <ChatBot /> */}
  </div>
  )


  };

export default App;
