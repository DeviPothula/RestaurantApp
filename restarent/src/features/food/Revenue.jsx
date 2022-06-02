import React from 'react';
import {getItems, post_data,update_data,placedItems} from './foodSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
function Revenue(props)
{
  var tb=0;
  const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(placedItems());
        dispatch(getItems(''));
    },[])
    const Items=useSelector((state)=>{return state.foodReducer.Items});
  const placed_orders=useSelector((state)=>{return state.foodReducer.placed_orders});
    console.log(" I AM FROM REVENUE ITEMS LIST",Items);
    console.log(" I AM FROM REVENUE PLACED ITEMS LIST",placed_orders);
    return(
        <div className='mybox'>
            <div className='navi'>
       <Link to="/Home" className="link">Home</Link>&nbsp;&nbsp;&nbsp;
       <Link to="/" className="link">Login</Link>&nbsp;&nbsp;&nbsp;
       <Link to="/" className="link">Logout</Link>&nbsp;&nbsp;&nbsp;
       <Link to="/Revenue" className="link">Revenue</Link> &nbsp;&nbsp;&nbsp;
       <Link to="/placeoreder" className="link">MyordersList</Link>&nbsp;&nbsp;&nbsp;
       </div>
            {
                
                Items[0].map((p,i)=>{
                    var c=0;
                    return(
                        
                        <div> 
                            {
                                placed_orders[0]?.map((k,i)=>{
                                  
                                    if(p.name===k.name)
                                    {
                                       c=c+k.qun;
                                       tb=tb+k.bill;
                                    }
                                })
                            }
                            <p>Count of {p.name} Ordered: {c}</p>
                            </div>
                    )

                })
            }
            <p>TotalBillingAmount: {tb}</p>
        </div>
    )
}
export default Revenue;
  