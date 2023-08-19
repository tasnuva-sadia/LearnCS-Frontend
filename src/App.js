import LandingPage from "./LandingPage";
import Course from "./courses";
import Signup from "./signup";
import Contact from "./contactUs";
import Login from "./login";
import CourseDetails from './courseDetails';
import Searchbar from "./searchbar";
import SearchResult from "./searchResult";
import ResetPass from "./resetPassword";
import Footer from "./footer";
import Editprofile from "./editprofilePage";
import Profile from "./profile";
import Navbar from "./navbar";
import Instructor from "./instructor";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path="/" element={<LandingPage/>}></Route>

          <Route path="/courses" element={<Course/>}></Route>

          <Route path="/signup" element={<Signup/>}></Route>

          <Route path="/contact" element={<Contact/>}></Route>

          <Route path="/login" element={<Login/>}></Route>

          <Route path="/resetPassword" element={<ResetPass/>}></Route>

          <Route path="/courseDetails/:id" element={<CourseDetails/>}></Route>

          <Route path="/searchbar" element={<Searchbar/>}></Route>

          <Route path="/searchResult/:searchValue" element={<SearchResult/>}></Route>

          <Route path="/footer" element={<Footer/>}></Route>

          <Route path="/editprofilePage/:id" element={<Editprofile/>}></Route>

          <Route path="/profile" element={<Profile/>}></Route>

          <Route path="/navbar" element={<Navbar/>}></Route>

          <Route path="/instructor" element={<Instructor/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
