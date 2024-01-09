import { Link } from "react-router-dom";
import { ProductModel } from "../../models/responses/ProductModel";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/reducers/cartReducer";

type Props = {
  product: ProductModel;
  title?: string;
};

const ProductCard = (props: Props) => {
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(addToCart(props.product));
  };

  const removeProductFromCart = () => {
    dispatch(removeFromCart(props.product.id));
  };

  return (
    <div className="card">
      <img
        src={props.product.thumbnail}
        className="card-img-top img-fluid"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.product.title}</h5>
        <p className="card-text">{props.product.description}</p>
        <Link
          to={"/product-detail/" + props.product.id}
          className="btn btn-primary"
        >
          Detail
        </Link>
        <button onClick={addProductToCart} className="btn btn-secondary">
          Sepete Ekle
        </button>
        <button onClick={removeProductFromCart} className="btn btn-danger">
          Sil
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
