import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../AppContext' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faBars, faWallet,faHeadset, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DepositTab from "./depositTab";
import { Crisp } from "crisp-sdk-web";

const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => {

    const {notifications} = useAppContext();

    const unread = notifications.reverse().filter((notification) => notification.read === false);

    return (
    <div
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}

    >
        {children}
        <div className="" style={{marginTop: '8px'}}>
            <div className="user" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className='icon'>
                    <FontAwesomeIcon icon={faBell} style={{color: "#fff"}} size='lg' />
                    {
                        unread.length !== 0 ? <div className="counter">{unread.length}</div> : null
                    }
                </div>
            </div>
            <p className='icon-label' style={{fontSize: '12px', marginBottom: '0px'}}>Notification</p>
        </div>
    </div>
    )
});

const MenuToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}

    >
        {children}
        <div className="profile_log" style={{marginRight: '10px'}}>
            <div className="user">
            <FontAwesomeIcon icon={faBars} style={{color: "#ffffff",}} size='lg' />
            </div>
        </div>
    </div>
));

const balanceToggle = React.forwardRef(({ children, onClick }, ref) => {
    const {balance,  isDemo, demobalance} = useAppContext();

    return (
    <div
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}

    >
        {children}
        <div className="" style={{borderRadius: '5px', border: 'none', background: '#2f3342', color: "#fff"}}>
            <div className="user" style={{padding: "10px 15px 10px 15px"}}>
                <label htmlFor="live-balance" className='bal-font' style={{fontSize: '12px'}}>{isDemo ? 'demo' : 'live'}</label> &nbsp;
                <span id='live-balance' className=""><i style={{fontStyle: 'normal',fontWeight: 'bold'}}>$ {isDemo ? Math.round(demobalance * 1000) / 1000 : Math.round(balance * 1000) / 1000}</i></span> &nbsp; &nbsp;
                <span className="arrow"><i className="la la-angle-down"></i></span>
            </div>
        </div>
    </div>
    )
});


function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

function Header2() {

    //get request

    const {setAuth, balance, demobalance, userData, notifications, updateNotification, setHideChatBox, openChatBoxFunc} = useAppContext();
    
    useEffect(() => {
        userData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleLogout = () => {
        setAuth(false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    const handleChange = () => {
        localStorage.setItem("isDemo", false);
        window.location.reload();
    }
    const demoHandleChange = () => {
        localStorage.setItem("isDemo", true);
        window.location.reload();
    }

    const openChatBox = () => {
        openChatBoxFunc();
        Crisp.chat.show();
        Crisp.chat.open();
        setTimeout(() => {
            setHideChatBox(true);
          }, 1000); // Adjust the delay time as needed
    }

    return (
        <>
            <div className="header dashboard" style={{zIndex: '4'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <nav className="navbar justify-content-between">
                            <div style={{display: 'flex'}}>
                            <div className="dashboard_log hide-lg">
                                        <Dropdown className="profile_log">
                                            <Dropdown.Toggle as={MenuToggle} />
                                            <Dropdown.Menu size="sm" title="" className='animate__animated animate__fadeIn'>
                                                <div className="user-email">
                                                    <div className="user">
                                                    <Popup trigger=
                                                        {
                                                        <button className='dropdown-item ntn-depost-inHeader' style={{borderRadius: '5px', border: 'none', padding: "10px 15px 10px 15px", background: "#7ed957", color: "#fff", justifyContent: 'center'}}>
                                                            Deposit
                                                        </button>
                                                        }
                                                        modal nested
                                                        contentStyle={{    background: 'transparent',
                                                        border: 'none',
                                                        minWidth: '400px',
                                                        maxWidth: '100vh', /* Add max-width to prevent excessive width on larger screens */
                                                        justifyContent: 'center',
                                                        }}
                                                        >
                                                        {
                                                            close => (
                                                                <DepositTab onClose={close} />
                                                            )
                                                        }
                                                    </Popup>
                                                        <div className="user-info">
                                                        </div>
                                                    </div>
                                                </div>
                                            <Link to={"./dashboard"} className="dropdown-item">
                                                    <i className="mdi mdi-view-dashboard"></i> Trade
                                            </Link>
                                            <Link to={"./wallet"} className="dropdown-item">
                                                <FontAwesomeIcon id='wallet' icon={faWallet} size="lg" style={{color: "#ffffff"}} />&nbsp;&nbsp; Wallet
                                            </Link>
                                            <Link to={"./affiliate"} className="dropdown-item">
                                                <i id='affilliate' className="mdi mdi-database"></i>Affiliate
                                            </Link>
                                            <div onClick={() => openChatBox() } className="dropdown-item" >
                                                <FontAwesomeIcon id='ChatSupport' icon={faHeadset} size="lg" style={{color: "#ffffff"}}/>&nbsp;&nbsp; Chat Support
                                            </div>
                                            <Link to={"./settings"} className="dropdown-item">
                                                <i id='Settings' className="mdi mdi-settings"></i>Settings
                                            </Link>
                                            <Link to={"./signin"} className="dropdown-item logout" onClick={handleLogout}>
                                                    <FontAwesomeIcon id='Logout' icon={faArrowRightFromBracket} size="lg" style={{color: "red"}}/>&nbsp;&nbsp;Logout
                                            </Link>

                                            </Dropdown.Menu>
                                        </Dropdown>
                            </div>
                            <Link className="" to={"./dashboard"}><img src={require('./../../images/logo-icon.png')} alt=""/></Link>
                            </div>


                                <div className="header-right  d-flex align-items-center">
                                <div className="language">
                                        <Dropdown className="">
                                            <Dropdown.Toggle as={balanceToggle} balance={balance} />
                                            <Dropdown.Menu size="sm" title="" className='animate__animated animate__fadeIn'>
                                            <div className="dropdown-item" onClick={() => handleChange()}>
                                                    <label htmlFor="live-balance" style={{fontSize: '12px'}}>live</label> &nbsp;
                                                    <span id='live-balance' className="" style={{fontWeight: 'bold'}}>$ {Math.round(balance * 1000) / 1000}</span> &nbsp; &nbsp;
                                                </div>
                                                <div className="dropdown-item" onClick={() => demoHandleChange()}>
                                                    <label htmlFor="live-balance" style={{fontSize: '12px'}}>demo</label> &nbsp;
                                                    <span id='live-balance' className="" style={{fontWeight:'bold'}}>$ {Math.round(demobalance * 1000) / 1000}</span>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="language ntn-depost-inHeader">

                                    <Popup trigger=
                                        {
                                            <button className='ntn-depost-inHeader' style={{borderRadius: '5px', border: 'none', padding: "10px 15px 10px 15px", background: "#7ed957", color: "#fff"}}>
                                                Deposit
                                            </button>
                                        }
                                        modal nested
                                        contentStyle={{    background: 'transparent',
                                        border: 'none',
                                        minWidth: '400px',
                                        maxWidth: '100vh', /* Add max-width to prevent excessive width on larger screens */
                                        justifyContent: 'center',
                                        }}
                                        >
                                        {
                                            close => (
                                                <DepositTab onClose={close} />
                                            )
                                        }
                                    </Popup>
                                    </div>
                                    <div className="dashboard_log">
                                        <Dropdown>
                                            <Dropdown.Toggle as={ProfileToggle} />
                                            <Dropdown.Menu size="sm" className='animate__animated animate__fadeIn' title="" style={{height: '70vh', minWidth: '350px'}}>
                                                <PerfectScrollbar>
                                                    <div className="card animate__animated animate__fadeIn">
                                                        <div className="card-header">
                                                            <h5>Notifications</h5>
                                                        </div>
                                                        <div className="card-body">
                                                            {
                                                                notifications.length !== 0 ?
                                                                notifications.reverse().map((notification) => (
                                                                    <div key={notification._id} className="notification" style={{cursor: 'pointer',}} onClick={() => updateNotification(notification._id)}>
                                                                        <div className="notif-title" style={{display: 'flex', justifyContent: 'space-between'}}>
                                                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '10px'}}>
                                                                            <i className="fa fa-bell" style={{fontSize: '15px', color: notification.read ? '#a1a0a7' : '#ffff'}}></i>
                                                                            <h6 style={{margin: '0px', color: notification.read ? '#a1a0a7' : '#ffff' }}>{notification.title}</h6>
                                                                            </div>
                                                                            <div className="dot" style={{height: '10px', width: '10px', borderRadius: '10px', backgroundColor: notification.read ? '' : 'rgb(126, 217, 87)' }}></div>
                                                                        </div>
                                                                        <div className='notif-message' style={{margin: '0px 20px 0px 25px'}}>
                                                                            <p className="notif-text" style={{marginBottom: '0px'}}>{notification.message}</p>
                                                                            <div className="date">
                                                                            <p style={{backgroundColor: 'rgb(47, 51, 66)', width: 'fit-content', padding: '0px 5px 0px 5px', borderRadius: '5px', fontSize: '12px'}}>{formatDate(notification.time)}</p>
                                                                            </div>
                                                                        </div>
                                                                        <hr></hr>
                                                                    </div>
                                                                ))
                                                                :
                                                                <div className="notification text-center">
                                                                    <p>No Notification</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    </PerfectScrollbar>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header2;