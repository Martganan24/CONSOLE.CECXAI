import React, {useEffect} from "react";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../../AppContext' ;
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DepositTab from "../layout/depositTab";
import WithdrawTab from "../layout/withdrawTab";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import 'animate.css'

function AccountOverview() {

    const {balance, demobalance, profitWalletBalance, transactions, token, userData, withdrawals} = useAppContext();

    const [isTransaction, setIsTransaction] = React.useState(true);

    useEffect(() => {
        userData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const reverseTransactions = [...transactions].reverse()
    const reverseWithdrawals = [...withdrawals].reverse()

    function formatDate(date) {
        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        };
        return new Date(date).toLocaleString('en-US', options).replace(',', '');
      }
      
      // Example usage:
      const formattedDate = formatDate(new Date());
      console.log(formattedDate);
      
      
    const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD'

    }).format(value);




    const addDemoBalance = async () => {

        const data = {
            amount: 10000
        }
        try {

            
            //if balance is less than 100, do not allow refill
            if(demobalance > 100){
                toast.error('Demo balance must be less than 100', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });

            }else{

                const response= await axios.post(process.env.REACT_APP_API_refillDemoWallet, data, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                });
    
    
                if(response.data.status === 'SUCCESS'){
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                    userData();
                }else if(response.data.status === 'ERROR'){
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                }
            }
        }catch(error){
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
    }


    const Exchange = () => {
        //insufficient balance
        toast.error('Insufficient balance', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
    }

    return (
        <>
            <Header2 />
            <Sidebar />
            <div className="content-body">
            <ToastContainer/>
                <div className="container">
                    <div className="row">
                        <div>
                            <br />
                            <h3 className="animate__animated animate__fadeIn">total balance (USD): {Math.round((balance + profitWalletBalance) * 1000) / 1000 }</h3>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 animate__animated animate__fadeInLeft ">
                            <div className="card acc_balance">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-3">
                                        <div>
                                            <h4>Main Wallet</h4>
                                        </div>
                                        <div style={{textAlign: 'end'}}>
                                            <h4>{numberFormat(Math.round(balance) * 1000 / 1000)}</h4>
                                            <p className="mb-1">~{numberFormat(balance)} USD</p>
                                        </div>
                                    </div>
                                        <hr />
                                        <div className="btn-group mb-3">
                                        <Popup trigger=
                                        {
                                            <Button variant="" style={{marginRight: '5px'}}>
                                            <FontAwesomeIcon icon={faArrowUp} style={{color: "#7cf000", paddingRight: '10px'}} />
                                                Deposit
                                            </Button>
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
                                    <Popup trigger=

                                        {

                                        <Button variant="" style={{marginRight: '5px'}}>
                                            <FontAwesomeIcon icon={faArrowDown} style={{color: "red", paddingRight: '10px'}}/>
                                            Withdraw
                                        </Button>
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
                                                <WithdrawTab onClose={close} wallet={"MAIN"} />
                                            )
                                        }
                                    </Popup>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 animate__animated animate__fadeInRight">
                            <div className="card acc_balance">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-3">
                                        <div>
                                            <h4>Demo Wallet</h4>
                                        </div>
                                        <div style={{textAlign: 'end'}}>
                                            <h4>{numberFormat(Math.round(demobalance * 1000) / 1000)}</h4>
                                            <p className="mb-1">~{numberFormat(demobalance)} USD</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="btn-group mb-3">
                                    <Button variant="" style={{marginRight: '5px'}} onClick={() => addDemoBalance()}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{color: "#7cf000", paddingRight: '10px'}} />
                                            Deposit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 animate__animated animate__fadeInLeft">
                            <div className="card acc_balance">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-3">
                                        <div>
                                            <h4>Profit Wallet</h4>
                                        </div>
                                        <div style={{textAlign: 'end'}}>
                                            <h4>{numberFormat(Math.round(profitWalletBalance) * 1000 / 1000)}</h4>
                                            <p className="mb-1">~{numberFormat(profitWalletBalance)} USD</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="btn-group mb-3">

                                    <Popup trigger=

                                        {
                                            <Button variant="">
                                            <FontAwesomeIcon icon={faArrowDown} style={{color: "red", paddingRight: '10px'}} />
                                                Withdraw
                                            </Button>
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
                                                <WithdrawTab onClose={close} wallet={"PROFIT"} />
                                            )
                                        }
                                    </Popup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 animate__animated animate__fadeInRight">
                            <div className="card acc_balance">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-3">
                                        <div>
                                            <h4>Commission</h4>
                                        </div>
                                        <div style={{textAlign: 'end'}}>
                                            <h4>0</h4>
                                            <p className="mb-1">~$0.000 USD</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="btn-group mb-3">

                                    <Button variant="" onClick={() => Exchange()}>
                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} style={{color: "#00d5ff", paddingRight: '10px'}} />
                                            Exchange
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 animate__animated animate__fadeInUp ">
                            <div className="card sub-menu">
                                <div className="card-body">
                                <ul className="d-flex">
                                    <li className="nav-item" onClick={() => setIsTransaction(true)}>
                                        <div className="nav-link" style={{color: 'white', cursor: 'pointer',}}>
                                            <i className="mdi mdi-history"></i>
                                            <span>Transaction History</span>
                                        </div>
                                    </li>

                                    

                                    <li className="nav-item"  onClick={() => setIsTransaction(false)}>
                                        <div className="nav-link" style={{color: 'white', cursor: 'pointer'}}>
                                            <i className="mdi mdi-arrow-collapse-down"></i>
                                            <span>Withdraw History</span>
                                        </div>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        {
                            isTransaction ? 
                            <div className="col-xl-12 animate__animated animate__fadeIn">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Transactions History
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="transaction-table">
                                        <div className="table-responsive">
                                            <table className="table table-striped mb-0 table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Trasaction ID</th>
                                                        <th>Time</th>
                                                        <th>Amount</th>
                                                        <th>Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                reverseTransactions.length !== 0 ?                                         
                                                reverseTransactions.map((his) => (
                                                    <tr key={his._id}>
                                                        <td>{his._id}</td>
                                                        <td>{formatDate(his.time)}</td>
                                                        <td style={
                                                            his.type === "Demo Place Investment" || his.type === "Place Investment" || his.type === 'Withdrawal' ? {color: 'red'} : 
                                                            his.type === "Demo Investment Profit" || his.type === "Investment Profit" || his.type === "Deposit" || his.type === 'Refill Demo Account' ? {color: '#53e043'} : 
                                                            null}>{his.amount}</td>
                                                        <td>{his.type}</td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td colSpan="6" style={{textAlign: 'center'}}>No Trade History</td>
                                                </tr>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-xl-12">
                            <div className="col-12">
                                <div className="card animate__animated animate__fadeIn">
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                Withdrawal History
                                            </h4>
                                            </div>
                                                <div className="card-body">
                                                <div className="transaction-table">
                                                <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr className='th-hide'>
                                                            <th>Transaction ID</th>
                                                            <th>Time</th>
                                                            <th>Address</th>
                                                            <th>Amount</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        reverseWithdrawals.length !== 0 ? 
                                                        reverseWithdrawals.map((his) => (
                                                            <tr key={his._id}>
                                                                <td className='th-hide'>{his._id}</td>
                                                                <td className='th-hide'>{formatDate(his.time)}</td>
                                                                <td className="th-hide">{his.address + " (" + his.network + ")"}</td>
                                                                <td className='th-hide'>{"$" + his.amount}</td>
                                                                <td className='th-hide' style={his.status === 'Declined' ? {color: 'red'} : his.status === 'Approved' ? {color: 'rgb(83, 224, 67)'} : null}>{his.status}</td>
                                                                <td colSpan="6" className="th-hide-wide">
                                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                                    <div>
                                                                    <p style={{textAlign: 'left', margin: '0px', color: 'white'}}>{his.network}</p>
                                                                    <p style={{textAlign: 'left', margin: '0px', fontSize: '12px'}}>{formatDate(his.time)}</p>
                                                                    </div>
                                                                    <div>
                                                                    <p style={{textAlign: 'right', margin: '0', color: 'white'}}>{"$" + his.amount}</p>
                                                                    <p style={his.status === 'Declined' ? {color: 'red', margin: '0px'} : his.status === 'Approved' ? {color: 'rgb(83, 224, 67)', margin: '0px'} : {margin: '0px'}}>{his.status}</p>
                                                                    </div>

                                                                    </div>

                                                                </td>

                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td colSpan="6" style={{textAlign: 'center'}}>No Withdrawal History</td>
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
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountOverview;
