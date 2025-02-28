import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faHeadset, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../../AppContext' ;
import { Crisp } from "crisp-sdk-web";

function Sidebar() {

    const {setAuth, setHideChatBox, openChatBoxFunc} = useAppContext();
    

    const handleLogout = () => {
        setAuth(false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

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
            <div className="sidebar" style={{zIndex: '3'}}>
                <div className="menu">
                    <ul>
                        <li>
                            <Link to={"./dashboard"}>
                                    <span><i id='trade' className="mdi mdi-view-dashboard"></i></span>
                                    <label htmlFor="trade" style={{color: '#a1a0a7', fontSize: '12px'}}>Trade</label>
                            </Link>
                        </li>
                        <li>
                            <Link to={"./wallet"}>
                                <FontAwesomeIcon id='wallet' icon={faWallet} size="lg" style={{color: "#ffffff"}} />
                                <label htmlFor="wallet" style={{color: '#a1a0a7', fontSize: '12px'}}>Wallet</label>
                            </Link>
                        </li>
                        <li>
                            <Link to={"./affiliate"}>
                                    <span><i id='affilliate' className="mdi mdi-database"></i></span>
                                    <label htmlFor="affilliate" style={{color: '#a1a0a7', fontSize: '12px'}}>Affiliate</label>
                            </Link>
                        </li>
                        <li >
                            <div onClick={() => openChatBox() } style={{display: 'flex', flexDirection: "column", gap: "10px", cursor: "pointer"}}>

                            {/* <Link to={"./chat-support"}> */}
                            <FontAwesomeIcon id='ChatSupport' icon={faHeadset} size="lg" style={{color: "#ffffff"}}/>
                                    <label htmlFor=">ChatSupport" style={{color: '#a1a0a7', fontSize: '12px'}}>Chat</label>
                            {/* </Link> */}
                            </div>
                        </li>
                        <li>
                            <Link to={"./settings"}>
                                    <span><i id='Settings' className="mdi mdi-settings"></i></span>
                                    <label htmlFor="Settings" style={{color: '#a1a0a7', fontSize: '12px'}}>Settings</label>
                            </Link>
                        </li>
                        <li>
                        <Link to={"./signin"} onClick={handleLogout}>
                            <FontAwesomeIcon id='Logout' icon={faArrowRightFromBracket} size="lg" style={{color: "red"}}/>
                            <label htmlFor="Logout" style={{color: '#a1a0a7', fontSize: '12px'}}>Logout</label>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;