import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function Verify() {

    const {userId, uniqueString} = useParams();
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch(`https://backend.dgccx.pro/user/verify/${userId}/${uniqueString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log(res);
            setStatus(res.status);
            setMessage(res.message);
        })
        .catch(err => {
            console.log(err);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <> 
        
        <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="auth-form card">
                                <div className="card-body">
                                    <form className="identity-upload">
                                        <div className="identity-content">
                                            <span className="icon" style={{backgroundColor: status === 'SUCCESS' ? 'green' : 'red'}}>
                                                {
                                                    status === 'SUCCESS' ? <i className="fa fa-check" style={{color:'white'}}></i> : <FontAwesomeIcon icon={faXmark} color='white'/>
                                                }
                                            </span>
                                            <h4>
                                                {
                                                    status === 'SUCCESS' ? 'Identity Verified' : 'Identity Not Verified'
                                                }
                                            </h4>
                                            <p>
                                                {
                                                    status === 'SUCCESS' ? 'Congrats! your identity has been successfully verified and you can now login in using your account.' : message
                                                }
                                            </p>
                                        </div>

                                        {/* <div className="text-center mb-4">
                                            <Link
                                                to={"./add-debit-card"}
                                                className="btn btn-success ps-5 pe-5"
                                            >
                                                Continue
                                            </Link>
                                        </div> */}
                                        <button
                                        className='btn btn-success ps-5 pe-5'
                                        >
                                            {
                                                status === 'SUCCESS' ? (
                                                    <a href="https://console.dgccx.pro/signin" style={{color: "white"}}>Continue</a>
                                                ) : (
                                                    <a href="https://console.dgccx.pro/signup" style={{color: "white"}}>Try Again</a>
                                                )
                                            }

                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Verify;
