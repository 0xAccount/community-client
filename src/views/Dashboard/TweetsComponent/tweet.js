import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context';
import CommunityDAO from "../../../abi/CommunityDAO.json";
import { COMMUNITYDAO_ADDRESS } from '../../../constants';
import { toast } from 'react-toastify';

function TweetComponent({ getAllTweets, tweet }) {
    const { web3, accounts } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);

    const formatBalance = (balance) => web3.utils.fromWei(balance, "Ether");

    const vote = async (tweetId) => {
        setLoading(true);

        try {
            const CommunityDAOContract = new web3.eth.Contract(CommunityDAO.abi, COMMUNITYDAO_ADDRESS);
            await CommunityDAOContract.methods.vote(tweetId).call({from: accounts[0]});
            await CommunityDAOContract.methods.vote(tweetId).send({from: accounts[0]});
            getAllTweets();
            toast.success("Tweet has been successfully voted");
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



    return (
        <div className="mt-3 border-bottom border-secondary">
            <p>{tweet[5]}</p>
            
            <div className="d-flex justify-content-center align-items-center mb-3">
                <i>vote to be the next tweet</i>
                <button className="btn btn-sm btn-success mx-2" onClick={() => !loading && vote(tweet[0])}>
                    {
                        !loading ? "Vote" :
                        <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>
                    }
                </button>
                <i>{tweet[3]} votes - {formatBalance(tweet[1])} DAI</i>
            </div>
        </div>
    )
}
export default TweetComponent;