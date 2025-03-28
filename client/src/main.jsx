import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { persistor, store } from './redux/storage'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'
import { ContractProvider } from './context/contractContext.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Toaster/>
<ContractProvider>

    <App />
</ContractProvider>
</PersistGate>
</Provider>
)
