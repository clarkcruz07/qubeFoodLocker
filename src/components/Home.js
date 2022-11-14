import React from 'react'
import {Link} from 'react-router-dom'
const Home = () =>{
    const BGmp4 = './foodlockerBG_1.mp4'
    const dropBtn = './dropBtn.svg'
    const claimBTN = './claimBtn.svg'
    return (
           <div className="container">
            <video autoPlay muted loop id="videoBg">
                <source src={BGmp4} type="video/mp4" />
                
            </video>
                <div className="action-btn">
                    <Link to="/staff"><img src={dropBtn} /></Link>
                    <Link to="/rider"><img src={claimBTN} /></Link>
                </div>
           </div>
    )
}

export default Home