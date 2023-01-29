import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/ProfilePage/ProfilePage";
import NavBar from "scenes/NavBar/NavBar";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/profile/:userId" component={ProfilePage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//Write Routes for HomePage,LoginPage,ProfilePage using BrowserRouter,Routes and Route
