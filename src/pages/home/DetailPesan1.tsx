/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import notifSound from '../../assets/mixkit-confirmation-tone-2867.wav';
import axios from 'axios';
import { getNameByUsername, getPesanByRoomId } from '../../utils/APIRoutes';
import moment from 'moment';

const socket = io('http://localhost:3000');

const DetailPesan = (props: any) => {
  // const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const savedUsername = localStorage.getItem('username');
  const savedName = localStorage.getItem('name');
  const savedId = localStorage.getItem('_id');
  const [messages, setMessages] = useState<any>(null);
  const [inputPesan, setInputPesan] = useState(' ');
  const [username, setUsername] = useState(' ');
  const mapListRef = useRef<HTMLDivElement>(null);
  // console.log(props.chatId);

  function playAudio() {
    const audio = new Audio(notifSound);
    audio.play();
  }

  const getName = async (username: string) => {
    await axios.get(`${getNameByUsername}/${username}`).then((response) => {
      setUsername(response.data.name);
    });
  };

  useEffect(() => {
    if (props.idRoom != '') {
      socket.emit('joinRoom', props.idRoom);
      axios
        .get(`${getPesanByRoomId}/${props.idRoom}`)
        .then((data) => {
          setMessages(data.data);
        })
        .catch(() => null);
    }

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
      if (message.sender.username != savedUsername) {
        playAudio();
      }
      // setMessages(message]);
    });

    return () => {
      socket.off('receiveMessage');
      // Clean up: leave room and remove message listener
      if (props.idRoom != '') {
        socket.emit('leaveRoom', props.idRoom);
      }
      // socket.disconnect();
    };
  }, [props.idRoom, props.usersRoom, savedUsername]);

  const handleSendMessage = () => {
    const id = props.idRoom;

    const message = {
      roomId: id,
      message: {
        sender: savedId,
        content: inputPesan, // Replace with your message content
      },
      time: moment().valueOf(),
      username: savedUsername,
    };

    socket.emit('sendMessage', message);
    setInputPesan('');
  };

  const handleButtonClick = () => {
    // Scroll ke elemen map list
    mapListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const sendAction = () => {
    handleSendMessage();
    handleButtonClick();
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      sendAction();
    }
  };
  return (
    <>
      {messages == null ? (
        <div
          className='flex bg-cover flex-col h-full w-full backdrop-blur-xl  px-4 py-6'
          style={{
            backgroundImage:
              'url(https://plus.unsplash.com/premium_photo-1681487872232-fa622a6dd59e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80)',
          }}
        >
          {/* <p className='bg-white m-auto text-4xl font-bold font-sans'>Welcome</p> */}
        </div>
      ) : (
        <>
          {/* {messages._id = props.chatId ? (
            ''
          ) : ( */}
          <div className='flex flex-col h-full w-full bg-white px-4 py-6'>
            <div className='flex flex-row items-center py-4 px-6 rounded-2xl shadow'>
              <div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100'>
                {username.charAt(0)}
              </div>
              <div className='flex flex-col ml-3'>
                <div className='font-semibold text-sm'>
                  {props.usersRoom.map((data: string) => {
                    if (data != savedUsername) {
                      getName(data);
                      return username;
                    }
                  })}
                </div>
                {/* <div className='text-xs text-gray-500'>Active</div> */}
              </div>
              <div className='ml-auto'>
                <ul className='flex flex-row items-center space-x-2'>
                  <li>
                    <a
                      href='#'
                      className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full'
                    >
                      <span>
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          stroke='none'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full'
                    >
                      <span>
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          stroke='none'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full'
                    >
                      <span>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='h-full overflow-hidden scrollbar-none py-4'>
              <div
                className='h-full overflow-y-auto'
                id='scrollableDiv'
                style={{
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                }}
              >
                <div ref={mapListRef} className='grid grid-cols-12 gap-y-2'>
                  {/* {JSON.stringify(messages)} */}
                  {messages.map((pesanItem: any, pesanIndex: number) => {
                    if (pesanItem.sender.username === savedUsername) {
                      // return from me
                      return (
                        <div
                          key={pesanItem.content + pesanIndex}
                          className='col-start-6 col-end-13 p-3 rounded-lg'
                        >
                          <div className='flex items-center justify-start flex-row-reverse'>
                            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 text-indigo-100 flex-shrink-0'>
                              {savedName?.charAt(0)}
                            </div>
                            <div className='relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl'>
                              <div>{pesanItem.content}</div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      // return for client
                      return (
                        <div
                          key={pesanItem.content + pesanIndex}
                          className='col-start-1 col-end-8 p-3 rounded-lg'
                        >
                          <div className='flex flex-row items-center'>
                            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100 flex-shrink-0'>
                              {username.charAt(0)}
                            </div>
                            <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                              <div>{pesanItem.content}</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                  <div ref={mapListRef} />
                </div>
              </div>
            </div>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row items-center w-full border rounded-3xl h-12 px-2'>
                <button className='flex items-center justify-center h-10 w-10 text-gray-400 ml-1'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                    ></path>
                  </svg>
                </button>
                <div className='w-full'>
                  <input
                    type='text'
                    onKeyDown={handleKeyPress}
                    value={inputPesan}
                    onChange={(e) => setInputPesan(e.target.value)}
                    className='border border-transparent w-full focus:outline-none text-sm h-10 flex items-center'
                    placeholder='Type your message....'
                  />
                </div>
                <div className='flex flex-row'>
                  <button className='flex items-center justify-center h-10 w-8 text-gray-400'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                      ></path>
                    </svg>
                  </button>
                  <button className='flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* send */}
              <div className='ml-6'>
                <button
                  onClick={sendAction}
                  className='flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300  text-white'
                >
                  <svg
                    className='w-5 h-5 transform rotate-90 -mr-px'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default DetailPesan;
