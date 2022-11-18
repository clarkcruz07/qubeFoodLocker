import React, {useState, useEffect, useRef} from 'react'
import { useLocation,useNavigate, Link } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import { useLottie } from "lottie-react";
import DoorOpen from "../../../json/jollibeeDoorOpen.json";
import TriggerError from "../../../json/jollibeeError.json";
import TriggerLoader from "../../../json/jollibeeLoader.json";
import ThankyouPage from '../../../assets/img/tybanner.svg';
const Doors = () =>{
    const OpenDoor = "../open_default.svg";
    
 const location = useLocation()
 const [listDoors, fetchDoors] = useState([])
 const data = location.state.order_number;
 const APIUrl = 'http://localhost:3000/DoorStatus/'
 const doorURL = 'http://localhost:9090/api/lockercontroller/door/'
 const timestamp = new Date().toLocaleString()
 const navigate = useNavigate()
 const countChar = data.length
 let fullData = ""
 let appended = ""
    const fetchData=()=>{
        axios.get(APIUrl).then((response) =>{
            const servicetypes = response.data.map((x)=> x.serviceType)
            console.log(servicetypes)
            if(data.length == 3){
                appended = "GF-"
                
            }
            else if(data.length == 4){
                appended = "FP-"
            }
            fullData = appended+data
            axios
        .get(APIUrl + '?order_number=' + fullData)
        .then((res) => {  
            const arr = res.data
            const nested = arr.map((i) => i.door_number)
            const transID = arr.map((s) => s.id)
            const timein = arr.map((d) => d.timestamp_in)
            const timeout = new Date().toLocaleString()
            const vendorMethod = arr.map((e)=> e.vendor)
            const servicetype = arr.map((x)=> x.serviceType)
            console.log(timeout)
            const countArr = nested.length
            if(countArr == 0){
                navigate('/rider', {state : {message: 'Invalid Order Number'}})
            }


            if(countArr == 1){
                const dataID = {
                    doorId: nested[0]
                } 
                const api = doorURL+dataID.doorId+'/open'
                axios.get(api).then(res => {
                    
                }).catch(err => { 
                    console.log(err)
                });

                /* update status */
                axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1',

                }).then(resp => {                   
                    
                }).catch(error => {
                    console.log(error);
                });
                /* */

                 /* post to api */
                 axios.post('https://jobee-be.onrender.com/api/admin/add/transaction', {
                    doorNumber: nested[0],
                    orderNumber: fullData,
                    vendor: vendorMethod[0],
                    status: 'Claimed',
                    serviceType: servicetype[0],
                    timeIn : timein[0],
                    timeOut: timeout
                }).then(resp => {
                    /* update status */
                        axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                            status: '',
                            timestamp_out: '',
                            door_status: '1',
                            order_number: '',
                            timestamp_in: '',
                            serviceType: '',
                            vendor: ''
                        }).then(resp => {                   
                            
                        }).catch(error => {
                            console.log(error);
                        });
                        /* */
                }).catch(error => {
                    console.log(error);
                });
                /* */

               
            }
            else if(countArr == 2)
            {              
                
                                        
                
                const dataID = {
                    doorId: nested[0]
                } 
                const api = doorURL+dataID.doorId+'/open'
                axios.get(api).then(res => {

                    const dataID1 = {
                        doorId: nested[1]
                    }    
                    const api1 = doorURL+dataID1.doorId+'/open'
                    axios.get(api1).then(res => {
                        

                    }).catch(err => { 
                        console.log(err)
                    });                

                }).catch(err => { 
                    console.log(err)
                });

                /* update status */
                axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });

                axios.patch('http://localhost:3000/DoorStatus/'+transID[1], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });
                /* */

                 /* post to api */
                 axios.post('https://jobee-be.onrender.com/api/admin/add/transaction', {
                    doorNumber: nested[0] + " , " + nested[1],
                    orderNumber: fullData,
                    vendor: vendorMethod[0],
                    status: 'Claimed',
                    serviceType: servicetype[0],
                    timeIn : timein[0],
                    timeOut: timeout
                }).then(resp => {
                   /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                    /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[1], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                }).catch(error => {
                    console.log(error);
                });
                /* */
                 
            }
            else if(countArr == 3)
            {              
                
                const dataID = {
                    doorId: nested[0]
                } 
                const api = doorURL+dataID.doorId+'/open'
                axios.get(api).then(res => {

                    const dataID1 = {
                        doorId: nested[1]
                    } 
                    const api1 = doorURL+dataID1.doorId+'/open'
                    axios.get(api1).then(res => {
                        
                        const dataID2 = {
                            doorId: nested[2]
                        } 
                        const api2 = doorURL+dataID2.doorId+'/open'
                        axios.get(api2).then(res => {
                            console.log(res.data)
                        }).catch(err => { 
                            console.log(err)
                        });

                    }).catch(err => { 
                        console.log(err)
                    });

                    

                }).catch(err => { 
                    console.log(err)
                });

                /* update status */
                axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });

                axios.patch('http://localhost:3000/DoorStatus/'+transID[1], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });

                axios.patch('http://localhost:3000/DoorStatus/'+transID[2], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });
                /* */

                 /* post to api */
                 axios.post('https://jobee-be.onrender.com/api/admin/add/transaction', {
                    doorNumber: nested[0] + " , " + nested[1] + " , " + nested[2],
                    orderNumber: fullData,
                    vendor: vendorMethod[0],
                    status: 'Claimed',
                    serviceType: servicetype[0],
                    timeIn : timein[0],
                    timeOut: timeout
                }).then(resp => {
                   /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                    /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[1], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                    /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[2], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                }).catch(error => {
                    console.log(error);
                });
                /* */
            }

            else if(countArr == 4)
            {              
                
                const dataID = {
                    doorId: nested[0]
                } 
                const api = doorURL+dataID.doorId+'/open'
                axios.get(api).then(res => {

                    const dataID1 = {
                        doorId: nested[1]
                    } 
                    const api1 = doorURL+dataID1.doorId+'/open'
                    axios.get(api1).then(res => {
                        
                        const dataID2 = {
                            doorId: nested[2]
                        } 
                        const api2 = doorURL+dataID2.doorId+'/open'
                        axios.get(api2).then(res => {
                            const dataID3 = {
                                doorId: nested[3]
                            } 
                            const api3 = doorURL+dataID3.doorId+'/open'
                            axios.get(api3).then(res => {
                                
                            }).catch(err => { 
                                console.log(err)
                            });

                        }).catch(err => { 
                            console.log(err)
                        });
    
                        

                    }).catch(err => { 
                        console.log(err)
                    });

                    

                }).catch(err => { 
                    console.log(err)
                });

                /* update status */
                axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });

                axios.patch('http://localhost:3000/DoorStatus/'+transID[1], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });

                axios.patch('http://localhost:3000/DoorStatus/'+transID[2], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });

                axios.patch('http://localhost:3000/DoorStatus/'+transID[3], {
                    status: 'Claimed',
                    timestamp_out: timestamp,
                    door_status: '1'
                }).then(resp => {

                }).catch(error => {
                    console.log(error);
                });
                /* */

                /* post to api */
                axios.post('https://jobee-be.onrender.com/api/admin/add/transaction', {
                    doorNumber: nested[0] + " , " + nested[1] + " , " + nested[2] + " , " + nested[3],
                    orderNumber: fullData,
                    vendor: vendorMethod[0],
                    status: 'Claimed',
                    serviceType: servicetype[0],
                    timeIn : timein[0],
                    timeOut: timeout
                }).then(resp => {
                   /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[0], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                    /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[1], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                    /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[2], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                    /* update status */
                    axios.patch('http://localhost:3000/DoorStatus/'+transID[3], {
                        status: '',
                        timestamp_out: '',
                        door_status: '1',
                        order_number: '',
                        timestamp_in: '',
                        serviceType: '',
                        vendor: ''
                    }).then(resp => {                   
                        
                    }).catch(error => {
                        console.log(error);
                    });
                    /* */
                }).catch(error => {
                    console.log(error);
                });
                /* */
                 
            }

            fetchDoors(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        
        })
        .catch((err) => {
            
        })

    }
    const options = {
        animationData: DoorOpen,
        loop: true,
        autoplay: true,
        style: {
            height: 360,
            width: 360
        }
    };
    const loader = {
        animationData: TriggerLoader,
        loop: true,
        autoplay: true,
        style: {
            height: 20,
            width: 20
        }
    };
    
    const { View } = useLottie(options);
    const { Loader } = useLottie(loader);

    useEffect(() => {
        fetchData() 
    },[])
    return (
        <>
        <Header />
        <img src={ThankyouPage} className="thankyou-svg"/>
           <div className="container rider">
           
                <div className="door-transition">
                    <img style={{width: '50%', left: '300px!important', paddingLeft: '350px', paddingTop: '5rem'}} src={OpenDoor}/>
                </div>
                <div>
                    
                    <div className="door-opening">
                    {Loader} 
                    <h4>Door &nbsp; &nbsp;
                    {
                    listDoors
                        .map(
                            item => 
                            {                            
                                const doorStats = <div key={item.id}> {item.door_number}, </div>
                               
                                return doorStats
                                
                            }
                        )
                    
                    }
                     &nbsp; &nbsp;open
                    </h4>

                    <Link to="/rider"><button className="btn btn-jollibee">Done</button></Link>
                    </div>
                </div>
            
           </div>
           </>
    )
}

export default Doors