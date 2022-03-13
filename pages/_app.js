import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {wrapper} from '../redux/store'
import { loadAccount, loadContracts, loadWeb3 } from "../redux/interactions";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const dispatch = useDispatch()

  useEffect(() => {
    loadBlockchain()
  }, [])

  const loadBlockchain = async()=>{
    const provider = await loadWeb3(dispatch)
    await loadContracts(provider,dispatch)
    await loadAccount(provider,dispatch)
  }

  return <><ToastContainer /><Component {...pageProps} /></>
}

export default wrapper.withRedux(MyApp)
