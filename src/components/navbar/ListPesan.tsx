/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { getLastMessageByRoomId, getNameByUsername } from '../../utils/APIRoutes';
import moment from 'moment';

// eslint-disable-next-line no-empty-pattern
const ListPesan = (props: any) => {
  // console.log(props.idPesan);

  const [username, setUsername] = useState('');
  const [lastMessage, setLastMessage] = useState('');
  const [timeLastMessage, setTimeLastMessage] = useState<any>('');
  const savedUsername = localStorage.getItem('username');
  const unixTimestampNow = moment().valueOf();

  const getName = async (username: string) => {
    await axios.get(`${getNameByUsername}/${username}`).then((response) => {
      setUsername(response.data.name);
    });
  };

  useEffect(() => {
    const calculateTime = () => {
      const timestamp = props.lastTime;
      const now = moment();
      const timestampMoment = moment(parseInt(timestamp, 10));
      const duration = moment.duration(now.diff(timestampMoment));
      const minutesDiff = duration.asMinutes();
      let formattedDiff;
      if (minutesDiff >= 1440) {
        const daysDiff = Math.ceil(minutesDiff / 1440);
        formattedDiff = `${daysDiff} hari`;
      } else if (minutesDiff >= 60) {
        const hoursDiff = Math.ceil(minutesDiff / 60);
        console.log(Math.ceil(hoursDiff));
      } else {
        formattedDiff = `${Math.ceil(minutesDiff)} menit`;
      }

      setTimeLastMessage(formattedDiff);
    };

    calculateTime();
    const getLastMessage = async () => {
      await axios.get(`${getLastMessageByRoomId}/${props.data._id}`).then((response) => {
        // const timestamp = ObjectId(response.data[0].content).getTimestamp();
        // console.log(response);
        setLastMessage(response.data.messages.content);
      });
    };
    if (props.data._id !== undefined) {
      getLastMessage();
    }
  }, [props.data._id, props.lastTime]);

  return props.data._id == undefined ? (
    ''
  ) : (
    <>
      {/* {props.user.map((data: any) => {
        return <p>data</p>;
      })} */}
      <div className='flex cursor-pointer flex-row items-center p-4 relative'>
        <div className='absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3'>
          {timeLastMessage} lalu
        </div>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100 font-bold flex-shrink-0'>
          {username.charAt(0)}
        </div>
        <div className='flex flex-col flex-grow ml-3'>
          <div className='text-sm font-medium'>
            {/* {JSON.stringify(props.data.users)} */}
            {props.data.users.map((dataConnect: string) => {
              if (dataConnect != savedUsername) {
                getName(dataConnect);
                return username;
              }
            })}
          </div>
          <div className='text-xs truncate w-40'>{lastMessage}</div>
        </div>
        <div className='flex-shrink-0 ml-2 self-end mb-1'>
          {/* <span className='flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full'>
            3
          </span> */}
        </div>
      </div>
    </>
  );
};

export default ListPesan;
