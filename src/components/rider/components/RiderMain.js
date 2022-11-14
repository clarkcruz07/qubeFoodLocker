import React, {useState, useEffect} from 'react'
import LockBtn from '../../../assets/img/pinButton.svg'
import grabIcon from '../../../assets/img/grabInstruction.svg'
import foodpandaIcon from '../../../assets/img/foodpandaInstruction.svg'
import { useLottie } from 'lottie-react'
import jollibeIcon from '../../../assets/img/jollibeeInstruction.svg'
import TriggerError from "../../../json/jollibeeError.json";
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
const RiderMain = () =>{
    const [disableBtn, setDisable] = useState(true)
    const [orderNumber, setOrderNumber] = useState(0) 
    const [passData, setData] = useState('')
    const location = useLocation()
    const [errorMsg, setError] = useState("")

    const APIUrl = 'http://localhost:3000/DoorStatus'
    let data = ""
    if(data != ""){
        data = location.state.message
    }
    

    const fetchData = () => {
        axios
        .get(APIUrl)
        .then((res) => {
            document.getElementById('network-error').classList.add('hidden')          
            document.getElementById('form-input-text').disabled = false
            
        })
        .catch((err) => {
            document.getElementById('network-error').classList.remove('hidden')
            document.getElementById('form-input-text').disabled = true
            setError(err.message)
        })

        
    }
    
    useEffect(() => {
        
        const txtLength = document.getElementById('form-input-text').value
        
        
        if(txtLength > 0){
            setDisable(false)
            document.getElementById('btn-done').classList.remove('disable')

        }
        else{
            setDisable(true)
            document.getElementById('btn-done').classList.add('disable')
        }

        if(data){
            document.getElementById('error').classList.remove('hidden')
        }
        else{
            document.getElementById('error').classList.add('hidden')
        }
        const dataInterval = setInterval(()=> {
            fetchData()
         },1000)
         return () => clearInterval(dataInterval)
    },[])

    const options = {
        animationData: TriggerError,
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
    return (
           <div className="container rider">
                <input type="text" className="input-number"  id="form-input-text" maxLength='8' autoComplete="off" onChange={(e) => setOrderNumber(e.target.value)}/>
                <div className="error-img" id="error">
                    <div>{View}</div>
                    <div><h4>{data}</h4></div>
               </div>
               <div className="network-error hidden" id="network-error">{View}<h4>{errorMsg}</h4></div>
                <Link to="doors" state={{ order_number: orderNumber }}><button className="btn-pin disable" id="btn-done" disabled={disableBtn}><img src={LockBtn} id="btn-setPin" /></button></Link>
                <div className="row header"><h4>How to use QUBE Smartlockers</h4></div>
                <div className="row vendor">                    
                    <div><img src={grabIcon} /></div>
                    <div><img src={foodpandaIcon} /></div>
                    {/* <div><img src={jollibeIcon} /></div> */}
                </div>
           </div>
    )
}

export default RiderMain