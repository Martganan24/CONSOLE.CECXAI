import React, { useState } from 'react';
import { Tab} from 'react-bootstrap';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../../AppContext';

const WithdrawTab = ({onClose, wallet}) => {


    const getInitialState = () => {
        const value = '1';
        return value;
      };

    const {requestWithdrawal} = useAppContext();
    const [selectedOption, setSelectedOption] = useState(getInitialState);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState();
    const network = selectedOption === "1" ? 'TRC20' : selectedOption === "2" ? 'ERC20' : null;
    
    const handleNetworkChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }


    const submitWithdraw = () => {
        address === '' ?
        toast.error('Please enter your wallet address', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        }) :
        amount === '' ?
        toast.error('Please enter the amount you want to withdraw', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        }) :
        amount < 10 ?
        toast.error('The amount you want to withdraw must be greater than 10 MAIN', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        }) :
        requestWithdrawal(amount, network, wallet, address)
        onClose();
    }

    return (
        <div className="card animate__animated animate__fadeIn mobile_dv">
            <ToastContainer />
            <div className="card-header">
                <h4 className="card-title">Withdraw {wallet === 'MAIN' ? 'Main' : 'Profit'}</h4>
                <h4 onClick={()=> {onClose()}} style={{cursor: 'pointer'}} className="card-title">X</h4>
            </div>
            <div className="card-body" id="">
                <Tab.Container defaultActiveKey="tab1">
                    <p style={{marginBottom: '0px'}}>Network:</p>
                    <div className="input-group mb-3">
                    <select className="custom-select form-control custom-input mb-3" value={selectedOption} id="inputGroupSelect01" onChange={handleNetworkChange}>
                        <option value="1" >TRC20</option>
                        <option value="2" >ERC20</option>
                    </select>
                    </div>
                    <p style={{marginBottom: '0px'}}>Wallet address:</p>
                    <div className="input-group mb-3">
                        <input
                            
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                            className="form-control custom-input"
                            style={{background: 'black', color: 'white'}}
                        />
                    </div>    
                    <p style={{marginBottom: '0px'}}>Amount:</p>
                    <div className="input-group mb-3">
                        <input

                            type='number'
                            value={amount}
                            onChange={handleAmountChange}
                            className="form-control custom-input"
                            style={{background: 'black', color: 'white'}}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <p style={{margin: '0px'}}>Min: 10 MAIN</p>
                    </div>
                    <div>
                        <p style={{marginBottom: '0px', color: 'red'}}>Warning: Only withdraw USDT. The network must be {selectedOption === "1" ? 'TRC20' : selectedOption === "2" ? 'ERC20' : null }. Make sure the network matches the network address entered.</p>
                    </div>
                    <div className="input-group mb-3">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            style={{height: '95%'}}
                            onClick={() => {submitWithdraw()}}
                        >
                            Withdraw
                        </button>
                    </div>

                </Tab.Container>
            </div>
        </div>
    );
};

export default WithdrawTab;