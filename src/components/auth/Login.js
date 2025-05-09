import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useLoginApi } from "./LoginAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from '../../assets/earnlogo.png'
import backgroundimg from '../../assets/1.png'
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLoginLoading = useSelector((state) => state.user.userLoginLoading);
    const { login } = useLoginApi();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [bgIndex, setBgIndex] = useState(0);

    const isFormValid = email && password


    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            navigate("/home");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire("Error", "Please fill in both email and password.", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
            return;
        }

        const data = {
            email: email,
            password: password,
            user_type: "employer",
        };

        try {
            await login(data);
        } catch (error) {
            Swal.fire("Login Failed", "Please check your credentials and try again.", "error");
        }
    };

    return (
        <div
            className=" flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',        
                width: '100%',
                height: '100vh',
              }}              
        >
            <div className="absolute top-4 left-4 z-10">

                <img src={logo} alt="Logo" className="w-[178px] h-auto" />
            </div>

            <div className="w-full h-screen flex items-center justify-end px-4   ">
                {/* Right side for Login Form */}
                <div className="w-[631px] h-[682px] md:px-10 md:mr-10 bg-white bg-opacity-25 backdrop-blur-[34px] p-5 rounded-2xl shadow-lg flex justify-center flex-col">
                    <h1 className="md:text-[32px] text-xl font-bold text-[#0000FF] text-center mb-4 ">Your Security, Our Priority</h1>
                    <p className="text-[20px] text-center">Log in securely to access your account.</p>

                    <form className="grid grid-cols-1 gap-4 mt-10" onSubmit={handleLogin}>
                        <div>
                            <label className="block font-medium mb-1">Email ID</label>
                            <TextField
                                fullWidth
                                placeholder="Enter Your Email ID"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="email"
                                variant="outlined"
                                sx={{
                                    backgroundColor: '#fff', // Set white background
                                    borderRadius: '4px',     // Optional: match your design
                                }}
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff', // Extra assurance inside the input
                                    },
                                }}
                            />
                        </div>


                        <div>
                            <label className="block font-medium mb-1">Password</label>
                            <TextField
                                fullWidth
                                placeholder="Enter Your Password"
                                size="small"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"

                                sx={{
                                    backgroundColor: '#fff', // Set white background
                                    borderRadius: '4px',     // Optional: match your design
                                }}

                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff', // Extra assurance inside the input
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                             
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth={false}

                                disabled={userLoginLoading || !isFormValid}
                                sx={{
                                    background: '#0000FF',
                                    color: 'white',
                                    px: 12,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontsize:'16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: '#0000FF',
                                    },
                                }}
                            >
                                {userLoginLoading ? 'Logging In...' : 'Log In'}
                            </Button>
                        </div>
                    </form>


                    {/* <div className="text-right mt-2">
                        <button onClick={() => navigate("/forgetpassword")} className="text-[#00B251]  md:text-md">
                            Forgot password?
                        </button>
                    </div> */}

                    <div className="flex items-center justify-center space-x-2 mt-10">
                        <p className=" text-[#838383] text-[14px]">Don’t have an account? </p>
                        <button onClick={() => navigate("/contact")} className="text-[#0000FF] text-[14px] font-semibold">
                            Contact us 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
