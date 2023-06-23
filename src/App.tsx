/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import ListPesan from './components/navbar/ListPesan';
import Side from './components/navbar/Side';
import Pesan from './pages/home/Pesan';
import io from 'socket.io-client';
import axios from 'axios';
import { receivedRoomsByUsername } from './utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import DetailPesan from './pages/home/DetailPesan1';
// import moment from 'moment';

const socket = io('http://localhost:3000');

function App() {
  const savedUsername = localStorage.getItem('username');
  const [messages, setMessages] = useState<any>([]);
  const [idRoom, setIdRoom] = useState<string>('');
  const [usersRoom, setUsersRoom] = useState<any>([]);
  const navigate = useNavigate();

  const sortDataByTimestamp = (messages: any) => {
    const sortedData = [...messages].sort((b, a) => a.lastUpdate - b.lastUpdate);
    return sortedData;
  };

  useEffect(() => {
    if (savedUsername == null) {
      navigate('/');
    }
    axios.get(`${receivedRoomsByUsername}/${savedUsername}`).then((data) => {
      setMessages(sortDataByTimestamp(data.data));
    });
    socket.on('updateListRoom', (receivedMessages) => {
      setMessages((prevMessages: any) => sortDataByTimestamp([...prevMessages, receivedMessages]));
      // console.log(messages);
    });
    return () => {
      socket.off('updateListRoom');
      // socket.disconnect();
    };
  }, [messages, navigate, savedUsername]);

  return (
    <>
      {/* <button onClick={handleSuccessToast}>Show Success Toast</button> */}
      <div className='flex flex-row h-screen antialiased text-gray-800'>
        <div className='flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4'>
          <Side />
          <Pesan>
            {messages.map((data: any) => {
              return (
                <div
                  key={`${data._id}${data.lastUpdate}`}
                  onClick={() => {
                    setIdRoom(data._id);
                    setUsersRoom(data.users);
                  }}
                >
                  <ListPesan data={data} lastTime={data.lastUpdate} />
                </div>
              );
            })}
          </Pesan>
        </div>
        <DetailPesan idRoom={idRoom} usersRoom={usersRoom} />
      </div>
    </>
  );
}

export default App;
