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
import { doc, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

function Home(props)
{
    const [{user},dispatch] = useStateValue();
    const [expenses,setExpenses] = useState([]);
    const [friendName,setFriendName] = useState("");
    const [amount,setAmount] = useState("");
    const [docId,setDocId] = useState("");
    const [cnt,setCnt] = useState(0);
    const [expType,setExpType] = useState("You paid, split equally");
    const [totalAmount,setTotalAmount] = useState("");
    const [headerString,setHeaderString] = useState("");
    const [headerColor,setHeaderColor] = useState({color: "green"});
    const [userAlreadyExists,setUserAlreadyExists] = useState(0);

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
        db.collection('friends')
        .get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            setExpenses([]);
            var temp_total = 0;
            querySnapshot.forEach(element => {
                var data = element.data();
                setExpenses(arr => [...arr , data]);
                if(data.netAmount.length>0)
                {
                    // console.log(data.netAmount);
                    temp_total=temp_total + parseInt(data.netAmount);
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
        });
    }

    useEffect(() => {
            renderData();
            // var tmp_expenses = expenses;

            // tmp_expenses.sort((a,b) => (b.timestamp - a.timestamp));
            // setExpenses(tmp_expenses);
            // console.log(tmp_expenses);
    },[])

    useEffect(() => {      // this works as a callback function for setCnt
        db.collection("friends").doc(String(cnt)).set({
            name: friendName, 
            netAmount: amount,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // db.collection('friends').doc(String(cnt)).collection('expenses').add({
        //     id: 1,
        //     expense: amount
        // });
        // const docRef = doc(db, "users", exp);
        // const docSnap = getDoc(docRef);

        // console.log(docSnap.data());
        // setDocId(() => db.collection("users").doc().get().then(snap => {size  = snap.size }));
        // console.log(exp);
        // window.location.reload();
        renderData();

        setFriendName("");
        setAmount("");
        // var tmp_expenses = expenses;

        // tmp_expenses.sort((a,b) => (b.timestamp - a.timestamp));
        // setExpenses(tmp_expenses);
        // console.log("==");
        // console.log(tmp_expenses);
    },[cnt])
        //   .onSnapshot(snapshot => (
        //     setExpenses(snapshot.docs.map((doc) => doc.data()))
        //   ))
        // })
    
        // console.log(expenses);

    const sendExp = (event) => {
        event.preventDefault();
        if(friendName.length==0 || amount.length==0)
            alert("Enter a valid name and amount!");
        
        // console.log(exp);

        // console.log("You typed --> ", exp);
        
        // console.log(expenses.length);

        else
        {   
            /*FOR UPDATE */

            // db.collection('friends')
            // .get().then((querySnapshot) => {
            // // Loop through the data and store
            // // it in array to display
            //     querySnapshot.forEach(element => {    
            //         var data = element.data();
            //         if(data.name.toLowerCase()==friendName)
            //         {
            //             setUserAlreadyExists(1);
            //             var tmp_netAmount = parseInt(data.netAmount);
            //             tmp_netAmount = tmp_netAmount + parseInt(amount);
            //             console.log("--");
            //             console.log(tmp_netAmount);
            //             console.log(data.netAmount);
            //             db.collection("friends").doc(element.id).update({
            //                 netAmount: tmp_netAmount.toString()
            //             });
            //             console.log("==");
            //             console.log(tmp_netAmount);
            //             console.log(data.netAmount);
            //         }            
                    
            //     });
            // });

            // renderData();

            // if(!userAlreadyExists)
            /* FOR UPDATE */
                setCnt(expenses.length + 1);
        }
        // console.log(cnt);
        // setCnt(cnt+1);
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
                                <td style= {data.netAmount>0 ? {color: "green"} : {color: "red"}}>
                                    {data.netAmount}
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