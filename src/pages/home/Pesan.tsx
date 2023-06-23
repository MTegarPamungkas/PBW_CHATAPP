/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  CardFooter,
  Button,
} from '@material-tailwind/react';
import axios from 'axios';
import { FC, useState } from 'react';
import { createRoom, searchUserRoute } from '../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ComponentProps {
  children: React.ReactNode;
}

const Pesan: FC<ComponentProps> = ({ children }) => {
  const savedUsername = localStorage.getItem('username');
  const savedName = localStorage.getItem('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== '') {
      axios
        .get(`${searchUserRoute}?username=${searchTerm}`)
        .then((response) => {
          const searchData = response.data;
          const exactMatch = searchData.find(
            (user: { username: any }) => user.username === searchTerm,
          );
          setSearchResults(exactMatch ? exactMatch : null);
        })
        .catch((error) => {
          console.error('Error during search:', error);
          setSearchResults(null);
        });
    } else {
      setSearchResults(null);
    }
  };

  const handleAddRoom = () => {
    if (searchResults) {
      setSearchTerm('');
      setSearchResults(false);
      axios
        .post(createRoom, {
          name: 'Room',
          users: [savedUsername, searchResults.username],
        })
        .then(() => {
          // console.log('Room added:', response.data);
          toast.success('Room berhasil dibuat');
          // Lakukan sesuatu setelah room berhasil ditambahkan, seperti mengupdate state atau melakukan navigasi ke halaman baru
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.warning(
              'Oops! Sepertinya Anda sudah memiliki percakapan dengan pengguna tersebut.',
            );
          } else {
            console.error('Error while adding room:', error);
          }
        });
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center'>
            <div className='text-xl font-semibold'>{savedName}</div>
            {/* <div className='flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium'>
              5
            </div> */}
          </div>
          <div className='ml-auto'>
            <button className='flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full'>
              <svg
                className='w-4 h-4 stroke-current'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className='mt-5'>
          <div className='text-xs text-gray-400 font-semibold uppercase'>Personal</div>
        </div>
        <div className='h-full overflow-hidden relative pt-2'>
          <div className='flex flex-col divide-y h-full overflow-y-auto -mx-4'>
            {/* LIST PESAN*/}

            {children}

            {/* LIST PESAN*/}
          </div>
          <div className='absolute bottom-0 right-0 mr-2'>
            <button
              onClick={handleOpen}
              className='flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full'
            >
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
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Dialog size='xs' open={open} handler={handleOpen} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full max-w-[24rem]'>
          <CardHeader variant='gradient' color='blue' className='mb-4 grid h-28 place-items-center'>
            <Typography variant='h3' color='white'>
              Buat Pesan
            </Typography>
          </CardHeader>
          <CardBody className='flex flex-col gap-4'>
            <Input label='username' value={searchTerm} onChange={handleSearchChange} size='lg' />
            {searchResults ? (
              <>
                <Input label='Name' readOnly value={searchResults.name} size='lg' />
              </>
            ) : (
              <p>No user found.</p>
            )}
          </CardBody>
          <CardFooter className='pt-0'>
            <Button
              variant='gradient'
              onClick={() => {
                handleOpen();
                handleAddRoom();
              }}
              fullWidth
            >
              Buat
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default Pesan;
