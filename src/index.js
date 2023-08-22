import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// npm install react-router-dom@6 한다음
import { BrowserRouter } from 'react-router-dom';
// 리덕스
import { Provider } from 'react-redux';
import store from './store'
// 리액트쿼리

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// 리액트쿼리추가
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
      <Provider store={store}> 
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
  </QueryClientProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
