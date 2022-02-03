import './style.scss';
import { roadmap_list } from './roadmap_list';

function Roadmap() {

    const renderRoadmapItem = (item, index) => {
        return (
            <div className="vertical-timeline-item vertical-timeline-element" key={index}>
                <div>
                    <span className="vertical-timeline-element-icon bounce-in">
                        <i className={`badge badge-dot badge-dot-xl badge-${item.status}`}> </i>
                    </span>
                    <div className="vertical-timeline-element-content bounce-in">
                        <h4 className="timeline-title">{item.title}</h4>
                        <p>{item.content}</p>
                        <span className="vertical-timeline-element-date">{item.date}</span>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <section className="col center-section h-100">
            <div className="top-bg">
                <div className="top-bg-overlay"></div>
            </div>


            <div className="container-fluid px-5 games-list text-start position-absolute mt-5 roadmap">
                <h3>📜 Roadmap</h3>

                <div className="row d-flex justify-content-center my-5">
                    <div className="col-md-10">
                        <div className="main-card mb-3 card">
                            <div className="card-body">
                                <h5 className="card-title">Project Timeline</h5>
                                <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                    {
                                        roadmap_list.map((item, i) => renderRoadmapItem(item, i))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Roadmap;
