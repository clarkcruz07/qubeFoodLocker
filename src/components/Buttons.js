import React, {useState, useEffect } from 'react'
import grabLogo from '../assets/img/grabFoodMascot.svg'
import foodpandaLogo from '../assets/img/foodPandaMascot.svg'
import jollibeeLogo from '../assets/img/jollibeeMascot.svg'
import { useNavigate, Link} from 'react-router-dom'

export const Buttons = () =>{
    const [disableGrab, setDisableGrab] = useState(false);
    const [disablePanda, setDisablePanda] = useState(false);
    const [disableJollibee, setDisableJollibee] = useState(false);
    
    const getURL = window.location.pathname
       useEffect(() => {
        if(getURL == '/grab'){
            document.getElementById('grab').classList.add('active')
            document.getElementById('foodpanda').classList.add('disable')
            document.getElementById('jollibee').classList.add('disable')
        }
        else if(getURL == '/foodpanda'){
            document.getElementById('grab').classList.add('disable')
            document.getElementById('jollibee').classList.add('disable')
            document.getElementById('foodpanda').classList.add('active')
        }
        else if(getURL == '/jollibee'){
            document.getElementById('grab').classList.add('disable')
            document.getElementById('foodpanda').classList.add('disable')
            document.getElementById('jollibee').classList.add('active')
        }
        else if(getURL == '/grab/opendoor'){
            document.getElementById('grab').classList.add('active')
            document.getElementById('jollibee').classList.add('disable')
            document.getElementById('foodpanda').classList.add('disable')

            document.getElementById('grab').disabled = true
            document.getElementById('grabbtn').style.pointerEvents = "none"

            document.getElementById('foodpanda').disabled = true
            document.getElementById('fpbtn').style.pointerEvents = "none"

            document.getElementById('jollibee').disabled = true
            document.getElementById('jollibeebtn').style.pointerEvents = "none"
        }
        else if(getURL == '/foodpanda/opendoor'){
            document.getElementById('jollibee').classList.add('disable')
            document.getElementById('grab').classList.add('disable')
            document.getElementById('foodpanda').classList.add('active')

            document.getElementById('foodpanda').disabled = true
            document.getElementById('fpbtn').style.pointerEvents = "none"

            document.getElementById('grab').disabled = true
            document.getElementById('grabbtn').style.pointerEvents = "none"

            document.getElementById('jollibee').disabled = true
            document.getElementById('jollibeebtn').style.pointerEvents = "none"
        }
        else if(getURL == '/jollibee/opendoor'){
            document.getElementById('grab').classList.add('disable')
            document.getElementById('foodpanda').classList.add('disable')
            document.getElementById('jollibee').classList.add('active')

            document.getElementById('jollibee').disabled = true
            document.getElementById('jollibeebtn').style.pointerEvents = "none"

            document.getElementById('grab').disabled = true
            document.getElementById('grabbtn').style.pointerEvents = "none"

            document.getElementById('foodpanda').disabled = true
            document.getElementById('fpbtn').style.pointerEvents = "none"
        }
       })
        
            
        
       
    
    return (
        <div className="btn-wrapper">
            <Link to="/grab"><button className='btn btn-grab' id="grab"><img src={grabLogo} alt="Grab Logo" id="grabbtn"/></button></Link>
            <Link to="/foodpanda"><button className="btn btn-foodpanda" id="foodpanda"><img src={foodpandaLogo} alt="Foodpanda Logo" id="fpbtn"/></button></Link>
            <Link to="/jollibee" id="jollibeebtn"><button className="btn btn-jollibee" id="jollibee">Others merchants</button></Link>
           
        </div>
    )
}

export default Buttons