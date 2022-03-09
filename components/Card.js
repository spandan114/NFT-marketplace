import Image from "next/image";
import Link from "next/link";

const CardComponent = () => {
  return (
    <div className="root">
          <div className="card">
      <Image 
        src={"https://openseauserdata.com/files/a5509bca116d1e1d98cfb14c5c2c61b7.svg"  }
        className="card-img-top"
        width={"100%"}
        height={"100%"}
        alt="Crypto punk"
      />
      <div className="card-body">
        <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <small>#122345</small>
          <p>NFT name</p>
        </div>
        <div className="d-flex flex-column">
          <small>Bid price</small>
          <p><i className="fab fa-ethereum"></i> 1.2</p>
        </div>
        </div>

      </div>
    </div>
    </div>

  );
};

export default CardComponent;
