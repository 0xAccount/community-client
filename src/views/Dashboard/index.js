import './style.scss';
import React, { useContext, useEffect, useState } from 'react';
import TweetsComponent from './TweetsComponent';
import { AppContext } from '../../context';
import CommunityDAO from "../../abi/CommunityDAO.json";
import { COMMUNITYDAO_ADDRESS } from '../../constants';

import TimeAgo from 'timeago-react';
import Web3 from "web3";

function Dashboard() {
    const { accounts } = useContext(AppContext);
    const [isActive, setIsActive] = useState(false);
    const [nextTweet, setNextTweet] = useState(null);

    useEffect(() => {
        getContractVariables();
    }, []);

    const getContractVariables = async () => {
        const web3 = new Web3(window.ethereum);
        const CommunityDAOContract = new web3.eth.Contract(CommunityDAO.abi, COMMUNITYDAO_ADDRESS);
        // Is Active
        setIsActive(await CommunityDAOContract.methods.isActive().call());

        // Next Tweet
        formatDate(await CommunityDAOContract.methods.nextTweetIn().call());
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const format = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
        setNextTweet(format);
    }

    return (
        <section className="col center-section h-100">
            <div className="top-bg">
                <div className="top-bg-overlay"></div>
            </div>

            <div className="container-fluid px-5 pt-5 pb-3">
                <div className="row p-60-0 p-lg-30-0 p-md-15-0">
                    <div className="col-lg-12">
                        <div className="banner">
                            <div className="banner-back"></div>

                            <div className="banner-overlay">
                                <div className="banner-title">
                                    <h1 className="mb-15">Tweet and Vote<br />what you want from the <u>blockchain</u></h1>

                                    <img src="images/twitter-logo.png" className="banner-photo" alt="Banner photo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid information px-5">
                <div className="row">
                    <div className="col-4 text-start">
                        <p>
                            Next tweet
                            <span className="ms-2">
                            <TimeAgo
                                    datetime={nextTweet}
                                    locale='vi'
                                />
                            </span>
                        </p>
                    </div>
                    <div className="col-4 text-start">
                        <p>
                            Active
                            <span>{isActive ? "True" : "False"}</span>
                        </p>
                    </div>
                </div>

                {
                    accounts && (accounts.length > 0) ?
                        !isActive ? (
                            <>
                                <h4>Contract inactive</h4>
                                <i>Posting the tweet. Try again in a few minutes.</i>
                            </>
                        ) : <TweetsComponent />
                    :
                    <>
                        <h4>Not connected</h4>
                        <i>Connect your wallet to continue</i>
                    </>
                }
            </div>
        </section>
    );
}
export default Dashboard;
