import Head from "next/head";
import { useSelector } from "react-redux";
import CardComponent from "../components/Card";
import Spinner from "../components/Spinner";
import { basicAuth } from "../helpers/AuthHelper";

const Home = () => {
  const allUnsoldNFT = useSelector((state) => state.nftMarketplaceReducer.unsoldNFT);

  return (
    <div className="container home">
      <Head>
        <title>Home</title>
      </Head>

      <h1 className={"header-text"}>NFT Market</h1>
      <h5 className={"sub-header-text"}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </h5>
      {allUnsoldNFT ? (
        <div className="row mt-4">
          {
            allUnsoldNFT.length > 0?
            allUnsoldNFT.map((data,i)=>(
              <div className="col-md-3" key={i}>
              <CardComponent  nftData={data} />
            </div>
            ))
            :<h4 className="text-center">NFTs not uploaded yet</h4>
          }

        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default basicAuth(Home);
