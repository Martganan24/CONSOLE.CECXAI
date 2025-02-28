import React,{useEffect, useRef, useState} from 'react';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useAppContext } from "../../AppContext";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Settings() {
    const { userData, email, updateProfile, name, number, changePassword } = useAppContext();
    const [displayName, setDisplayname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const [curr, setCurr] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');


    useEffect(() => {
        userData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const nameReff = useRef(null);
    const numberReff = useRef(null);

    const displaynameHandler = (e) => {
        setDisplayname(e.target.value);
    }
    const phoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value);
    }

    const update = (displayName, phoneNumber) => (e) => {
        e.preventDefault();
        updateProfile(displayName, phoneNumber);
    }

    const currReff = useRef(null);
    const newReff = useRef(null);
    const confirmReff = useRef(null);

    const currHandler = (e) => {
        setCurr(e.target.value);
    }
    const newHandler = (e) => {
        setNewPass(e.target.value);
    }
    const confirmHandler = (e) => {
        setConfirm(e.target.value);
    }
    
    const changePass = (e) => {
        e.preventDefault();        
        changePassword(curr, newPass, confirm);
    }

    return (
        <>
            <Header2 />
            <Sidebar />
            <ToastContainer />

            <div className="content-body">
            <div className="container">
                <div className="mt-3">
                            <div className="">
                                <div className="card animate__animated animate__fadeInLeft">
                                    <div className="card-header">
                                        <h4 className="card-title">Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={update(displayName, phoneNumber)} >
                                            <div className="row">
                                                <div className="mb-3 col-xl-12">
                                                    <label className="form-label">Display Name</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control"
                                                    value={displayName}
                                                    placeholder={name}
                                                    onChange={displaynameHandler}
                                                    ref={nameReff}
                                                    required
                                                    />
                                                </div>
                                                <div className="mb-3 col-xl-12">
                                                    <label className="form-label">Email</label>
                                                    <input type="text" className="form-control" value={email} placeholder={email} readOnly/>
                                                </div>
                                                <div className="mb-3 col-xl-12">
                                                    <label className="form-label">Phone Number</label>
                                                    <input 
                                                    type="number" 
                                                    className="form-control"
                                                    value={phoneNumber}
                                                    placeholder={number}
                                                    onChange={phoneNumberHandler}
                                                    ref={numberReff}
                                                    required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-success waves-effect px-4">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="card animate__animated animate__fadeInRight">
                                    <div className="card-header">
                                        <h4 className="card-title">Change Password</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={changePass}>
                                            <div className="row">
                                                <div className="mb-3 col-xl-12">
                                                    <label className="form-label">Current Password</label>
                                                    <input type="password" className="form-control"
                                                    value={curr}
                                                    onChange={currHandler}
                                                    ref={currReff}
                                                    required
                                                    />
                                                </div>
                                                <div className="mb-3 col-xl-12">
                                                    <label className="form-label">New Password</label>
                                                    <input type="password" className="form-control"
                                                    value={newPass}
                                                    onChange={newHandler}
                                                    ref={newReff}
                                                    required
                                                    />
                                                </div>
                                                <div className="mb-3 col-xl-12">
                                                    <label className="form-label">Confirm New Password</label>
                                                    <input type="password" className="form-control"
                                                    value={confirm}
                                                    onChange={confirmHandler}
                                                    ref={confirmReff}
                                                    required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-success waves-effect px-4">Save</button>
                                                </div>
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

export default Settings;