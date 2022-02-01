import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import SideBar from './views/SideBar';

import { AppContext } from "./context";
import DaiERC20 from "./abi/DaiERC20.json";

import Web3 from "web3";
import { DAI_ADDRESS } from './constants';


function App() {
  const NETWORK_ID = 97;
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
      if (networkId === NETWORK_ID) {
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
      const data = [{
        chainId: '0x61',
        chainName: 'Smart Chain - Testnet',
        nativeCurrency:
        {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
      }]
      await window.ethereum.request({ method: 'wallet_addEthereumChain', params: data }).catch()
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

          <div className="d-flex justify-content-between align-items-center h-100">
            <SideBar />
            <Routes />
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
