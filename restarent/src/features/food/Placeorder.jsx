import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getItems, post_data,update_data,placedItems,remove,orders_data} from './foodSlice';
import {Link} from 'react-router-dom'
function Placeorder(props)
{
    var [q,setq]=React.useState(0);
    const dispatch = useDispatch();
    const Items=useSelector((state)=>{return state.foodReducer.Items[0]});
    const order_list=useSelector((state)=>{return state.foodReducer.order_list[0]});
    React.useEffect(()=>{
        dispatch(getItems())
        dispatch(orders_data())
    },[])
    console.log("I AM FROM PLACEDORDERS...ITEMS LIST",Items);
    console.log("I AM FROM PLACEDORDERS... ORDRES",order_list);
    return(
        <div >
           <div className='navi'>
       <Link to="/Home" className="link">Home</Link>&nbsp;&nbsp;&nbsp;
       <Link to="/" className="link">Login</Link>&nbsp;&nbsp;&nbsp;
       <Link to="/" className="link">Logout</Link>&nbsp;&nbsp;&nbsp;
       <Link to="/Revenue" className="link">Revenue</Link> &nbsp;&nbsp;&nbsp;
       <Link to="/placeoreder" className="link">MyordersList</Link>&nbsp;&nbsp;&nbsp;
       </div>
       <h3>Hiii {localStorage.getItem("user_name")} Your OrderList.....</h3>
       <div className='m'>
       {
           order_list?.map((p,i)=>{
               
                      if(p.user_name===localStorage.getItem("user_name"))
                      {
                             return(
                                <div class="im">
                                <img src={p.filename} alt="rice" height="200" width="200"></img>
                                
                                    <p>ItemName:{p.name}</p>
                                    <p>ItemPrice:{p.price}</p>
                                    <p>AvlialbleQuantity:{p.avl_q}</p>
                                    <input id="kk" type="number" placeholder='EnterYourQunatity' onChange={(e)=>{setq(e.target.value)}}></input><br></br>
                                    {

                                    }
                                    <p>BillAmount:{p.price*q}</p><br></br>
                                <button className="button" onClick={()=>
                                {
                                 dispatch(post_data({name:p.name,price:p.rice,q:q,bill:p.price*q,user_name:localStorage.getItem("user_name")}));
                                 dispatch(update_data(p._id,p.avl_q-q));
                                 dispatch(remove(p._id));
                                 alert("Payment Successfulll.....");
                                 document.getElementById("kk").value="";
                               }}>Paybill</button>
                                </div>
                             )
                      }
                      
               
           })
       }
       </div>
       </div>
        )      
}
export default Placeorder;