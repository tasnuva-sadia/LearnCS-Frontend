import Profilepic from "./images/profilePhoto.jpg";
import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import { caretForwardCircleOutline, chatbubbles } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Chaticon from "./chatIcon";

const Userurl = "https://kasifzisan.pythonanywhere.com/auth/users/me/";
const baseUrl = `https://kasifzisan.pythonanywhere.com/user/`;
function Profile() {
    //const { id } = useParams();
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profile_picture, setProfilePicture] = useState("");
    const [university, setUniversity] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [location, setLocation] = useState("");
    const [about_me, setAbout] = useState("");
    const [short_description, setDescription] = useState("");
    const [enrollcourse, setEnrollcourse] = useState([]);
    const [showEnrolledCourses, setShowEnrolledCourses] = useState(false);
    const numberOfCourses = enrollcourse.length;
    const [showProfileInfo, setShowProfileInfo] = useState(true);
    const isLoggedIn = !!userid;
    const Access = localStorage.accessToken;

    useEffect(() => {
        axios
            .get(Userurl, {
                headers: {
                    Authorization: `JWT ${Access}`,
                },
            })
            .then((response) => {
                setUserid(response.data.id);
                axios
                    .get(baseUrl + response.data.id, {
                        headers: {
                            Authorization: `JWT ${Access}`,
                        },
                    })
                    .then((response) => {
                        setUsername(response.data.username);
                        setEmail(response.data.email);
                        setProfilePicture(response.data.profile_picture);
                        setUniversity(response.data.university);
                        setFirstname(response.data.first_name);
                        setLastname(response.data.last_name);
                        setLocation(response.data.location);
                        setAbout(response.data.about_me);
                        setDescription(response.data.short_description);
                    })
                    .catch((error) => {
                        if (
                            error.message ===
                            "Request failed with status code 401"
                        ) {
                            navigate("/login");
                        }
                    });

                axios
                    .get(baseUrl + response.data.id + "/enrolledCourses/")
                    .then((response) => {
                        setEnrollcourse(response.data);
                    });
            })
            .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                    navigate("/login");
                }
            });
    }, [Access, navigate]);

    const toggleProfileInfo = () => {
        setShowProfileInfo(true);
        setShowEnrolledCourses(false);
    };

    const toggleEnrolledCourses = () => {
        setShowEnrolledCourses(true);
        setShowProfileInfo(false);
    };

    const userInitials = () => {
        if (username) {
            const initials = username
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")
                .toUpperCase();
            return initials;
        }
        return ""; // Return an empty string if username is not available
    };

    return (
        <body className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="sticky top-0 z-10 w-full h-20 border bg-gray-100 flex justify-end items-center space-x-2 pr-10 lg:pr-40">
                <Link to={`/editprofilePage/${userid}`}>
                    <button className="text-black hover:text-white text-sm font-semibold px-3 py-2 cursor-pointer border rounded-md outline-none bg-gray-100 hover:bg-black">
                        Edit Profile
                    </button>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row lg:space-x-4 pl-20 pr-20 pb-10">
                <div className="w-full lg:w-1/4 flex flex-col space-y-8 border lg:ml-20 p-12 justify-center items-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full">
                        {profile_picture ? (
                            <img
                                src={profile_picture}
                                className="object-cover w-full h-full"
                            ></img>
                        ) : (
                            <div className="w-full h-full rounded-full cursor-pointer bg-gray-300 flex items-center justify-center relative">
                                {/* Display the user's username initials */}

                                <span className="text-gray-700 text-3xl font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    {userInitials()}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2 items-center justify-center">
                        <h1 className="text-lg lg:text-xl flex justify-center font-medium">
                            {first_name} {last_name}
                        </h1>
                        <p className="text-sm font-semibold px-2 py-1 rounded-sm cursor-pointer text-[#05F26C] bg-[#012326]">
                            Student
                        </p>
                        <p className="text-md pt-6 text-gray-500">
                            {university}
                        </p>
                        <p className="text-sm text-gray-500">{location}</p>
                        <p className="text-sm  text-gray-500 italic pt-5 border-b-2 pb-5">
                            {email}
                        </p>
                        <div className="flex flex-row space-x-1 pt-5">
                            <IonIcon
                                icon={caretForwardCircleOutline}
                                className="text-xl text-gray-500"
                            />
                            <p className="pb-3 font-medium text-sm text-gray-500">
                                {numberOfCourses} Course Enrolled
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/4">
                    <button
                        className={`w-1/2 pt-10 pb-5 border-b-2 hover:border-b-4 text-black text-md font-semibold
                    ${
                        showProfileInfo === true
                            ? "border-b-4 text-green-700 border-green-700"
                            : ""
                    }`}
                        onClick={toggleProfileInfo}
                    >
                        Profile
                    </button>

                    <button
                        className={`w-1/2 pt-10 pb-5 border-b-2 hover:border-b-4 text-black text-md font-semibold
                    ${
                        showEnrolledCourses === true
                            ? "border-b-4 text-green-700 border-green-700"
                            : ""
                    }`}
                        onClick={toggleEnrolledCourses}
                    >
                        Enrolled Courses
                    </button>
                    {showProfileInfo && (
                        <div>
                            <h2 className="text-2xl font-semibold pt-10 pl-5">
                                About Me:
                            </h2>
                            <p className="p-5">{about_me}</p>
                            <h2 className="text-2xl font-semibold pt-10 pl-5">
                                Short Description:
                            </h2>
                            <p className="p-5 text-justify">
                                {short_description}
                            </p>
                        </div>
                    )}

                    {showEnrolledCourses && (
                        <div className="ml-10 grid grid-cols-1 lg:grid-cols-3">
                            {/* <ul> */}
                            {enrollcourse.map((course) => (
                                // <li key={course.id}>
                                <Link
                                    to={`/courseDetails/${course.id}#courseDetailsStart`}
                                    className="card-link"
                                >
                                    <div className="card mt-10 hover:scale-105 transform transition-transform duration-300">
                                        <div className="image-container h-40">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={course.cover_photo}
                                                alt={course.title}
                                            />
                                        </div>

                                        <div className="p-5 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="badge">
                                                    72 students
                                                </span>
                                                <span className="badge">
                                                    1hr 13min
                                                </span>
                                            </div>

                                            <h2 className="course-title">
                                                <span>{course.title}</span>
                                            </h2>
                                        </div>
                                    </div>
                                </Link>
                                // </li>
                            ))}
                            {/* </ul> */}
                        </div>
                    )}
                </div>
            </div>
            {isLoggedIn && <Chaticon />}
            <Footer />
        </body>
    );
}
export default Profile;
