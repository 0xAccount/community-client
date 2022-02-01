import './style.scss';
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../../context';
import { NETWORK_ID } from '../../constants';

function SideBar() {
    const history = useHistory();
    const [balance, setBalance] = useState(0);
    const [switchNetwork, setSwitchNetwork] = useState(false);

    const { connecting, actualWalletNetwork, accounts, requestConnectWallet, accountBalance, requestChangeNetwork } = useContext(AppContext);

    useEffect(() => {
        if (accounts && accounts.length > 0) {
            setSwitchNetwork(actualWalletNetwork !== NETWORK_ID && actualWalletNetwork !== 0x61);
        }
    }, [accounts, actualWalletNetwork]);


    useEffect(() => {
        setBalance(accountBalance);
    }, [accountBalance]);

    const requestChangeNetworkButton = () => (
        <div className="buttons-frame text-center mt-3">
            <a className="btn btn-sm btn-default text-dark" onClick={() => requestChangeNetwork()} rel="noreferrer"><span>Switch to BSC Rinkeby</span></a>
        </div>
    )

    return (
        <section className="col-2 left-section h-100">
            <div className="h-100 position-relative">
                <div className="header py-4">
                    <img src="/images/twitter-logo.png" alt="" className="mb-4" />
                    <div className="mb-2 col-10 mx-auto">
                        {
                            switchNetwork ? requestChangeNetworkButton() // If is connected in other network.
                                :
                                connecting ?
                                    <h5><b>Connecting wallet...</b></h5>
                                    :
                                    accounts && accounts.length > 0 ?
                                        <h5><b>{accounts[0]}</b></h5>
                                        :
                                        <div className="buttons-frame text-center mt-3">
                                            <a className="btn btn-sm btn-default text-dark" onClick={() => requestConnectWallet()} rel="noreferrer"><span>Connect Wallet</span></a>
                                        </div>
                        }
                    </div>
                    <p className="px-3 mt-4">
                        Every 5 hours a tweet from the blockchain is selected from the last 5 hours to be published on the twitter account: <br /><br />
                        <a href="https://twitter.com/0xAccount" target="_blank">@DecentralizeAccount</a>
                    </p>
                </div>
                <div className="table py-2">
                    <ul>
                        <li>
                            <h6>Network:</h6>
                            <span>BSC Rinkeby</span>
                        </li>
                        <li>
                            <h6>DAI:</h6>
                            {
                                accounts && accounts[0] ?
                                    <span>{'$' + balance}</span>
                                    : <span>Not connected</span>
                            }
                        </li>
                    </ul>
                    <hr />
                    <div className="sidebar py-3">
                        <ul>
                            <li>
                                <button className="btn btn-sm btn-default text-white" onClick={() => history.push('/')}>Dashboard</button>
                            </li>
                            <li>
                                <button className="btn btn-sm btn-default text-white" onClick={() => history.push('/roadmap')}>📜 Roadmap</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-start align-items-center social w-100">
                <a href="https://discord.gg/9P6ZvPDxNw" target="_blank" className="col" rel="noreferrer">
                    <FontAwesomeIcon icon={faDiscord} title="Discord community" />
                </a>
                <a href="https://twitter.com/0xAccount" target="_blank" className="col" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} title="Twitter community" />
                </a>
                <a href="https://github.com/0xAccount" target="_blank" className="col" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} title="See code" />
                </a>
            </div>
        </section>
    );
}

export default SideBar;
