import React, {useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import {useState, useRef} from 'react';
import axios from 'axios';
import { useAppContext } from "../../AppContext";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signin() {

    const {auth, setAuth, setToken, setUserId, email, setEmail} = useAppContext();
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const emailRef = useRef(null)
    const passRef = useRef(null)

    useEffect(() => {
        const storedEmail = localStorage.getItem("rememberedEmail");
        if (storedEmail) {
            setEmail(storedEmail);
            setRememberMe(true);
        }
        const storedPassword = localStorage.getItem("rememberedPassword");
        if (storedPassword) {
            setPassword(storedPassword);
        }

        const storedUserId = localStorage.getItem("userId");
        if(storedUserId){
            setUserId(storedUserId)
        }
        const storedauth = localStorage.getItem("isAuthenticated");
        if(storedauth) {
            setAuth(storedauth)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function emailHandleChange(e) {
        const {value} = e.target
        setEmail(value)
      }

      function PassHandleChange(e) {
        const {value} = e.target
        setPassword(value)
      }

      const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };


      const handleSubmit = async (e) => {

        e.preventDefault();
        setButtonDisabled(true);

    
        try {
            setIsLoading(true); // Start loading
          const response = await axios.post(process.env.REACT_APP_API_signin, 
          { email, password });
          if(response.data.status === "SUCCESS"){
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                setAuth(true)
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", token);
                setToken(token);
                localStorage.setItem("userId", decodedToken.userId);

                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                    localStorage.setItem("rememberedPassword", password)
                } else {
                    localStorage.removeItem("rememberedEmail", email);
                    localStorage.removeItem("rememberedPassword", password);
                }
          }else if(response.data.status === "ERROR"){
            setButtonDisabled(false);
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          }
        } catch (error) {
          // Handle error (e.g., display error message)
            setButtonDisabled(false);
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }finally {

            setIsLoading(false); // Stop loading
        }
      };

    return (
        <>
        {!auth ? (
                            <div className="authincation"
                            style={{
                                background: "linear-gradient(#0f054c 50%, #0d0d2b)",
                                height: "100vh",
                            }}
                            >
                            <div className="container">
                                <ToastContainer/>
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-xl-5 col-md-6">
                                        <div className="mini-logo text-center my-5">
                                            <a href="https://dgccx.pro">
                                                <img
                                                    src={require("./../../images/logo.png")}
                                                    alt=""
                                                    
                                                />
                                            </a>
                                        </div>
                                        <div className="auth-form card">
                                            <div className="card-header justify-content-center">
                                                <h4 className="card-title">Sign in</h4>
                                            </div>
                                            <div className="card-body">
                                                <form
                                                    onSubmit={handleSubmit}
                                                    className="signin_validate"
                                                >
                                                    <div className="mb-3">
                                                        <label>Email</label>
                                                        <input
        
                                                            ref={emailRef}
                                                            value={email}
                                                            onChange={emailHandleChange}
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="hello@example.com"
                                                            name="email"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label>Password</label>
                                                        <input
                                                            ref={passRef}
                                                            value={password}
                                                            onChange={PassHandleChange}
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Password"
                                                            name="password"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="row d-flex justify-content-between mt-4 mb-2">
                                                        <div className="mb-3 mb-0">
                                                            <label className="toggle">
                                                                <input
                                                                    className="toggle-checkbox"
                                                                    type="checkbox"
                                                                    checked={rememberMe}
                                                                    onChange={toggleRememberMe}
                                                                />
                                                                <span className="toggle-switch"></span>
                                                                <span className="toggle-label">
                                                                    Remember me
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="mb-3 mb-0">
                                                            <Link to={"./reset"} style={{color: '#ffff'}}>
                                                                Forgot Password?
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-success btn-block" disabled={buttonDisabled}>
                                                            Sign in
                                                        </button>
                                                    </div>
                                                </form>
                                                <div className="new-account mt-3">
                                                    <p>
                                                        Don't have an account?{" "}
                                                        <Link
                                                            className=""
                                                            to={"./signup"}
                                                            style={{ color: "#ffff" }}
                                                        >
                                                            Sign up
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        ):(
            <>
            {isLoading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <Redirect to={{ pathname: "/dashboard" }} />
            )}
        </>
        )}
        </>
    );
}

export default Signin;
