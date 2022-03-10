import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {

  const account = useSelector((state)=> state.web3Reducer.account)

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
          <Link  href="#">
            <span className="nav-link">Connect with wallet</span>
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
