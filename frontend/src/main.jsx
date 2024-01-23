import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './features/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === production) disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
          <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>

)
