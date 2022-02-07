import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../context';
import CommunityDAO from "../../../abi/CommunityDAO.json";
import DaiERC20 from "../../../abi/DaiERC20.json";
import { COMMUNITYDAO_ADDRESS, DAI_ADDRESS } from '../../../constants';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function FormComponent({getAllTweets}) {
    const { accounts, web3, accountBalance } = useContext(AppContext);
    const [daiAllowance, setDaiAllowance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [donation, setDonation] = useState("");
    const [balance, setBalance] = useState(0);

    const MIN_ALLOWANCE = 1000 *10**8;
    const maxLength = 280;


    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
    }

    useEffect(() => {
        checkAllowance();
    }, []);

    useEffect(() => {
        setBalance(accountBalance);
    }, [accountBalance]);

    const publishTweet = async () => {
        if (balance < donation) {
            toast.error("Error: Insufficient funds");
            return false;
        }


        setLoading(true);
        const CommunityDAOContract = new web3.eth.Contract(CommunityDAO.abi, COMMUNITYDAO_ADDRESS);
        try {
            const balance = donation * 10 ** 18;
            await CommunityDAOContract.methods.publishTweet(balance.toString(), content).send({from: accounts[0]});
            getAllTweets();
            toast.success("🦄 The tweet has been successfully added");
            setDonation("");
            setContent("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (typeof error === 'object') {
                toast.error("Error: Try again later");
                return false;
            }
            let message = error.message;
            if (message && message.split("execution reverted: ").length > 0) {
                message = error.message.split("execution reverted: ")[1].split("\"\n}")[0];
            }
            toast.error("Error: " + message);
        }
    }


    const checkAllowance = async () => {
        const DaiContract = new web3.eth.Contract(DaiERC20.abi, DAI_ADDRESS);
        const allowance = await DaiContract.methods.allowance(accounts[0], COMMUNITYDAO_ADDRESS).call();
        setDaiAllowance(+allowance >= MIN_ALLOWANCE);
    }

    const approveAllowance = async () => {
        setLoading(true);
        const DaiContract = new web3.eth.Contract(DaiERC20.abi, DAI_ADDRESS);
        await DaiContract.methods.approve(COMMUNITYDAO_ADDRESS, MIN_ALLOWANCE.toString()).send({from: accounts[0]});
        setDaiAllowance(true);
        setLoading(false);
    }

    return (
        <div className="container border-bottom border-secondary px-4 py-3">

            {
                daiAllowance ?
                <>
                    <h5 className="text-start mb-1">Publish tweet in <a href="https://twitter.com/0xAccount" target="_blank">@0xAccount</a></h5>
                    <div className="text-start mb-4">
                        <Link to="https://medium.com/@0xAccount/first-decentralized-twitter-account-1e12523691d7">Read the tutorial and rules here</Link>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <div className="col-2">
                            <input className="form-control donations rounded-0" type="number" placeholder="Donation" value={donation} onChange={(e)=> setDonation(e.target.value)} />
                        </div>
                        <button className="btn rounded-0 btn-primary" onClick={() => setDonation(balance)}>Max.</button>
                        <p className="ms-3 mb-0 text-secondary h6">in DAI's</p>
                    </div>
                    <textarea className="form-control rounded-0" value={content} onKeyDown={(e) => handleKeyDown(e)} placeholder="What’s happening?" rows="4" maxLength={maxLength}
                    onChange={(e)=> setContent(e.target.value)}></textarea>
                    <div className="d-flex justify-content-end my-3">
                        <button className="btn btn-primary rounded-pill" onClick={() => publishTweet()}
                        disabled={content.length === 0 || loading || donation <= 0}>
                            {
                                !loading ? <b>Tweet</b> :
                                <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                            }
                        </button>
                    </div>
                </>
                :
                <>
                    <h5>Approve allowance to continue</h5>
                    <button className="btn btn-warning mt-2" onClick={() => approveAllowance()} disabled={loading}>
                            {
                                !loading ? "Approve DAI" :
                                <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                            }
                        
                    </button>
                </>
            }

        </div>
    )
}
export default FormComponent;