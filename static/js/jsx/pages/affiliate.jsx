import React,{useEffect} from 'react';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useAppContext } from "../../AppContext";
import img from '../../images/affff.png'
import vip from '../../images/vip_logo_nobg.png'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Affiliate() {

    const { userData, refferral, level, getInvited, invitedList } = useAppContext();
    
    useEffect(() => {
        userData();
        getInvited();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const notify = () => {
        //toast to contact customer support for upgrade
        toast.error('Please contact customer service to access VIP options.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        })
    }

    const TotalDownlineVolume = invitedList.invite && invitedList.invite.reduce((a, b) => a + b.volume, 0);

    return (
        <>
            <Header2 />
            <Sidebar />
            <ToastContainer />
            <div className="content-body mt-3">
                <div className="container">
                    {
                        level === 'member' ? 
                        <div className="justify-content-center align-items-center">
                        <div className="card animate__animated animate__fadeIn">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 d-flex flex-column justify-content-center">
                                        <h1>Upgrade VIP Member to get more offers and build your businesss</h1>
                                        <p>Share your referral link and earn up to 40% commission from your friends.</p>
                                        <button className="btn btn-primary" onClick={() => notify()} style={{color: '#ffff', fontWeight: 'bold'}}>Upgrade Now</button>
                                            <br />
                                            <br />
                                        <div className="card" style={{background: 'black', width: '100%'}}>
                                            <div className="card-body" style={{background: 'black'}}>
                                                <p style={{marginBottom: '0px'}}>Referral link:</p>
                                                <div style={{background: 'hsla(0,0%,100%,.1)', padding: '5px', borderRadius: '5px'}}>
                                                    <span style={{color:'#ffff'}}> {`https://dgccx.pro/signup/${refferral}`}</span>
                                                </div>
                                                <hr />
                                                <p style={{marginBottom: '0px'}}>Referral code:</p>
                                                <div style={{background: 'hsla(0,0%,100%,.1)', padding: '5px', borderRadius: '5px'}}>
                                                    <span style={{color:'#ffff'}}>{refferral}</span>
                                                </div>
                        
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <img src={img} alt="" className='img-fluid th-hide animate__animated animate__tada animate__delay-4s animate__repeat-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <div className="card animate__animated animate__bounceIn animate__delay-1s">
                                    <div className="card-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                                        <div>
                                            <i className="fa fa-users fa-2x" style={{color: '#fff'}}></i>
                                        </div>
                                        <div className="ml-3">
                                            <h6>1. Invite Friends</h6>
                                            <p>Invite friends to register win binary through the link</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card animate__animated animate__bounceIn animate__delay-2s">
                                <div className="card-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                                        <div>
                                            <i className="fa fa-user-plus fa-2x" style={{color: '#fff'}}></i>
                                        </div>
                                        <div className="ml-3">
                                            <h6>2. Friend sign-up</h6>
                                            <p>Friends accept the invitation complete registration and play</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card animate__animated animate__bounceIn animate__delay-3s">
                                <div className="card-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                                        <div>
                                            <i className="fa fa-dollar fa-2x" style={{color: '#fff'}}></i>                                            
                                        </div>
                                        <div className="ml-3">
                                            <h6>3. Get a corresponding proportion of commission</h6>
                                            <p style={{marginBottom: '25px'}}>Easily get commission</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-md-6 col-sm">
                            <div className="card animate__animated animate__fadeInLeft animate_delay-1s">
                                <div className="card-body">
                                    <div className='d-flex' style={{alignItems: 'center'}}>
                                    <div style={{maxWidth: '210px'}}>
                                        <img src={vip} alt="" className='img-fluid'/>
                                    </div>
                                    <div className=''>
                                    <p style={{margin: '0px'}}>Trading commission</p>
                                    <h6>$0</h6>
                                    <p style={{margin: '0px'}}>Direct commission</p>
                                    <h6>$0</h6>
                                    <p style={{margin: '0px'}}>Total Downline Volume</p>
                                    <h6>${TotalDownlineVolume * 0.4}</h6>
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                            <div className="card animate__animated animate__fadeInRight animate_delay-2s">
                            <div className="card-body">
                                <p style={{marginBottom: '0px'}}>Referral sponsor: <span style={{color:'#ffff'}}> {invitedList.inviterEmail ? invitedList.inviterEmail : 'superadmin@dev'}</span></p>
                                    <hr />                                            <p style={{marginBottom: '0px'}}>Referral link:</p>
                                <div style={{background: 'hsla(0,0%,100%,.1)', padding: '5px', borderRadius: '5px'}}>
                                    <span style={{color:'#ffff'}}> {`https://dgccx.pro/signup/${refferral}`}</span>
                                </div>
                                    <hr />
                                    <p style={{marginBottom: '0px'}}>Referral code:</p>
                                <div style={{background: 'hsla(0,0%,100%,.1)', padding: '5px', borderRadius: '5px'}}>
                                    <span style={{color:'#ffff'}}>{refferral}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                            <div className="col-12">
                                <div className="card animate__animated animate__fadeInLeft animate_delay-3s">
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                <span className="mr-1">Invite List</span>
                                            </h4>
                                            </div>
                                                <div className="card-body">
                                                <div className="transaction-table">
                                                <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Diplay Name</th>
                                                            <th>Email address</th>
                                                            <th>type of member</th>
                                                            <th>Volume</th>
                                                            <th>Downline Volume</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            invitedList && invitedList.invite ?

                                                            invitedList.invite && invitedList.invite.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.displayName}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.role}</td>
                                                                    <td>${item.volume}</td>
                                                                    <td>${item.volume_downline}</td>
                                                                </tr>
                                                            ))
                                                            :
                                                            invitedList.invite && invitedList.invite.length === 0 ?
                                                        <tr>
                                                            <td>No Data</td>
                                                        </tr>
                                                        :
                                                        <tr>
                                                            <td colSpan="6" style={{textAlign: 'center'}}>Loading...</td>
                                                        </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Affiliate;