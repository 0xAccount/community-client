
function Documentation() {

    return (
        <section className="col center-section h-100">
            <div className="top-bg">
                <div className="top-bg-overlay"></div>
            </div>


            <div className="container-fluid px-5 games-list text-start position-absolute mt-5 roadmap">
                <h3>📖 Documentation</h3>

                <div className="row d-flex justify-content-center my-5">
                    <div className="col-md-10">
                        <div className="main-card mb-3 card">
                            <div className="card-body">
                                <h5 className="card-title mb-5">Tutorial and Rules</h5>
                                <h3 className="mb-2">Tutorial</h3>
                                <p className="mb-0 h6 text-white">A tweet will be posted every 24hrs (let's call it <i>rounds</i>). <br />
                                    An amount to donate and a content for the tweet must be entered (identity is not revealed) and
                                    people will be able to vote for a minimum cost for the tweet they like the most for the next
                                    round (you can only vote for 1 tweet per round).
                                </p>
                                <br />
                                <p className="mb-0 h6 text-white">
                                    <i>It will be necessary to respect the twitter rules,
                                    otherwise the tweet will not be chosen (in this case the second with the most votes will be given privilege).</i>
                                </p>
                                <br /><br />


                                <h3 className="mb-2">Rules</h3>
                                <ul>
                                    <li><a href="https://help.twitter.com/es/rules-and-policies/twitter-rules" target="_blank">Twitter rules and policies</a></li>
                                </ul>
                                <br />

                                <h3 className="mb-2">How publish an image?</h3>
                                <p className="mb-0 h6 text-white">You can add the url and will be attached in the tweet.</p>
                                <br /><br />

                                <h3 className="mb-2">Donation</h3>
                                <p className="mb-0 h6 text-white">Donations will be administered by our foundation and the community.
                                    Votes will be taken to determine the destination of the donations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Documentation;
