import React, {useState, useMemo, useRef} from "react";
import { Link, useParams } from "react-router-dom";
import countryList from 'react-select-country-list'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState("")

    const {referral} = useParams();
    const [affiliationCode, setAffiliationCode] = useState( referral ? referral : "")
    const emailRef = useRef(null)
    const affiliationCodeRef = useRef(null)

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")

    const [showAlert, setShowAlert] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const passRef = useRef(null)
    const conPassRef = useRef(null)
    
    const changeHandler = (event) => {
        const getCountry = event.target.value
        setValue(getCountry)
    }

    const emailHandleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const affiliationCodeHandleChange = (e) => {
        const { value } = e.target;
        setAffiliationCode(value);
    }

    function PassHandleChange(e) {
        const { value } = e.target;
        setPassword(value);
        setPasswordMismatch(conPassword !== value);
        setShowAlert(conPassword !== value);
    }
    
    function ConPassHandleChange(e) {
        const { value } = e.target;
        setConPassword(value);
        setPasswordMismatch(password !== value);
        setShowAlert(password !== value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonDisabled(true);

        if(value !== ""){
            try{
                const response = await axios.post(process.env.REACT_APP_API_signup, { email, AffiliationCode: affiliationCode, country: value, password});

                if(response.data.status === "Pending"){
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
                    setEmail("")
                    setAffiliationCode("")
                    setValue("")
                    setPassword("")
                    setConPassword("")
                }else if(response.data.status === "ERROR"){
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
            }catch(err){
                toast.error(err.message, {
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
        }else{
            toast.error("please select country", {
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
    }


    return (
        <>
            <div className="authincation"
            style={{
                background: "linear-gradient(#0f054c 50%, #0d0d2b)",
            }}
            >
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-5">
                                <Link to={"./"}>
                                <img
                                    src={require("./../../images/logo.png")}
                                    alt=""
                                    />
                                </Link>
                            </div>
                            <div className="auth-form card">
                                <ToastContainer/>
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">
                                        Sign up your account
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form
                                        method="post"
                                        name="myform"
                                        className="signup_validate"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className={`alert alert-danger ${showAlert ? '' : 'd-none'}`} role="alert">
                                            Passwords do not match.
                                        </div>
                                        <div className="mb-3">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                required
                                                ref={emailRef}
                                                value={email}
                                                onChange={emailHandleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Affiliation code (Optional)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="AffiliationCode"
                                                ref={affiliationCodeRef}
                                                value={affiliationCode}
                                                onChange={affiliationCodeHandleChange}
                                                
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Country</label>
                                            <select name="country" className="form-control" onChange={(e) => changeHandler(e)} value={value}>
                                            <option>--Select--</option>
                                            {
                                                options.map((option) => {
                                                    return (
                                                        <option key={option.value} value={option.label}>{option.label}</option>
                                                    )
                                                })
                                            }
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label>Password</label>
                                            <input
                                                ref={passRef}
                                                value={password}
                                                onChange={PassHandleChange}
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Confirm Password</label>
                                            <input
                                                ref={conPassRef}
                                                value={conPassword}
                                                onChange={ConPassHandleChange}
                                                type="password"
                                                className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
                                                name="password"
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p>By clicking Registration, I confirm that I have read and agree to the 
                                                <span>
                                                    <Link to="/signup" style={{ color: "#ffff" }}>&nbsp;
                                                        Dgccx online Privacy Statement &nbsp;
                                                    </Link>
                                                </span> 
                                              and the
                                             <span>
                                                    <Link to="/signup" style={{ color: "#ffff" }}>
                                                    &nbsp;  Dgccx Web Site Terms and Conditions.
                                                    </Link>
                                                </span> 
                                            </p>
                                        </div>
                                        <div className="text-center">
        
                                        <button onClick={() => setShowAlert(false)} type="submit" className="btn btn-success btn-block close" aria-label="Close" disabled={buttonDisabled}>
                                                <span aria-hidden="true" style={{color:"#fff"}}>Sign up</span>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>
                                            Already have an account?{" "}
                                            <Link
                                                            className=""
                                                            to={"./signin"}
                                                            style={{ color: "#ffff" }}
                                                        >
                                                            Sign in
                                                        </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
