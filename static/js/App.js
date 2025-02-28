import React from 'react';
import './css/style.css';
import Index from './jsx';
import {
    Crisp
} from "crisp-sdk-web";
// import SuppotEngine from './SupportEngine'
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import {
    useAppContext
} from './AppContext';

function App() {

    const {
        hideChatBox,
        setHideChatBox
    } = useAppContext();

    const hideChat = () => {
        Crisp.chat.hide();
        setHideChatBox(false);
    }


    return ( <
        div className = "App" > {
            hideChatBox ?
            <
            div className = "chatboxExit"
            onClick = {
                () => hideChat()
            } >
            <
            FontAwesomeIcon className = 'exitIcon'
            size = "lg"
            icon = {
                faXmark
            }
            /> <
            /div> :
                null
        } <
        Index / > { /* <SuppotEngine /> */ } <
        /div>
    );
}

export default App;