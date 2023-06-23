import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoMatch from './pages/nomatch/NoMatch';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <React.StrictMode>
      {/* <App /> */}
      <BrowserRouter>
        {/* <scrollTo /> */}
        <Routes>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<App />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,
);
