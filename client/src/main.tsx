import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './assets/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClientInstance.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>,
);
