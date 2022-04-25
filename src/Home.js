import React, {useState, useEffect} from "react";
import "./Home.css";
import {Avatar, TextField, Menu, MenuItem} from "@material-ui/core";
import { useStateValue } from './StateProvider';
import Login from "./Login.js";
import { Link,useNavigate } from "react-router-dom";
import {BrowserRouter as Router,Routes,Switch,Route} from "react-router-dom";
import Footer from "./Footer.js"
import Header from "./Header";
import db from './firebase';
import { collection, doc, getDoc, getDocs, } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getDatabase, ref } from "firebase/database"
import { ref as sRef } from 'firebase/storage';
import { get, query, onValue } from "firebase/database"
// import express from "express";
// import mongoose from 'mongoose';
const timeout=100;

function Home(props)
{
    const [{user},dispatch] = useStateValue();
    const [expenses,setExpenses] = useState([]);
    const [friends,setFriends] = useState([]);
    const [friendName,setFriendName] = useState("");
    const [amount,setAmount] = useState("");
    const [docId,setDocId] = useState("");
    const [cnt,setCnt] = useState(1);
    const [expType,setExpType] = useState("You paid, split equally");
    const [totalAmount,setTotalAmount] = useState("");
    const [headerString,setHeaderString] = useState("");
    const [headerColor,setHeaderColor] = useState({color: "green"});
    const [userAlreadyExists,setUserAlreadyExists] = useState(0);


    var flag_exist=0;
    var update_flag=0;
    var create_flag=0;
    var flag_count=1;
    // const navigate = useNavigate();
    // function logout(){
    //    return (
    // <Router>
    //     <Routes>
    //         <Route path="/" element={<Login/>}/>
    //     </Routes>
    //  </Router>
    //    )

    // };
    function renderData() {
        db.collection('user_final')
        .get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            setExpenses([]);
            // setFriends([]);
            var temp_total = 0;
            querySnapshot.forEach(element => {
                var data = element.data();
                setFriends(arr => [...arr, data]);
                flag_count=flag_count+1;
                if(user.displayName.toLowerCase()==data.name.toLowerCase())
                {   
                    // setExpenses(arr => [...arr , data]);
                    // var tmp_expenses_data = data.expenses;
                    // console.log(tmp_expenses_data);
                    data.expenses.map(e => {
                        if(e.amt!="0")
                        {
                            setExpenses(arr => [...arr , e]);
                            if(e.amt.length>0)
                            {
                                // console.log(data.netAmount);
                                temp_total=temp_total + parseFloat(e.amt);
                            }
                        }
                    });
                }
            });
            if(temp_total<0)
            {
                setHeaderString("You owe ");
                setHeaderColor({color: "red"});
                setTotalAmount("₹" + Math.abs(temp_total).toString());
            }
            else if(temp_total>0)
            {
                setHeaderString("You are owed ");
                setHeaderColor({color: "green"});
                setTotalAmount("₹" + temp_total.toString());
            }
            else
            {
                setHeaderString("You are all settled up");
                setHeaderColor({color: "grey"});
                setTotalAmount("");
            }
            setCnt(friends.length+1);
            flag_count=flag_count+1;
        });

    }

    useEffect(() => {
            renderData();
    },[])


    function add_new_entry_xy(frnd_x,frnd_y,local_amt)
    {
        db.collection('user_final')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(element => {    
                var data = element.data();
                
                if(data.name.toLowerCase()==frnd_x.toLowerCase())
                {
                    db.collection("user_final").doc(element.id).update({
                        expenses : [...data.expenses, {name: frnd_y.toLowerCase(), amt: local_amt}]
                    });

                    return;
                }           
            });
        });
    }

    function update_or_add_both_sides(frnd_x,frnd_y,local_amt)
    {

        db.collection('user_final')
            .get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
                querySnapshot.forEach(element => {    
                    var data = element.data();
                    
                    if(data.name.toLowerCase()==frnd_x.toLowerCase())
                    {
                        update_flag=0;
                        data.expenses.map(e => {
                            if(e.name.toLowerCase() == frnd_y.toLowerCase())
                            {
                                update_flag=1;
                                var tmp_local_amt = parseFloat(e.amt);
                                tmp_local_amt = tmp_local_amt + parseFloat(local_amt);
                                e.amt = tmp_local_amt.toString();
                                db.collection("user_final").doc(element.id).update({
                                    expenses : data.expenses
                                });

                                return;
                            }
                        });
                        
                        setTimeout(()=>{
                            if(!update_flag)
                            {
                                add_new_entry_xy(frnd_x,frnd_y,local_amt);
                            }
                        },timeout);
                    }            
                    
                });

            });
    }

    function check_if_user_exists_or_create_it(user_x) 
    {
        db.collection('user_final')
        .get().then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
            create_flag=0;
            querySnapshot.forEach(element => {    
                var data = element.data();
                
                if(data.name.toLowerCase()==user_x.toLowerCase())
                {
                    console.log("found");
                    console.log(user_x);
                    create_flag=1;    
                    return ;     
                }            
                
            });

            setTimeout(()=>{
                if(!create_flag)
                {
                    console.log("-*-*-");
                    console.log(user_x);
                    var tstmp = new Date();
                    db.collection("user_final").doc(String(tstmp.getTime())).set({
                        name: user_x.toLowerCase(), 
                        netAmount: 0,
                        expenses : []
                    });
                    
                }
            },timeout);
            renderData();

        });
    }

    const sendExp = (event) => {
        event.preventDefault();
        if(friendName.length==0 || amount.length==0 || amount=="0")
            alert("Enter a valid name or amount!");

        else
        {
            var type1="You paid, split equally";
            var type2="You are owed the full amount";
            var type3=`${friendName} paid, split equally`;
            var type4=`${friendName} is owed the full amount`;
            var temp_amount = amount;
            if(expType==type1)
            {
                temp_amount= ((parseFloat(amount)/2).toString());
            }
            else if(expType==type2)
            {
                temp_amount=(amount);
            }
            else if(expType==type3)
            {
                temp_amount= ((-1*parseFloat(amount)/2).toString());
            }
            else if(expType==type4)
            {
                temp_amount= ((-1*parseFloat(amount)).toString());
            }
            else
            {
                alert("Invalid split type!");
            }

            check_if_user_exists_or_create_it(user.displayName); 

            setTimeout(() => {
                update_or_add_both_sides(user.displayName,friendName,temp_amount);
                setTimeout(() => {
                    check_if_user_exists_or_create_it(friendName);
                    setTimeout(() => {
                        update_or_add_both_sides(friendName,user.displayName,((-1*parseFloat(temp_amount))).toString());
                        setFriendName("");
                        setAmount("");    
                    },timeout*5);
                    
                },timeout*5);

            },timeout*5);

           setTimeout(renderData,20*timeout);
        }
       renderData();
    };
    return (
       <div> 
        <Header name={props.name} profile={props.profile}/>
        <div className="for__flex">

        <div className="home__body1">
            <form>
                <TextField 
                    label="Name" 
                    variant="standard"
                    value={friendName} 
                    onChange={(event) => setFriendName(event.target.value)} 
                    style= {{marginTop: "10px"}} />

                <TextField 
                    label="Amount" 
                    variant="standard"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)} 
                    style= {{marginTop: "10px"}} />

                <div class="dropdown" style= {{marginTop: "10px"}}>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {expType}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button" onClick={() => setExpType("You paid, split equally")}>You paid, split equally</button>
                        <button class="dropdown-item" type="button" onClick={() => setExpType("You are owed the full amount")}>You are owed the full amount</button>
                        <button class="dropdown-item" type="button" onClick={() => setExpType(`${friendName} paid, split equally`)}>{friendName} paid, split equally</button>
                        <button class="dropdown-item" type="button" onClick={() => setExpType(`${friendName} is owed the full amount`)}>{friendName} is owed the full amount</button>
                    </div>
                </div>
                <button onClick={sendExp} className="btn btn-primary" type="submit" style= {{marginTop: "10px"}}>Add expense</button>
            </form>
        </div>

            <div className="home__body2">
                <h3 className="net__balance" style= {headerColor}>
                    {headerString} {totalAmount} 
                    {/* {
                        (totalAmount!=0)
                        ? ₹{Math.abs(totalAmount)}
                    } */}
                </h3>
                
                {/* <p>
                {
                    expenses.map((data) => (    
                        <Frame data={data}/>
                    ))
                }
                </p> */}

                <table className="table table-bordered">
                    {
                        expenses.filter((data) => data.name.length>0).map((data) => {
                            
                            return(
                            <tr>
                                <td>
                                    {data.name}
                                </td>
                                <td style= {data.amt>0 ? {color: "green"} : {color: "red"}}>
                                    {data.amt}
                                </td>
                            </tr>
                            )
                            {/* console.log(expenses);
                            <Frame name={data.name} netAmount={data.netAmount}/> */}
                        })
                    }
                </table>
            </div>

            <div className="home__body3">
            </div>

        </div>

        <Footer />
        </div>
    );
}

const Frame = ({x}) => {
    // console.log(course + " " + name + " " + age);
    return (
        
        <div>
            <p>
                {x}
            </p>
            {/* <tr>
                <td>
                    {name}
                </td>
                <td>
                    {netAmount}
                </td>
            </tr> */}
        </div>
    );
}

export default Home;    