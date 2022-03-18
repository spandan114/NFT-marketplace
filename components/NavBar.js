import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAccount } from "../redux/interactions";

const NavBar = () => {

  const dispatch = useDispatch()
  const account = useSelector((state)=> state.web3Reducer.account)
  const provider = useSelector((state)=> state.web3Reducer.connection)

 const connectWallet = async()=>{
  if (window.ethereum) {
    window.ethereum.request({method:"eth_requestAccounts"})
    .then(async res=>{
      await loadAccount(provider,dispatch)
    
    }).catch(error=>{
      alert(error.message)
    })
   } else {
     window.alert(
       "Non-Ethereum browser detected. You should consider trying MetaMask!"
     );
   }
 }

 const chainOrAccountChangedHandler = async() => {
  // reload the page to avoid any errors with chain or account change.
  window.location.reload();
}
	// listen for account changes
	window.ethereum.on('accountsChanged', chainOrAccountChangedHandler);
 // Listen for chain change
	window.ethereum.on('chainChanged', chainOrAccountChangedHandler);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container ">
        {/* eslint-disable-next-line @next/next/link-passhref */}
        <Link  href="/">
          <span className="navbar-brand logo">NFT</span>
        </Link>

{
        account?
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link  href="/creator-profile">
              <span className="nav-link">Creator profile</span>
            </Link>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link  href="/my-orders">
              <span className="nav-link">My Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link  href="mint">
              <span className="nav-link">Create NFT</span>
            </Link>
          </li>
        </ul>
      </div>
      :
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item active">
          {/* eslint-disable-next-line @next/next/link-passhref */}
          <Link  href="#" >
            <span className="nav-link" onClick={()=>connectWallet()}>Connect with wallet</span>
          </Link>
        </li>
        </ul>
        </div>
}

      </div>
    </nav>
  );
};

export default NavBar;
