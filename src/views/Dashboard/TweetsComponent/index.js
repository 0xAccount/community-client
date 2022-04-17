import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context';
import CommunityDAO from "../../../abi/CommunityDAO.json";
import { COMMUNITYDAO_ADDRESS } from '../../../constants';
import TweetComponent from './tweet';
import FormComponent from '../FormComponent';

function TweetsComponent() {
    const { web3 } = useContext(AppContext);
    const [tweetList, setTweetList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllTweets();
    }, []);

    const getAllTweets = async () => {
        setLoading(true);
        const CommunityDAOContract = new web3.eth.Contract(CommunityDAO.abi, COMMUNITYDAO_ADDRESS);
        const tweets = await CommunityDAOContract.methods.getTweets().call();
        setTweetList(tweets);
        setLoading(false);
    }


    return (
        <div className="container col-12 col-md-10 mt-2">
            <FormComponent getAllTweets={() => getAllTweets()} />
            {
                loading &&
                <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>
            }
            {
                tweetList.map(tweet =>
                    <TweetComponent
                        key={tweet[0]}
                        tweet={tweet}
                        getAllTweets={() => getAllTweets()}
                        />)
            }
        </div>
    )
}
export default TweetsComponent;