import Image from "next/image";
import Link from "next/link";

const CardComponent = ({nftData}) => {
  return (
    <div className="root">
          <div className="card">
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={nftData.image}
        className="card-img-top"
        width={"100%"}
        height={"100%"}
        alt="Crypto punk"
      />
      <div className="card-body">
        <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <small>#{nftData.token}</small>
          <p>{nftData.name}</p>
        </div>
        <div className="d-flex flex-column">
          <small>Bid price</small>
          <p><i className="fab fa-ethereum"></i> {nftData.price}</p>
        </div>
        </div>

      </div>
    </div>
    </div>

  );
};

export default CardComponent;
