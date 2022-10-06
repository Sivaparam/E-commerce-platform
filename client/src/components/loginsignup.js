
import React,{useState} from 'react'
​
export default function Login({login,error}) {
    const [details,setDetails]=useState({name:"", email:"", password:""});
​
    const formSubmit = e =>{
        e.preventDefault();
        login(details);
    }
  return (
   <form onSubmit={formSubmit}>
    <div className='form-inside'>
        <h2>Login</h2>
        <div className='form-group'>
            <label htmlFor='Name'>Name:</label>
            <input type="text" name="name" id="name" onChange={e=> setDetails({...details,name:e.target.value})} value={details.name}></input>
        </div>
         <div className='form-group'>
            <label htmlFor='Email'>Email:</label>
            <input type="email" name="email" id="email" onChange={e=> setDetails({...details,email:e.target.value})} value={details.email} ></input>
        </div>
         <div className='form-group'>
            <label htmlFor='Password'>Password:</label>
            <input type="password" name="password" id="password" onChange={e=> setDetails({...details,password:e.target.value})} value={details.password}></input>
        </div>
        <input type="submit" value="LOGIN"></input>
    </div>
   </form>
  )
}