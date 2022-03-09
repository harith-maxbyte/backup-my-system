import './Maintenance.css';

const Maintenance = () => {
    return (
        <>
            <div className="myIframe">
                <iframe
                    title="Operator"
                    src="http://184.73.50.107:5252/Dashboard?LoginName=Operator"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    )
}

export default Maintenance;