import React, {useEffect} from 'react';
// import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import Testimonial from '../element/testimonial';
// import Footer1 from '../layout/footer1';
// import Header1 from '../layout/header1';
// import Group5 from './../../images/home/Group5.png';
// import Group8 from './../../images/home/Group8.png';
// import Group10 from './../../images/home/Group10.png';
// import Group92 from './../../images/home/Group92.png';
// import Path47 from './../../images/home/Path47.png';
// import Path48 from './../../images/home/Path48.png';
// import p2 from './../../images/partner/2.png';
// import p3 from './../../images/partner/3.png';
// import p4 from './../../images/partner/4.png';
// import p6 from './../../images/partner/6.png';
// import p7 from './../../images/partner/7.png';
// import p9 from './../../images/partner/9.png';
// import p11 from './../../images/partner/11.png';
// import p12 from './../../images/partner/12.png';
// import p13 from './../../images/partner/13.png';
// import p14 from './../../images/partner/14.png';
// import p15 from './../../images/partner/15.png';
// import p17 from './../../images/partner/17.png';
// import p18 from './../../images/partner/18.png';

function Homepage() {

    // redirect to dgccx.pro
    useEffect(() => {
        window.location.href = 'https://dgccx.pro';
    }, []);

    // const containerRef = useRef(null);

    return (
        <>
            {/* <Header1 />

            <div className="intro" id="home">
            <div className="tradingview-widget-container" ref={containerRef} style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width:" 100%",
                  zIndex: 1000,
            }}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
                <div className="container">
                    <div className="">
                        <div className="">
                            <div className="intro-content">
                                <h1 style={{fontSize: '60px', fontWeight: 'bold'}}>Buy & Sell Crypto Instantly</h1>
                                <p>Trade Gold, Bitcoin, and Ethereum in seconds, on our simple and ultra-secure crypto exchange</p>
                            </div>

                            <div className="intro-btn">
                                <Link to={'./signup'} className="btn-signup">Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="getstart section-padding" id="portfolio">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <div className="section-title">
                                <h2>start trading in 3 easy steps</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                            <div className="getstart-content">
                                <span><i className="la la-user-plus"></i></span>
                                <h3>Register</h3>
                                <p>set up your account in less than 2 minutes with our simplified KYC process</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                            <div className="getstart-content">
                                <span><i className="la la-bank"></i></span>
                                <h3>Deposit</h3>
                                <p>Add funds to your account using your preffered deposit method</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                            <div className="getstart-content">
                                <span><i className="la la-exchange"></i></span>
                                <h3>Trade</h3>
                                <p>Buy & Sell crypto in seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="portfolio section-padding text-center" id="portfolio" style={{backgroundColor: '#10d876'}}>
                <div className="container">
                    <div className="row" style={{paddingBottom: '25px'}}>
                        <div className="col-sm-12">
                        <div className="heading-title text-center">
                            <h2 className="title iq-tw-6" style={{color: "black"}}>Dgccx - International Transparent Broker</h2>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="row">
                        <div className="col-md-4 iq-r-mt-40">
                            <div className="iq-small-icon">
                            <img src={Group5} alt="icon" height={'150px'} width={'150px'}/>
                            <h4 style={{paddingTop: '20px', paddingBottom: '20px', color: "black"}}>Reward Free Token after Registratrion</h4>
                            </div>
                        </div>
                        <div className="col-md-4 iq-r-mt-40">
                            <div className="iq-small-icon">
                            <img src={Path47} alt="icon" height={'150px'} width={'150px'} />
                            <h4 style={{paddingTop: '20px', paddingBottom: '20px', color: "black"}}>Huge commission 50% for Agency and Transactions</h4>
                            </div>
                        </div>
                        <div className="col-md-4 iq-r-mt-40">
                            <div className="iq-small-icon active">
                            <img src={Group10} alt="icon" height={'150px'} width={'150px'} />
                            <h4 style={{paddingTop: '20px', paddingBottom: '20px', color: "black"}}>Over 500,000+ traders around the world</h4>
                            </div>
                        </div>
                        <div className="col-md-4 iq-r-mt-40">
                            <div className="iq-small-icon">
                            <img src={Group8} alt="icon" height={'150px'} width={'150px'}/>
                            <h4 style={{paddingTop: '20px', paddingBottom: '20px', color: "black"}}>Deposit/Withdrawal easy in 10 minutes</h4>
                            </div>
                        </div>
                        <div className="col-md-4 iq-r-mt-40">
                            <div className="iq-small-icon">
                            <img src={Path48} alt="icon" height={'150px'} width={'150px'}/>
                            <h4 style={{paddingTop: '20px', paddingBottom: '20px', color: "black"}}>Over 3 million transactions every day</h4>
                            </div>
                        </div>
                        <div className="col-md-4 iq-r-mt-40">
                            <div className="iq-small-icon">
                            <img src={Group92} alt="icon" height={'150px'} width={'150px'}/>
                            <h4 style={{paddingTop: '20px', paddingBottom: '20px', color: "black"}}>Best payout 95%</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonial section-padding" id="testimonial">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="section-title">
                                <h2>What global traders say about us?</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="testimonial-content">
                                <Testimonial />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="promo section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <div className="section-title text-center">
                                <h2>The most trusted cryptocurrency platform</h2>
                                <p> Here are a few reasons why you should choose Dgccx
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center py-5">
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="promo-content">
                                <div className="promo-content-img">
                                    <img className="img-fluid" src={require('./../../images/svg/protect.svg')} alt="" />
                                </div>
                                <h3>Secure storage </h3>
                                <p>We store the vast majority of the digital assets in secure offline storage.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="promo-content">
                                <div className="promo-content-img">
                                    <img className="img-fluid" src={require('./../../images/svg/cyber.svg')} alt="" />
                                </div>
                                <h3>Protected by insurance</h3>
                                <p>Cryptocurrency stored on our servers is covered by our insurance policy.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="promo-content">
                                <div className="promo-content-img">
                                    <img className="img-fluid" src={require('./../../images/svg/finance.svg')} alt="" />
                                </div>
                                <h3>Industry best practices</h3>
                                <p>Dgccx supports a variety of the most popular digital currencies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="overview-block-pt iq-great-partner iq-hide section-padding" style={{backgroundColor: '#10d876'}}>
            <div className="container">
                <div className="row">
                <div className="col-sm-12">
                    <div className="logo text-center">
                    <p>
                        <img src={p9} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p3} alt="icon"  height={"55px"} style={{margin: '15px'}}/>
                        <img src={p4} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                    </p>
                    <p>
                        <img src={p2} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p6} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p7} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p12} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p13} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                    </p>
                    <p>
                        <img src={p14} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p15} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p11} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p17} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                        <img src={p18} alt="icon" height={"55px"} style={{margin: '15px'}}/>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <Footer1 /> */}
        </>
    )
}

export default Homepage;










