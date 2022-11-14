import React from 'react'
// import jollibee from '../../../assets/img/jollibee.svg';
import jollibee from '../../../assets/img/qubeehead.png';
import Header from './Header'
export const StaffHome = () =>{

    return (
        <div>
        <Header />
        <div className="container">
                   <div className="row">
                    <input type="text" className="input-number" maxLength='10'/>
                </div>
                <div className="row">
                    <h4>How to use Jollibee Smartlockers</h4>
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
           </div>
        </div>
    )
}

export default StaffHome