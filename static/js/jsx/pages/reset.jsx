import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TimerComponent({ initialCount, onCountdownEnd }) {
    const [count, setCount] = useState(initialCount);
  
    useEffect(() => {
      if (count === 0) {
        onCountdownEnd();
        return;
      }
  
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000); // Update the interval to 1000 milliseconds
  
      return () => {
        clearInterval(timer);
      };
    }, [count, onCountdownEnd]);
  
    return count;
}

function Reset() {

    const [email, setEmail] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [count, setCount] = useState(60)

    const emailRef = useRef(null)

    const handleCountdownEnd = () => {
        setIsDisabled(false);
      };

    function emailHandleChange(e) {
        const {value} = e.target
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(process.env.REACT_APP_API_requestPasswordReset, { email });
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
                setIsDisabled(true);
                setCount(60); // Reset countdown
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
                setIsDisabled(false);
                setCount(0); // Stop countdown
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
            setIsDisabled(false);
            setCount(0); // Stop countdown
        }

    }

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
                                        <div className="text-center">
                                            <button type="submit" className={`btn btn-success btn-block ${isDisabled ? 'disabled' : null}`}>
                                               {isDisabled ? <TimerComponent initialCount={count} onCountdownEnd={handleCountdownEnd} /> : "Send" }
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

export default Reset;