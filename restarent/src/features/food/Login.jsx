import React from 'react'
export default function Login()
{
    var user_details=[{user_name:"devi",pas:"123"},{user_name:"hema",pas:"123"}]
  var [user_name,setusername]=React.useState('');
  var [pas,setpas]=React.useState('');
  var [u,setu]=React.useState();
  window.localStorage.removeItem("user_name");
  function check()
  {
    var f=0;
     user_details.map((u,i)=>{
      
       if(u.user_name===user_name && u.pas===pas)
       {
         f=1;
         localStorage.setItem("user_name",u.user_name);
         
       }
     })
     if(f===1)
     {
        window.location="https://restarent-app-123.herokuapp.com/Home";
        console.log("usernam",u);
     }
     else
     {
      if(f===0 && (user_name!='' && pas!=''))
      {
        alert("Incorrect Details...");
      }
      window.location="https://restarent-app-123.herokuapp.com/";
      
     }
  }
  function validate()
  {
        if(user_name==='' || pas==='')
        {
          alert("EnterUsername and password");
          return false;
        }
        else
        {
          return true;
        }
  }
    return(
      <div>
        <h1>Login Page</h1>
        <div className='login-page'>
      <input className="forminput" type="text" placeholder='EnteryourName' onChange={(e)=>{setusername(e.target.value)}}></input><br></br>
      <input className="forminput" type="text" placeholder='EnteryourPassword' onChange={(e)=>{setpas(e.target.value)}}></input><br></br>
      <button className="formbutton"onClick={()=>{validate();check();}}>Submit</button>
      </div>
        </div>
    )
}