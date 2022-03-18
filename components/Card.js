import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { buyNFT } from "../redux/interactions";

const CardComponent = ({nftData}) => {
  
  const router = useRouter()
  const dispatch = useDispatch();
  const marketplaceContract = useSelector(state=>state.nftMarketplaceReducer.contract)
  const account = useSelector(state=>state.web3Reducer.account)

  const buyMarketplaceNft = (token,price) =>{

    const onSuccess = ()=> {
      toast.success("woo hoo ! you ow this NFT 🎉", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        router.push("my-orders")
    }
    const onError = (error)=> {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    buyNFT(marketplaceContract,account,token,price,dispatch,onSuccess,onError)
  }

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
      {
        router.pathname === "/"?
        <div className="card-footer text-muted">
        <button className="btn text-center buy-now btn-sm" onClick={()=>buyMarketplaceNft(nftData.token,nftData.price)}>Buy now</button>
     </div>
     :""
      }

    </div>
    </div>

  );
};

export default CardComponent;
