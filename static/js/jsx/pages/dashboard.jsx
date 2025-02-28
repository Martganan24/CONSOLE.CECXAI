import React, {useEffect} from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from 'react-perfect-scrollbar'
import "react-rangeslider/lib/index.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import TradingView from "../layout/trading-view";
import BidPanel from "../layout/bidPanel";
import ResulPanel from "../layout/resultPanel";
import { useAppContext } from "../../AppContext";
import 'animate.css'

function Dashboard() {


    const { tradeHistory, isDemo, tradeDemoHistory, userData, getPercentage} = useAppContext();
    const reversedHistory = [...tradeHistory].reverse();
    const reversedDemoHistory = [...tradeDemoHistory].reverse();

    useEffect(() => {
        userData();
        getPercentage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function formatDate2(date) {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleTimeString('en-US', options);
      }

    function formatDate(date) {
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    return (
        <>         
            <Header2 />
            <Sidebar />

            <div className="content-body" id="dashboard">
            <ToastContainer />
        
                    <div className="row">
                        {/* chart component */}
                            <TradingView />
                        {/* input Amount */}
                        <div className="col-xl-3 col-lg-4 col-md-12 col-xxl-4 animate__animated animate__fadeInRight">
                            <div className="card acc_balance">
                                <div className="card-body">
                                    <BidPanel/>
                                </div>
                            </div>
                        </div>
                        {/* Last Results */}
                        {/* <div className="col-xl-3 col-lg-4 col-md-12 col-xxl-4 animate__animated animate__fadeInLeft">
                                <div className="card acc_balance" style={{height: '250px'}}>
                                    <div className="card-header">
                                        <h4 className="card-title">
                                            Last Results
                                        </h4>
                                    </div>
                                    <div className="result-panel">
                                    <ResulPanel/>
                                    </div>
                                </div>
                        </div> */}
                        {/* Trade History */}
                        <div className="col-12 animate__animated animate__fadeInUp trade_histroy">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card" style={{height: '500px'}}>
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                Trade History
                                            </h4>
                                        </div>
                                        <PerfectScrollbar>
                                            <div className="card-body trade-history">
                                            <div className="transaction-table">
                                            <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className='th-hide'>Transaction ID</th>
                                                        <th>Time</th>
                                                        <th>Type</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Profit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                {isDemo ? 
                                                reversedDemoHistory.length !== 0 ?
                                                reversedDemoHistory.map((trade) => (
                                                    <tr key={trade._id}>
                                                        <td className='th-hide'>#{trade._id}</td>
                                                        <td className='th-hide'>{formatDate(trade.time)}</td>
                                                        <td className='th-bcHide'>{formatDate2(trade.time)}</td>
                                                        <td>{trade.placeOrder}</td>
                                                        <td>${trade.totalPlace}</td>
                                                        <td style={trade.result === 'Win' ? {color: "#53e043"}: trade.result === "Lose" || trade.result === "Loss" ? {color: 'red'} : null}>{trade.result}</td>
                                                        <td>{trade.result === 'Pending' ? "-" : trade.totalProfit}</td>
                                                    </tr>
                                                )) 
                                                :
                                                <tr>
                                                    <td colSpan="6" style={{textAlign: 'center'}}>No Trade History</td>
                                                </tr>
                                                :
                                                reversedHistory.length !== 0 ?                                         
                                                reversedHistory.map((trade) => (
                                                    <tr key={trade._id}>
                                                        <td className='th-hide'>#{trade._id}</td>
                                                        <td className='th-hide'>{formatDate(trade.time)}</td>
                                                        <td className='th-bcHide'>{formatDate2(trade.time)}</td>
                                                        <td>{trade.placeOrder}</td>
                                                        <td>${trade.totalPlace}</td>
                                                        <td style={trade.result === 'Win' ? {color: "#53e043"}: trade.result === "Lose" || trade.result === "Loss" ? {color: 'red'} : null}>{trade.result}</td>
                                                        <td>{trade.result === 'Pending' ? "-" : trade.totalProfit}</td>
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
                                        </PerfectScrollbar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            
        </>
    );
}

export default Dashboard;
