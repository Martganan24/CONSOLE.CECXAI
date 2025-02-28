import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import {useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

    const history = useHistory();

    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")

    const [showAlert, setShowAlert] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const passRef = useRef(null)
    const conPassRef = useRef(null)

    const { userId, resetString} = useParams();

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

        try {

            const response = await axios.post(process.env.REACT_APP_API_resetPassword, { newPassword: password, userId, resetString });
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
                            setTimeout(() => {
                history.push('/signin');
            }, 6000);

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
        } catch (error) {
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
        }
    };

    return (
        <>
            <div className="authincation">
                <div className="container h-100">
                <ToastContainer/>
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-5">
                                <Link to={"./"}><img src={require("./../../images/newlogo.png")} style={{ height: "60px" }} alt="" /></Link>
                            </div>
                            <div className="auth-form card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">Reset password</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className={`alert alert-danger ${showAlert ? '' : 'd-none'}`} role="alert">
                                            Passwords do not match.
                                        </div>
                                        <div className="mb-3">
                                        <label>New Password</label>
                                                        <input
                                                            ref={passRef}
                                                            value={password}
                                                            onChange={PassHandleChange}
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="New Password"
                                                            name="password"
                                                            required
                                                        />
                                        </div>
                                        <div className="mb-3">
                                        <label>Confirm New Password</label>
                                                        <input
                                                            ref={conPassRef}
                                                            value={conPassword}
                                                            onChange={ConPassHandleChange}
                                                            type="password"
                                                            className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
                                                            placeholder="Confirm Password"
                                                            name="password"
                                                            required
                                                        />
                                        </div>
                                        <div className="text-center">
                                            <button onClick={() => setShowAlert(false)} type="submit" className="btn btn-success btn-block close" aria-label="Close">
                                                <span aria-hidden="true">reset Password</span>
                                            </button>
                                            <br />
                                            <br />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;