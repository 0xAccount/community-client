import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import SideBar from './views/SideBar';

import { AppContext } from "./context";
import DaiERC20 from "./abi/DaiERC20.json";

import Web3 from "web3";
import { CHAIN_INDEX, CHAIN_LIST, DAI_ADDRESS, NETWORK_ID, NETWORK_ID_ALTERNATIVE } from './constants';


function App() {
  const [web3, setWeb3] = useState({ web3: null, network: NETWORK_ID });
  const [accounts, setAccounts] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);
  const [actualWalletNetwork, setActualWalletNetwork] = useState(NETWORK_ID);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    try {
      const web3 = new Web3(window.ethereum);
      setWeb3({ ...web3, web3 }, checkIfIsConnected(), listenersWeb3());
    } catch (error) {
      alert("Error trying to connect the wallet");
    }
  }, []);

  const listenersWeb3 = () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setAccounts(accounts);
      checkIfIsConnected();
    });
    window.ethereum.on('chainChanged', async function (networkId) {
      if ((networkId === NETWORK_ID) || (networkId === NETWORK_ID_ALTERNATIVE)) {
        checkIfIsConnected();
      }
      setActualWalletNetwork(networkId);
    });
  }


  const checkIfIsConnected = async () => {
    setConnecting(true);
    const web3 = new Web3(window.ethereum);
    setActualWalletNetwork(await web3.eth.getChainId());
    const _accounts = await web3.eth.getAccounts();
    setAccounts(_accounts);

    if (_accounts.length > 0) {
      getBalance();
    }

    setConnecting(false);
  }

  const requestConnectWallet = async () => {
    try {
      await window.ethereum.enable();
    } catch (error) {
      alert("Error trying to connect the wallet");
    }
  }


  const requestChangeNetwork = async () => {
    try {
      const data = [CHAIN_LIST[CHAIN_INDEX]]
      await window.ethereum.request({ method: 'wallet_addEthereumChain', params: data }).catch();
      setTimeout(() => {
        checkIfIsConnected();
      }, 100);
    } catch (error) {
      alert('You already have a request in your wallet');
    }
  }


  const getBalance = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const DAIContract = new web3.eth.Contract(DaiERC20.abi, DAI_ADDRESS);
    const DAIbalance = await DAIContract.methods.balanceOf(accounts[0]).call();
    const accountBalance = web3.utils.fromWei(DAIbalance, "Ether");
    setAccountBalance((+accountBalance).toFixed(2));
  }

  const exportVariables = { connecting, setConnecting, accounts, web3, actualWalletNetwork, accountBalance, requestConnectWallet, accountBalance,
    requestChangeNetwork, getBalance };


  return (
    <AppContext.Provider value={exportVariables}>
      <Router>
        <div className="App h-100">

          <div className="d-block d-md-flex justify-content-between align-items-center h-100">
            <SideBar />
            <Routes />
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
