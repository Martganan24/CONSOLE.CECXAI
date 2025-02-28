import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import {
    toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Crisp
} from "crisp-sdk-web";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({
    children
}) => {
    const [countdownText, setCountdownText] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state
    const [results, setResults] = useState([]); // New state
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState()
    const [useId, setUserId] = useState()
    const [balance, setBalance] = useState();
    const [demobalance, setDemoBalance] = useState();
    const [isDemo, setIsDemo] = useState(); // New state
    const [tradeHistory, setTradeHistory] = useState([]); // New state
    const [tradeDemoHistory, setTradeDemoHistory] = useState([]); // New state
    const [buy, setBuy] = useState(0);
    const [sell, setSell] = useState(0);
    const [tie, setTie] = useState(0);
    const [profitWalletBalance, setProfitWalletBalance] = useState(0);
    const [transactions, setTransactions] = useState([])
    const [email, setEmail] = useState('')
    const [currentTradeID, setCurrentTradeId] = useState('');
    const [notifications, setNotifications] = useState([])
    const [withdrawals, setWithdrawals] = useState([])
    const [refferral, setRefferral] = useState('')
    const [level, setLevel] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [invitedList, setInvitedList] = useState([])
    const [pendingOrders, setPendingOrders] = useState([])
    const [percentage, setPercentage] = useState(0)
    const [allUsers, setAllUsers] = useState([])
    const [withdrawalList, setWithdrawalList] = useState([])
    const [popUpLive, setPopUpLive] = useState('');
    const [popUpLiveAmount, setPopUpLiveAmount] = useState('');
    const [popUpDemo, setPopUpDemo] = useState('');
    const [popUpDemoAmount, setPopUpDemoAmount] = useState('');
    const [hideChatBox, setHideChatBox] = useState(false);


    const openChatBoxFunc = () => {

        Crisp.configure(process.env.REACT_APP_API_CRISP_CHAT_ID, {
            lockMaximized: true,
            lockFullview: true,
        });

        Crisp.chat.hide();

        Crisp.setZIndex(1);

        if (email && useId) {
            Crisp.setTokenId(useId);
            Crisp.user.setEmail(email);
            Crisp.user.setNickname(email);
        }
    }

    const userData = () => {
        try {
            fetch(process.env.REACT_APP_API_userData, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                })
                .then(data => {
                    setEmail(data.data.email);
                    localStorage.setItem("tradebitxEmail", data.data.email);
                    setTransactions(data.data.live.transactions)
                    setProfitWalletBalance(data.data.live.wallet.profitWallet)
                    setBalance(data.data.live.wallet.mainWallet);
                    setDemoBalance(data.data.live.wallet.demoWallet);
                    setTradeHistory(data.data.live.tradeHistory);
                    setTradeDemoHistory(data.data.demo.tradeHistory);
                    setUserId(data.data._id);
                    setName(data.data.displayName);
                    setNumber(data.data.phoneNumber);
                    setWithdrawals(data.data.live.withdrawals)
                    setRefferral(data.data.Affiliation.code)
                    setLevel(data.data.Affiliation.affiliateLevel)
                    setPopUpLive(data.data.live.popUp.result)
                    setPopUpLiveAmount(data.data.live.popUp.amount)
                    setPopUpDemo(data.data.demo.popUp.result)
                    setPopUpDemoAmount(data.data.demo.popUp.amount)

                    const havaccess = data.data.access;
                    if (havaccess === false) {
                        setAuth(false)
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("isAuthenticated");
                        localStorage.removeItem("rememberedEmail");
                        localStorage.removeItem("rememberedPassword");
                    }

                    const toastOptions = {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    };

                    if (data.data.demo.popUp.result === 'Win') {
                        toast.success(`congratulation! You won ${data.data.demo.popUp.amount} USD`, toastOptions);
                        updatePopUp();
                    }
                    if (data.data.demo.popUp.result === 'Loss') {
                        toast.error(`Sorry! You lost ${data.data.demo.popUp.amount} USD`, toastOptions);
                        updatePopUp();
                    }
                    if (data.data.live.popUp.result === 'Win') {
                        toast.success(`congratulation! You won ${data.data.live.popUp.amount} USD`, toastOptions);
                        updatePopUp();
                    }
                    if (data.data.live.popUp.result === 'Loss') {
                        toast.error(`Sorry! You lost ${data.data.live.popUp.amount} USD`, toastOptions);
                        updatePopUp();
                    }
                    if (data.data.live.popUp.result === 'Draw') {
                        toast.info(`Its a Draw! You got back ${data.data.live.popUp.amount} USD`, toastOptions);
                        updatePopUp();
                    }
                    if (data.data.demo.popUp.result === 'Draw') {
                        toast.info(`Its a Draw! You got back ${data.data.demo.popUp.amount} USD`, toastOptions);
                        updatePopUp();
                    }

                    notificationsList();
                })
                .catch(error => {
                    toast.error("An error occurred", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                });
        } catch (error) {
            toast.error("An error occurred", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const updatePopUp = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_updatePopUp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'SUCCESS') {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const resultData = () => {
        try {
            fetch(process.env.REACT_APP_API_result, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const result = data.data;
                    setResults(result)
                    const buy = result.filter((item) => item.result === 'green');
                    setBuy(buy.length);
                    const sell = result.filter((item) => item.result === 'red');
                    setSell(sell.length);
                    const tie = result.filter((item) => item.result === 'tie');
                    setTie(tie.length);

                }).catch(error => {
                    toast.error("An error occurred", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                })
        } catch (error) {
            toast.error("An error occurred", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const notificationsList = () => {
        try {
            fetch(process.env.REACT_APP_API_getNotification, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {

                    const result = data.data;
                    setNotifications(result)
                }).catch(error => {
                    toast.error("An error occurred", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                })

        } catch (error) {
            toast.error("An error occurred", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const updateNotification = (id) => {
        try {
            //use axios to update notification
            axios.put(process.env.REACT_APP_API_updateNotification, {
                    message_id: id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        notificationsList();
                    } else {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                }).catch(error => {
                    toast.error("An error occurred", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                })
        } catch (error) {
            toast.error("An error occurred", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const requestWithdrawal = async (amount, network, wallet, address) => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_requestWithdrawal, {
                amount: Number(amount),
                network,
                wallet,
                address
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                userData();
            } else if (response.data.status === 'ERROR') {
                const message = response.data.message;
                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            const message = "An error occurred"; // You can customize this message as needed.
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const depositUser = async (id, amount) => {

        try {
            if (amount === 0) {
                toast.error("Please enter an amount", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            const response = await axios.post(process.env.REACT_APP_API_depositUser, {
                id,
                amount: Number(amount)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

                userData();
                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            const message = "An error occurred"; // You can customize this message as needed.
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    //update user /updateProfile 
    const updateProfile = async (displayName, phoneNumber) => {
        try {
            const response = await axios.put(process.env.REACT_APP_API_updateProfile, {
                displayName,
                phoneNumber
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                userData();
            } else if (response.data.status === 'ERROR') {
                const message = response.data.message;
                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            const message = "An error occurred"; // You can customize this message as needed.
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const changePassword = async (currentPassword, newPassword, confirmPassword) => {
        try {
            const response = await axios.put(process.env.REACT_APP_API_changePassword, {
                currentPassword,
                newPassword,
                confirmPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                userData();
            } else if (response.data.status === 'ERROR') {
                const message = response.data.message;
                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            const message = "An error occurred"; // You can customize this message as needed.
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    const getInvited = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_invitedList, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                setInvitedList(response.data.data);
            }

        } catch (error) {
            const message = "An error occurred";
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    // get users pending orders
    const getPendingOrders = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_pendingTrade, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                setPendingOrders(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    //get the percentage
    const getPercentage = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_getPercentage, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data.status === 'SUCCESS') {
                setPercentage(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }



    const getAllUser = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_allUsers, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                setAllUsers(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserRole = async (id, role) => {
        try {
            const response = await axios.put(process.env.REACT_APP_API_updateRole, {
                id,
                role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateAccessLogin = async (id, access) => {
        try {
            const response = await axios.put(process.env.REACT_APP_API_updateAccessLogin, {
                id,
                access
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const updateAffiliateLevel = async (id, affiliateLevel) => {
        try {
            const response = await axios.put(process.env.REACT_APP_API_updateAffiliateLevel, {
                id,
                affiliateLevel
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateMainWallet = async (id, amount) => {
        try {
            if (amount === 0) {
                toast.error("Please enter an amount", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }
            const response = await axios.put(process.env.REACT_APP_API_updateMainWallet, {
                id,
                amount: Number(amount)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateProfitWallet = async (id, amount) => {
        try {
            if (amount === 0) {
                toast.error("Please enter an amount", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            const response = await axios.put(process.env.REACT_APP_API_updateProfitWallet, {
                id,
                amount: Number(amount)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateCommissionWallet = async (id, amount) => {
        try {
            if (amount === 0) {
                toast.error("Please enter an amount", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            const response = await axios.put(process.env.REACT_APP_API_updateCommissionWallet, {
                id,
                amount: Number(amount)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {

            console.log(process.env.REACT_APP_API_deleteUser + id)

            const response = await axios.delete(process.env.REACT_APP_API_deleteUser + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pendingWithdrawal = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_pendingWithdrawal, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                setWithdrawalList(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateWithdrawalStatus = async (id, status) => {
        try {
            const response = await axios.put(process.env.REACT_APP_API_updateWithdrawalStatus, {
                id,
                status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                getAllUser();
                pendingWithdrawal();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const changeUserPassword = async (id, newPassword) => {
        try {

            const response = await axios.put(process.env.REACT_APP_API_changeUserPassword, {
                id,
                newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const changeUserEmail = async (id, newEmail) => {
        try {

            const response = await axios.put(process.env.REACT_APP_API_changeUserEmail, {
                id,
                newEmail
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                getAllUser();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const changeWinPercentage = async (percentage) => {
        try {

            const response = await axios.put(process.env.REACT_APP_API_changeWinPercentage, {
                percentage
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.status === 'SUCCESS') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                getPercentage();
            } else if (response.data.status === 'ERROR') {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const contextValue = {

        // =====================  Admin =====================


        changeWinPercentage,
        changeUserEmail,
        changeUserPassword,
        getAllUser,
        allUsers,
        setAllUsers,
        getPendingOrders,
        pendingOrders,
        setPendingOrders,
        getPercentage,
        percentage,
        setPercentage,
        updateUserRole,
        updateAccessLogin,
        depositUser,
        updateAffiliateLevel,
        updateMainWallet,
        updateProfitWallet,
        updateCommissionWallet,
        deleteUser,
        pendingWithdrawal,
        withdrawalList,
        setWithdrawalList,
        updateWithdrawalStatus,


        // =====================  User =====================
        openChatBoxFunc,
        updatePopUp,
        popUpDemoAmount,
        popUpLiveAmount,
        popUpDemo,
        popUpLive,
        invitedList,
        setInvitedList,
        getInvited,
        changePassword,
        name,
        setName,
        number,
        setNumber,
        updateProfile,
        level,
        setLevel,
        refferral,
        setRefferral,
        withdrawals,
        setWithdrawals,
        requestWithdrawal,
        updateNotification,
        notificationsList,
        notifications,
        setNotifications,
        currentTradeID,
        setCurrentTradeId,
        resultData,
        userData,
        email,
        setEmail,
        transactions,
        setTransactions,
        profitWalletBalance,
        setProfitWalletBalance,
        tradeDemoHistory,
        setTradeDemoHistory,
        demobalance,
        setDemoBalance,
        balance,
        setBalance,
        tradeHistory,
        setTradeHistory,
        token,
        setToken,
        hideChatBox,
        setHideChatBox,


        buy,
        setBuy,
        sell,
        setSell,
        tie,
        setTie,
        isDemo,
        setIsDemo,
        useId,
        setUserId,
        auth,
        setAuth,
        results,
        setResults,
        countdownText,
        setCountdownText,
        isButtonDisabled,
        setIsButtonDisabled,
    };


    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }

        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId)
        }
        const storedauth = localStorage.getItem("isAuthenticated");
        if (storedauth) {
            setAuth(storedauth)
        }

        const storedIsDemo = localStorage.getItem("isDemo");
        if (storedIsDemo === 'true') {
            setIsDemo(true)
        } else if (storedIsDemo === 'false') {
            setIsDemo(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( <
        AppContext.Provider value = {
            contextValue
        } > {
            children
        } <
        /AppContext.Provider>
    );
};