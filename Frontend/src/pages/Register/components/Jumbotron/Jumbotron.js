import "./Jumbotron.scss";

function Jumbotron() {
    return (
        <div className={["jumbotron"].join(" ")}>
            <div className="jumbotron-title">Trở thành chủ nhà</div>
            <div className="jumbotron-description">
                Explore yourself and people to provide the better looks about
                your hotel and your services
            </div>
        </div>
    );
}

export default Jumbotron;
