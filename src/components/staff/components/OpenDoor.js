import React,{useState, useEffect} from 'react'
import Header from './Header'
// import jollibee from '../../../assets/img/jollibee.svg';
import jollibee from '../../../assets/img/qubeehead.png';
import axios from 'axios'
import {v4 as uid} from 'uuid'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import { useLottie } from "lottie-react";
import TriggerLoader from "../../../json/jollibeeLoader.json";

const OpenDoor = () =>{
    const [dataID, setData] = useState(null)
    const [doorStatusSet, setDoorStatusSet] = useState(0)
    const [orderNumberSet, setOrderNumber] = useState(0)
    const [doorImage, setImgDoor] = useState("")
    const [changeDoorStatus, setChangeDoorStatus] = useState("")
    const [disableBtn, setDisable] = useState(true)
    const [listDoors, fetchDoors] = useState([])
    const location = useLocation()
    const navigate = useNavigate();

    const [count, setCount] = useState(0);

    
    const data = location.state.order_number;
    const method = location.state?.method;
    console.log(data)
    const openDoor = '/open_default.svg'
    const closeDoor = '/free_default.svg'
    const occupiedDoor = '/occupied_default.svg'
    const APIUrl = 'http://localhost:3000/DoorStatus'
    const doorURL = 'http://localhost:9090/api/lockercontroller/door/'
    const url = window.location.pathname
    let vendorMethod = ""
    let addedNumber = ""
    let endNumber = ""
    if(url == '/grab/opendoor'){
        vendorMethod = 'Grab'
        addedNumber = 'GF-'        
        
    }
    else if(url == '/foodpanda/opendoor'){
        vendorMethod = 'Foodpanda'
        addedNumber = 'FP-'
    }
    else if(url == '/jollibee/opendoor'){
        vendorMethod = 'Jollibee'
        addedNumber = ""
    }
    const fetchData = () => {
        
        axios
        .get(APIUrl)
        .then((res) => {
            
            fetchDoors(res.data)
           
        })
        .catch((err) => {
            console.log(err)
        })
    }
   
    const postData = ( val, status, ordernumber,uuid, doorstatus) => () => {
        const timestamp_in = new Date().toLocaleString()
        
        setChangeDoorStatus(status)
        if(status == 0){
            status = 1
            
        }
        else if(status == 1){
            status = 0
        }
        const dataID = {
            doorId: val
        } 
            const api = doorURL+dataID.doorId+'/open'
            


            axios.get(api).then(res => {
                setData(res.data)
                setDisable(false)
           
                /* update door */
                
                axios.patch('http://localhost:3000/DoorStatus/'+uuid, {
                    order_number: addedNumber + data,
                    door_status: status,
                    timestamp_in: timestamp_in,
                    status: 'Pending',
                    serviceType: method,
                    vendor: vendorMethod,

                }).then(resp => {
                    console.log(resp.data);
                    fetchData()
                }).catch(error => {
                    console.log(error);
                });

                /* */
                document.getElementById('btn-done').classList.remove('disable')
            }).catch(err => { 
                console.log(err)
            });
            //console.log(val + " " + status + " " + ordernumber)
            
    }
    useEffect(() => {
        fetchData() 
       
    },[])
    const options = {
        animationData: TriggerLoader,
        loop: true,
        autoplay: true,
        style: {
            height: 20,
            width: 20
        }
    };
    
    const { View } = useLottie(options);
    return (
        <div className="container">
            <Header />
            <div className="pin-set"><h4> PIN Set: {data}</h4></div> 
            <div className="window">
                {
                listDoors
                    .map(
                        item => 
                        {
                            const doorStats = ''
                            const doorNumber = item.door_number
                            if(item.door_status =='1'){
                                const doorStats = <div key={item.id}><img src={closeDoor} onClick={postData(doorNumber, item.door_status, item.order_number, item.id, closeDoor)} className="door-status"/>
                                <input type="hidden" value={changeDoorStatus} onChange={(e) => setDoorStatusSet(e.target.value)}/></div>
                                return doorStats
                            }
                            else if(item.door_status =='0'){
                                const doorStats = <div key={item.id}><img src={occupiedDoor}  className="door-status"/>
                                <input type="hidden" value={changeDoorStatus} onChange={(e) => setDoorStatusSet(e.target.value)}/></div>
                                return doorStats
                            }
                            return doorStats
                        }
                    )
                    
                }
               </div>
               <div className="btn-set"><Link to="/staff"> <button className="btn btn-jollibee disable" id="btn-done" disabled={disableBtn}>Done</button></Link></div>
              
            
            <div className="row row-img">
                <img src={jollibee} className="side-img" />
            </div>   
        </div>
    )
}

export default OpenDoor