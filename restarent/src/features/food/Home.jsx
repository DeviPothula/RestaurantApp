import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems,order,filter_name} from './foodSlice';
import {Link} from 'react-router-dom';
function Home(props) {
    const dispatch = useDispatch();
    React.useEffect(()=>{
       dispatch(getItems(''))
    },[])
    const Items=useSelector((state)=>{return state.foodReducer.Items[0]});
   return (
     <div className="App">
       <div className='navi'>
        <Link to="/Home" className="link">Home</Link>&nbsp;&nbsp;&nbsp;
        {/* <Link to="/Menu" className="link">Menu</Link>&nbsp;&nbsp;&nbsp; */}
        <Link to="/" className="link">Login</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/" className="link">Logout</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Revenue" className="link">Revenue</Link> &nbsp;&nbsp;&nbsp;
        <Link to="/placeoreder" className="link">MyordersList</Link>&nbsp;&nbsp;&nbsp;
        </div><br></br>
        WhatToEat: <input type="text" placeholder='SearchHere' onChange={(e)=>{dispatch(getItems(e.target.value))}}></input>
        <div className='m'>
          {
            Items?.map((p,i)=>{
              return(
               <div class="im">
               <img src={p.filename} alt="rice" height="200" width="200"></img>
               <p>{p.name}</p>
               <p>Price:{p.price}</p>
                <button className="button" onClick={()=>{dispatch(order({user_name:localStorage.getItem('user_name'),name:p.name,price:p.price,avl_q:p.avl_q,filename:p.filename}));
               alert("Added Successfully...")}}>Add</button>
               </div>
              )
            })
          }
        </div>
     </div>
   );
 }
 export default Home;