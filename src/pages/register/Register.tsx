/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { registerRoute } from '../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  // const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  localStorage.clear();

  const signIn = async (e: any) => {
    e.preventDefault();

    axios
      .post(registerRoute, {
        name,
        username,
        password,
      })
      .then((response) => {
        const { data } = response;

        if (data.status == false) toast.error(data.msg);
        // console.log(data.status);
        else {
          toast.success(data.msg);
          setName('');
          setPassword('');
          setUsername('');
        }
      })
      .catch((e) => {
        toast.error(e.msg);
        toast.error('Error code 500');
      });

    // toast.success();
  };
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <div
        className='bg-no-repeat bg-cover bg-center relative'
        style={{
          backgroundImage:
            'url(https://plus.unsplash.com/premium_photo-1681487872232-fa622a6dd59e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80)',
        }}
      >
        <div className='absolute  inset-0 z-0'></div>
        <div className='min-h-screen sm:flex gap-8 sm:flex-row mx-0 justify-center'>
          <div className='flex-col flex bg-[#023354] rounded-lg opacity-60 backdrop-blur-lg  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10'>
            <div className='self-start hidden lg:flex flex-col text-white'>
              <img src='' className='mb-3' />
              <h1 className='mb-3 font-bold text-5xl'>Hi ? Welcome Back</h1>
              <p className='pr-3'>
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
                industries for previewing layouts and visual mockups
              </p>
            </div>
          </div>
          <div className='flex justify-center self-center  z-10'>
            <div className='p-12 bg-white mx-auto rounded-2xl w-100 '>
              <div className='mb-4'>
                <h3 className='font-semibold text-2xl text-gray-800'>Sign Up </h3>
              </div>
              <form onSubmit={signIn}>
                <div className='space-y-5'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 tracking-wide'>Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=' w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                      type='text'
                      required
                      placeholder='mail@gmail.com'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 tracking-wide'>
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className=' w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                      type='text'
                      required
                      placeholder='mail@gmail.com'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='mb-5 text-sm font-medium text-gray-700 tracking-wide'>
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                      type='password'
                      required
                      placeholder='Enter your password'
                    />
                  </div>

                  <div>
                    <a href='/chat'>
                      <button
                        type='submit'
                        // onClick={signIn}
                        className='w-full flex justify-center bg-[#1d7ca5]  hover:bg-[#09445d] text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'
                      >
                        Sign up
                      </button>
                    </a>
                  </div>
                </div>
              </form>
              <NavLink to='/'>
                <div className='pt-5 text-center text-gray-400 text-xs'>
                  <span>Sign in</span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
