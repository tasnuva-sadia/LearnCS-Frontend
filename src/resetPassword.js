import { useState } from "react";
import Background from "./images/background.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Url = "http://127.0.0.1:8000/auth/users/reset_password/";
function ResetPass() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const resetdata = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(Url,{email,});
            navigate("");
        } catch(error) {
            if (error.response.data.email !== undefined) {
                alert(error.response.data.email);
            }
        }
    };
    return (
        <body>
            <section className="bg-[#5E6055] min-h-screen flex items-center justify-center">
                {/*--login container*/}
                <div className="bg-[#1E2124] flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    {/*form */}
                    <div className="md:w-1/2 px-16">
                        <h2 className="font-bold text-[#f3f7fa] text-2xl">
                            Reset Password
                        </h2>
                        <p className="text-[#f3f7fa] text-sm mt-4">
                            Enter your email for Reset Password
                        </p>

                        <form className="flex flex-col gap-4">
                            <input
                                className="p-2 mt-8 rounded-xl border outline-none focus:border-2 focus:border-[#5E6055] bg-[#f3f7fa]"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            
                            <button
                                className="bg-[#9D9477] rounded-xl text-[#1E2124] font-semibold py-2 hover:scale-105 duration-300"
                                onClick={resetdata}
                            >
                                Send
                            </button>
                        </form>
                        {/* <div className="mt-10 grid grid-cols-3 items-center text-gray-300">
                            <hr className="border-gray-400"></hr>
                            <p className="text-center text-sm cursor-pointer">
                                OR
                            </p>
                            <hr className="border-gray-400"></hr>
                        </div>

                        <p className="mt-5 text-[#f3f7fa] text-xs underline cursor-pointer border-b border-gray-400 py-4">
                            Forgot your password?
                        </p>
                        <div className="mt-3 text-xs flex justify-between items-center">
                            <p className="text-[#f3f7fa] cursor-pointer">
                                Don't Have An Account?
                            </p>
                            <Link
                                className="text-[#c7bfa7] hover:underline font-semibold hover:scale-105 duration-200"
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </div> */}
                    </div>
                    {/*image */}
                    <div className="md:block hidden w-1/2">
                        <img src={Background} className=" rounded-2xl"></img>
                    </div>
                </div>
            </section>
        </body>
    );
}

export default ResetPass;