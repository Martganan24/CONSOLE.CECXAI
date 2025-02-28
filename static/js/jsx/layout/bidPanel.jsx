import '../../css/bid.css'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAppContext } from "../../AppContext";

const BidPanel = () => {

  const { countdownText, isButtonDisabled, isDemo, token, balance, demobalance, tradeHistory, userData, tradeDemoHistory, setCurrentTradeId, percentage, getPercentage} = useAppContext();

    const [n, setN] = useState(0);

    useEffect(() => {
      userData();
      getPercentage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //get the latest trade history result
    const reversedHistory = [...tradeHistory].reverse();
    const latestResult = reversedHistory[0] && reversedHistory[0].result;
    const haveBid = latestResult === "Pending" ? true : false;



    const reversedDemoHistory = [...tradeDemoHistory].reverse();
    const latestDemoResult = reversedDemoHistory[0] && reversedDemoHistory[0].result;
    const haveDemoBid = latestDemoResult === "Pending" ? true : false;


    const handleInput = (event) => {
      const inputValue = event.target.value;
      if (inputValue === '') {
          setN(0);
      } else {
          setN(parseInt(inputValue));
      }
    };

  const bidHandler = (bid) => {
    if(n !== 0){
      if(isDemo){
        // demo account
        if(demobalance >= n){
          //have enough balance
          postBid(bid, 'demo');
        }else{
          setN(0);
          toast.error('Insufficient Balance!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        }
      }else {
        if(balance >= n){
          //have enough balance
          postBid(bid, 'live');
        }else{
          setN(0);
          toast.error('Insufficient Balance!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        }
      }
    }else{
      toast.error('Please Enter Amount!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  }

  const postBid = async (bid, acc) => {
    try{
      //post bid
      const demoUrl = process.env.REACT_APP_API_demoBid
      const url = process.env.REACT_APP_API_bid

      const data = {
        placeOrder: bid,
        totalPlace: n
      }



      const response= await axios.post((acc === 'live') ? url : demoUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      setCurrentTradeId(response.data.currentTrade._id)
      localStorage.setItem("currentTradeId", response.data.currentTrade._id);

      if(response.data.status === "SUCCESS"){
          setN(0);

          toast.success(`${bid} Successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        
        userData();
        }else if(response.data.status === "ERROR"){
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
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

  return (
    <div className="actionPanel">
      <div className="actionPlus">
        <div className='ctrl'>
        <div className='ctrl__button ctrl__button--decrement' onClick={() => n === 0 ? setN(n) : setN(n - 1)}>&ndash;</div>
        <div className='ctrl__counter'>
            <input className='ctrl__counter-input' maxLength='0' type='number' value={n}  onChange={(event) => handleInput(event)}/>
            <div className='ctrl__counter-num'>{n}</div>
        </div>
        <div className='ctrl__button ctrl__button--increment' onClick={() => setN(n + 1)}>+</div>
        </div>
        </div>

        <div className="amountSuggestion">
          <div className="Suggestion-items">
            <div className="Suggest-item" onClick={() => setN(n+1)} >
              <p>+$1</p>
            </div>
            <div className="Suggest-item" onClick={() => setN(n+5)}>
              <p>+$5</p>
            </div>
            <div className="Suggest-item" onClick={() => setN(n+10)}>
              <p>+$10</p>
            </div>
            <div className="Suggest-item" onClick={() => setN(n+50)}>
              <p>+$50</p>
            </div>
            <div className="Suggest-item" onClick={() => setN(n+100)}>
              <p>+$100</p>
            </div>
            <div className="Suggest-item" onClick={() => isDemo ? setN(demobalance) : setN(balance)}>
              <p>All</p>
            </div>
        </div>

        <div className="earnings">
          <p>
            Earnings <span style={{ fontSize: '15px', color: '#31baa0' }}>+{percentage}%</span>
          </p>
          <p className="totalEarn">${n + (n*percentage)/100}</p>
        </div>

        <div className="action-btn">

          <button onClick={()=> bidHandler("Buy")} className={`btn btn-buy ${isDemo ? haveDemoBid : haveBid ? 'dis' : ''} ${isButtonDisabled ? 'dis' : ''}`} disabled={isButtonDisabled ? true : isDemo  &&  haveDemoBid ? true : !isDemo && haveBid ? true : false}>
            <div className="btn-content">
              <p>BUY</p>
            </div>
          </button>

          <div className="btn timer">
            <p>{isButtonDisabled ? 'Waiting time' : 'Active time'}</p>
            <p>{countdownText}</p>
            <p></p>
          </div>

          <button onClick={()=> bidHandler("Sell")} className={`btn btn-sell ${isDemo ? haveDemoBid : haveBid? 'dis' : ''} ${isButtonDisabled ? 'dis' : ''}`} disabled={isButtonDisabled ? true : isDemo  &&  haveDemoBid ? true : !isDemo && haveBid ? true : false}>
            <div className="btn-content">
              <p>SELL</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default BidPanel;