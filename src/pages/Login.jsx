import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Signup } from './Signup'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Authcontext from '../context/Authcontext';

export const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const { user,setUser } = useContext(Authcontext)

    const navigate = useNavigate()

    const loginHandle = async () => {
        try {
            const { data } = await axios.post("http://localhost:4000/user/signin",{
                username,
                password
            })
            setPassword('');
            setUsername('');
            // console.log(data)
            if (data?.success){
              toast(data?.message,{type:'success'})
              setUser(data?.data)
              navigate('/setup')
            }
            else{
              toast(data?.message,{type:'error'})
            }
            // navigate('/setup')
        } catch (error) {
            toast(error.response.data.message,{type:'error'})
        }
    }
  return (
    <div className="w-full">
    <ToastContainer/>
    <h1 className="text-5xl text-center my-10 uppercase text-white font-bold">log in</h1>
    <div className="mx-auto w-[400px] my-10 flex flex-col gap-5">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input type="password" className="grow" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      </label>
      <button className="btn btn-active btn-primary uppercase" onClick={loginHandle}>log in</button>
      <div className='w-full flex flex-row justify-between'>
        <p>Doesn&apos;t have an account</p>
        <Link className='text-blue-500' to={"/signup"}>Create Account</Link>
        {/* <a>Create Account</a> */}
      </div>
    </div>
    </div>
  )
}
