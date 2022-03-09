import React from "react"
import { withRouter, Link } from 'react-router-dom';
import "./style.css";
function Newsidebar() {

    // const handleSignOut = () => {
    //     localStorage.removeItem("auth-token")
    //     history.push("/")
    // }
    // let username=localStorage.getItem("email").split("@")[0]

    return (
        <>
            <div className="sidebar">
                <div className="logo-details">
                    {/* <i className='bx bxl-c-plus-plus icon'></i> */}
                    {/* <div className="logo_name">Energy App</div> */}
                    {/* <i className='bx bx-menu' id="btn" ></i> */}
                    {/* <img src={Logo} alt="profileImg" /> */}
                </div>
                <ul className="nav-list">
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "https://maxbyte.co/" }} target="_blank">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Home</span>
                        </Link>
                        <span className="tooltip">Home</span>
                    </li>
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "https://maxbyte.co/" }} target="_blank">
                            <i className='bx bx-user' ></i>
                            <span className="links_name">Production</span>
                        </Link>
                        <span className="tooltip">Production</span>
                    </li>
                    <li>
                        {/* <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: `/Maintenance` }}> */}
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "https://maxbyte.co/" }} target="_blank">
                           <i className='bx bx-chat' ></i>
                            <span className="links_name">Maintenance</span>
                        </Link>
                        <span className="tooltip">Maintenance</span>
                    </li>
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "https://maxbyte.co/" }} target="_blank">
                            <i className='bx bx-pie-chart-alt-2' ></i>
                            <span className="links_name">Reports</span>
                        </Link>
                        <span className="tooltip">Reports</span>
                    </li>
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/energy-meter-dashboard">
                            <i className='bx bx-folder' ></i>
                            <span className="links_name">Energy</span>
                        </Link>
                        <span className="tooltip">Energy</span>
                    </li>


                    {/* <li className="profile">
                        <button onClick={() => handleSignOut()} style={{ cursor: "pointer" }}><i className='bx bx-log-out' id="log_out" ></i></button>
                    </li> */}
                </ul>
            </div>
        </>
    )
}

export default React.memo(withRouter(Newsidebar));