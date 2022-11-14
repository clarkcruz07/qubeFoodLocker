import React, {useState, useEffect} from 'react'
import Header from './Header'
// import jollibee from '../../../assets/img/jollibee.svg';
import jollibee from '../../../assets/img/qubeehead.png';
import foodpandaIco from '../../../assets/img/fpanda.svg';
import {Link} from 'react-router-dom'
import homeIcon from '../../../assets/img/home.svg';
import axios from 'axios'
const FoodPanda = () =>{
    const [pinTxt, setPin] = useState('')
    const [pinDisable, setButton] = useState(true)
   
    const [data, setData] = useState(null);
    const [checkedMethod, setMethod] = useState('')
    let methodVal = ""
   
    const radioRider = () => {
        document.getElementById('chk-rider').click()
        methodVal = document.getElementById('chk-rider').value
        setMethod(methodVal)
    }
    const radioSelf = () => {
        document.getElementById('chk-self').click()
        methodVal = document.getElementById('chk-self').value
        setMethod(methodVal)
    }
    useEffect(() => {
        if(pinTxt.length > 3 && checkedMethod.length > 0) {
            setButton(false)
            document.getElementById('set-pin').classList.remove('disable')
        }
        else{
            setButton(true)
            document.getElementById('set-pin').classList.add('disable')
        }
    })
    return (
           <>
           <Header />
           <div className="container">
                <div className="form-group row">
                    <div id="radio-rider" onClick={radioRider}>
                        <input type="radio" name='radio-pickup' value="Rider Pick-up" id='chk-rider'/>
                        <label>Rider Pick-up</label>
                    </div>
                    <div id="radio-self" onClick={radioSelf}>
                        <input type="radio" name='radio-pickup' value="Self Pick-up" id="chk-self" />
                        <label>Self Pick-up</label>
                    </div>
                    
                </div>  
                <div className="row form-text">
                    <div className='text-img-left text-img-left-fp'>
                        <img src={foodpandaIco} />
                    </div>   
                    <div>
                       <Link to="/foodpanda/opendoor" state={{ order_number: pinTxt, method: checkedMethod }}><button className="btn-pin foodpanda-pin"  disabled={pinDisable} id="set-pin"> Set Pin </button></Link> 
                    </div>                       
                    <input type="text" className="input-number input-number-fp" maxLength='4' onChange={e => setPin(e.target.value)} />
                    
                </div>
                <div className="row">
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
           </>
    )
}

export default FoodPanda