import React from "react";
import CommunityDAO from "../abi/CommunityDAO.json";
import { COMMUNITYDAO_ADDRESS } from '../constants';
import Web3 from "web3";
import { toast } from "react-toastify";

function ResetComponent() {

    const reset = async () => {
        const timestamp = 1644850800;
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const CommunityDAOContract = new web3.eth.Contract(CommunityDAO.abi, COMMUNITYDAO_ADDRESS);
        await CommunityDAOContract.methods.setNextTweet(timestamp).send({from: accounts[0]});
        toast.success("Reseteado correctamente");
    }

    return (
        <button className="btn btn-danger" onClick={() => reset()}>Reset</button>
    )
}


export default ResetComponent;