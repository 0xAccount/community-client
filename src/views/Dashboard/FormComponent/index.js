import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context';
import CommunityDAO from "../../../abi/CommunityDAO.json";
import { COMMUNITYDAO_ADDRESS } from '../../../constants';
import { toast } from 'react-toastify';

function FormComponent({getAllTweets}) {
    const maxLength = 280;
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [donation, setDonation] = useState("");

    const { accounts, web3 } = useContext(AppContext);

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    }


    const publishTweet = async () => {
        setLoading(true);
        const CommunityDAOContract = new web3.eth.Contract(CommunityDAO.abi, COMMUNITYDAO_ADDRESS);
        try {
            const balance = donation * 10 ** 18;
            await CommunityDAOContract.methods.publishTweet(balance.toString(), content).send({from: accounts[0]});
            getAllTweets();
            toast.success("🦄 The tweet has been successfully added");
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
        <div className="container border-bottom border-secondary px-4 py-3">
            <h5 className="text-start mb-4">Publish tweet in <a href="https://twitter.com/0xAccount" target="_blank">@0xAccount</a></h5>

            <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                    <input className="form-control donations" type="number" placeholder="donation" value={donation} onChange={(e)=> setDonation(e.target.value)} />
                </div>
                <h3 className="ms-3">DAI</h3>
            </div>
            <textarea className="form-control" value={content} onKeyDown={(e) => handleKeyDown(e)} placeholder="What’s happening?" rows="2" maxLength={maxLength}
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
        </div>
    )
}
export default FormComponent;