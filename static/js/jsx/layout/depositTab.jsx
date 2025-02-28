import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';

const CopyInputValue = ({ value }) => {
    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const handleCopyClick = () => {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);

        setCopyButtonText('Copied!');
        setTimeout(() => {
            setCopyButtonText('Copy');
        }, 1500);
    };

    return (
        <form action="">
            <p style={{marginBottom: '0px'}}>Wallet address:</p>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control custom-input"
                    value={value}
                    readOnly
                    style={{background: 'black', color: 'white'}}
                />
                <div className="">
                    <button
                        type="button"
                        className="input-group-text bg-primary text-white"
                        onClick={() => {handleCopyClick()}}
                        style={{height: '95%'}}
                    >
                        {copyButtonText}
                    </button>
                </div>
            </div>
            <p>Rate: 1 USDT = 1 MAIN</p>
        </form>
    );
};

const DepositTab = ({onClose}) => {
    
    return (
        <div className="card animate__animated animate__fadeIn mobile_dv" style={{}}>
            <div className="card-header">
                <h4 className="card-title">Deposit Main</h4>
                <h4 onClick={()=> {onClose()}} style={{cursor: 'pointer'}} className="card-title">X</h4>
            </div>
            <div className="card-body" id="deposits">
                <Tab.Container defaultActiveKey="tab1">
                    <p style={{marginBottom: '0px'}}>Network:</p>
                    <Nav variant="pills">
                        <Nav.Link eventKey="tab1">BTC</Nav.Link>
                        <Nav.Link eventKey="tab2">ETH</Nav.Link>
                        <Nav.Link eventKey="tab3">TRC20</Nav.Link>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="tab1">                            
                            <CopyInputValue value="bc1q6vns42crckg0ag2tmzw38lz8u4yl24wzanr2qg" onClose={onClose} />
                            <ul>
                                <li>
                                    <i className="mdi mdi-checkbox-blank-circle"></i>
                                    The network must be BTC. Make sure your network matches the network address.
                                </li>
                                <li>
                                    <i className="mdi mdi-checkbox-blank-circle"></i>If it doesn't reflect on your account within 5 minutes, please submit the transaction screenshot to our support team.
                                </li>
                            </ul>
                            <div className="qrcode">
                            <img src="https://dgccx.nyc3.cdn.digitaloceanspaces.com/qrcode_145472717_a3f4d4a0c5fec49c6f30670040d72e80.png" alt='' height={'100px'} width={'100px'}/>
                                <p style={{textAlign: 'center',}}>Scan QR</p>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="tab2">                            
                            <CopyInputValue value="0xeb033eAbC5514cFe632f70aB2870DDE49AF64B90" onClose={onClose} />
                            <ul>
                                <li>
                                    <i className="mdi mdi-checkbox-blank-circle"></i>
                                    The network must be ETH. Make sure your network matches the network address.
                                </li>
                                <li>
                                    <i className="mdi mdi-checkbox-blank-circle"></i>If it doesn't reflect on your account within 5 minutes, please submit the transaction screenshot to our support team.
                                </li>
                            </ul>
                            <div className="qrcode">
                            <img src="https://dgccx.nyc3.cdn.digitaloceanspaces.com/qrcode_145473305_172663ba7902251253b319e5200efba4.png" alt='' height={'100px'} width={'100px'}/>
                                <p style={{textAlign: 'center',}}>Scan QR</p>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="tab3">                            
                            <CopyInputValue value="TWo6A7z6m1ZUUhXw7qvT95z2GGfM5jq6wX" onClose={onClose} />
                            <ul>
                                <li>
                                    <i className="mdi mdi-checkbox-blank-circle"></i>
                                    The network must be TRC-20. Make sure your network matches the network address.
                                </li>
                                <li>
                                    <i className="mdi mdi-checkbox-blank-circle"></i>If it doesn't reflect on your account within 5 minutes, please submit the transaction screenshot to our support team.
                                </li>
                            </ul>
                            <div className="qrcode">
                            <img src="https://dgccx.nyc3.cdn.digitaloceanspaces.com/qrcode_145475552_b50a9aa421ad3abaa12e284e5c6e651a.png" alt='' height={'100px'} width={'100px'}/>
                                <p style={{textAlign: 'center',}}>Scan QR</p>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
};

export default DepositTab;