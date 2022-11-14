import React, {useState, useEffect} from 'react'
import { useLottie } from "lottie-react";
// import jollibee from '../../../assets/img/jollibee.svg';
import jollibee from '../../../assets/img/qubeehead.png';
import lockersFull from '../../../assets/img/lockersFull.svg';
import err from "../../../json/jollibeeError.json";
import homeIcon from '../../../assets/img/home.svg';
import axios from 'axios'
import {Link} from 'react-router-dom'
const StaffMain = () =>{
    const APIUrl = 'http://localhost:3000/DoorStatus'
    const [errorMsg, setError] = useState("")
    let errorCatch = ""
    const fetchData = () => {
        axios
        .get(APIUrl)
        .then((res) => {
            document.getElementById('network-error').classList.add('hidden')
            document.getElementById('header').classList.remove('hidden')
            const countOccupied = res.data.map((i, index) => i.door_status)
            let sum = Number(countOccupied[0]) + Number(countOccupied[1]) + Number(countOccupied[2]) + Number(countOccupied[3])
            //console.log(sum)
           
            if(sum == 0){                
                //setImgError(errorLoad)                 
                document.getElementById('error').classList.remove('hidden')
            }
             else {
                //setImgError("")
                document.getElementById('error').classList.add('hidden')
            }
            
           
        })
        .catch((err) => {
            //document.getElementById('network-error').classList.remove('hidden')            
            // document.getElementById('header').classList.add('hidden')
            setError(err.message)
        })

        
    }
    const options = {
        animationData: err,
        loop: true,
        autoplay: true,
        style: {
            width: 60,
            height: 35,
            position: 'relative',
            top: '-11px',
            transform: 'scale(2)'
        }
    };

    const { View } = useLottie(options);
    useEffect(() => {
        const dataInterval = setInterval(()=> {
           fetchData()
        },1000)
        return () => clearInterval(dataInterval)
    },[])
    
    return (
        <div className="container">
        <h4>
            Drop Service
        </h4>
               <div className="error-img hidden" id="error">
                    <div>{View}</div>
                    <div><h4>Lockers full</h4></div>
               </div>
               <div className="network-error hidden" id="network-error">{View}<h4>{errorMsg}</h4></div>
                
                <div className="row">
                <input type="text" className="input-number input-number-main" maxLength='10' disabled="true"/>
            </div>
            <div className="row" style={{marginBottom: '15px', marginTop: '10px' }}>
                <h4>How to use QUBE Smartlockers</h4>
            </div>
            <div className="row">
                <ol>
                    <li>Select vendor</li>
                    <li>Enter transaction number</li>
                    <li>Add compartment, cancel order or input order in the compartment.</li>
                </ol>
            </div>
            <div className="row row-img">
                <img src={jollibee} className="side-img" />
            </div>            
            <Link to="/"><div className="row home-icon">
                <img src={homeIcon} className="side-img" />
                </div></Link>     
        </div>
    )
}

export default StaffMain