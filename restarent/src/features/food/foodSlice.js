import { createSlice } from '@reduxjs/toolkit';
const foodSlice = createSlice({
    name: 'studentReducer',
    initialState: {
        Items:[],
        placed_orders:[],
        order_list:[],
        filter_list:[],
    },
    reducers: {
      load_Items: (state, action) => {
        console.log(' DATA FROM LOAD_ITEMS......', action.payload);
        state.Items=[];
        state.Items.push(action.payload);
      },
      load_placed_orders:(state, action) => {
        console.log('DATA FROM LOAD_PLACEORDERS......', action.payload);
        state.placed_orders=[];
        state.placed_orders.push(action.payload);
      },
      load_orders:(state, action) => {
        console.log(' DATA FROM LOAD_ORDERS......', action.payload);
        state.order_list=[];
        state.order_list.push(action.payload);
      },
      load_filter:(state,action)=>
      {
           var temp=[...state.Items]
          console.log("DATA FROM LOAD FILTER....",temp)
          if(action.payload==='')
          {

          }
      }
    },
  });
  export function getItems(key) {
    console.log('GETITEMS ... METHOD CALLED.....',key);
    return (dispatch) => {
      fetch('https://backend-resta-app.herokuapp.com/getdata')
        .then((res) => res.json())
        .then((data) => {
          if(key==='')
          {
            dispatch(load_Items(data))
          }
          else
          {
            var temp=data.filter((p,i)=>{
              return p.name.includes(key);
            })
            dispatch(load_Items(temp));
          }
        });
    };
  }
  export function filter_name(key)
  {
    
    return(dispatch)=>{
      dispatch(load_filter(key))
    }
  }
 export function orders_data()
{
    return(dispatch)=>{
        fetch("https://backend-resta-app.herokuapp.com/orders")
        .then(res=>res.json())
        .then(
          data=>{
            dispatch(load_orders(data))
          }
        )
   }

}
export function placedItems()
{
    return(dispatch)=>{
        fetch("https://backend-resta-app.herokuapp.com/placedItems")
        .then(res=>res.json())
        .then(
          data=>{
            dispatch(load_placed_orders(data))
          }
        )
   }

}
export function post_data(obj)
{
  return(dispatch)=>{
    fetch('https://backend-resta-app.herokuapp.com/register', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(()=>{
              dispatch(placedItems())
            })
  }
}

export function update_data(id,q)
{
  return(dispatch)=>{
    console.log("update in action")
    console.log("data is ",q);
    fetch('https://backend-resta-app.herokuapp.com/update/'+id, {
                method: "PUT",
                body: JSON.stringify({q}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(()=>{
              dispatch(getItems())
            })
  }
}
export function order(obj)
{
  return(dispatch)=>{
    fetch('https://backend-resta-app.herokuapp.com/reg', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(()=>{
              dispatch(orders_data())
            })
  }
}
export function remove(id)
{
  return(dispatch)=>{
    fetch(`https://backend-resta-app.herokuapp.com/delete/${id}`, {
    method: 'DELETE',
    })
          .then(()=>{
            dispatch(orders_data())
          })
}
}
export const { load_Items,load_orders,load_placed_orders,load_filter} = foodSlice.actions;
export default foodSlice.reducer;