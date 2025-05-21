import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import logo from '../../assets/earnlogo.png';
import backgroundimg from '../../assets/1.png';
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useSnackbar } from 'notistack';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const auth = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const isFormValid = email && password;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    useEffect(() => {
        if (auth?.accessToken) {
            navigate("/home");
        }
    }, [auth?.accessToken, navigate]);

    useEffect(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }, []);


    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            enqueueSnackbar("Please fill in both email and password.", {
                variant: "error",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
            return;
        }
    
        if (!emailRegex.test(email)) {
            enqueueSnackbar("Please enter a valid email address.", {
                variant: "error",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("https://api.earnplus.net/api/v1/employer/auth/loginEmployer", {
                email,
                password
            });
    
            const { user, accessToken, refreshToken, message } = response?.data?.data;
    
            dispatch(setCredentials({ user, accessToken, refreshToken }));
    
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
    
            enqueueSnackbar(message || "Login successful!", {
                variant: "success",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
    
            navigate("/home");
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Login failed!";
            enqueueSnackbar(errMsg, {
                variant: "error",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '100vh' }}>
            <div className="absolute top-4 left-4 z-10">
                <img src={logo} alt="Logo" className="w-[178px] h-auto" />
            </div>
            <div className="w-full h-screen flex items-center justify-end px-4">
                <div className="w-[631px] h-[682px] md:px-10 md:mr-10 bg-white bg-opacity-25 backdrop-blur-[34px] p-5 rounded-2xl shadow-lg flex justify-center flex-col">
                    <h1 className="md:text-[32px] text-xl font-bold text-[#0000FF] text-center mb-4">Your Security, Our Priority</h1>
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
                                type="email"
                                variant="outlined"
                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                InputProps={{ style: { backgroundColor: '#fff' } }}
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
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                InputProps={{
                                    style: { backgroundColor: '#fff' },
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
                                disabled={loading || !isFormValid}
                                sx={{
                                    background: '#0000FF',
                                    color: 'white',
                                    px: 12,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': { background: '#0000FF' }
                                }}
                            >
                                {loading ? 'Logging In...' : 'Log In'}
                            </Button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        <p className="text-[#838383] text-[14px]">Don’t have an account?</p>
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
