import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Side = () => {
  const navigate = useNavigate();
  const signOut = () => {
    sessionStorage.clear();
    socket.disconnect();
    navigate('/');
  };
  return (
    <>
      <div className='flex flex-col items-center py-4 flex-shrink-0 w-20 bg-indigo-800 rounded-3xl'>
        <a
          href='#'
          className='flex items-center justify-center h-12 w-12 bg-indigo-100 text-indigo-800 rounded-full'
        >
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
            ></path>
          </svg>
        </a>
        <ul className='flex flex-col space-y-2 mt-12'>
          <li>
            <a href='#' className='flex items-center'>
              <span className='flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  ></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a href='#' className='flex items-center'>
              <span className='flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  ></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a href='#' className='flex items-center'>
              <span className='flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  ></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a href='#' className='flex items-center'>
              <span className='flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  ></path>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  ></path>
                </svg>
              </span>
            </a>
          </li>
        </ul>
        <button
          onClick={signOut}
          className='mt-auto flex items-center justify-center hover:text-red-400 text-indigo-100 h-10 w-10'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.5 12L17 12' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M14.5 9L17 12' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M14.5 15L17 12' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path
              d='M17 17C17 19.2091 15.2091 20 13 20H10C7.79086 20 6 18.2091 6 16V8C6 5.79086 7.79086 4 10 4H13C15.2091 4 17 4.79086 17 7'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Side;
