import React, { useState } from "react";
import { Badge, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, addToCart, removeFromCart, removeItem } from "../../store/reducers/cartReducer";
import { Cart4, Trash, Plus, DashLg } from "react-bootstrap-icons";

const CartBadge = () => {
  const cartState = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    setIsDropdownOpen(false);
  };

  const handleAddToCart = (item: any, event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addToCart(item));
    setIsDropdownOpen(true);
    event.stopPropagation();
  };

  const handleRemoveFromCart = (itemId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeFromCart(itemId));
    setIsDropdownOpen(true);
    event.stopPropagation();
  };

  const handleRemoveItem = (itemId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeItem(itemId));
    setIsDropdownOpen(true);
    event.stopPropagation();
  };

  return (
    <NavDropdown
      id="nav-dropdown-dark-example"
      title={
        <div className="d-flex align-items-center pt-2">
          <Cart4 size={24} className="mr-2" color="white"/>
          <Badge pill className="ml-2">
            {cartState.cartItems.length}
          </Badge>
        </div>
      }
      menuVariant="dark"
      show={isDropdownOpen}
      onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
    >
      {cartState.cartItems.length > 0 ? (
        cartState.cartItems.map((item: any) => (
        <NavDropdown.Item key={item.id} >
          <div className="cart-item d-flex">
            <div className="flex-grow-1">
              <span className="item-title">{item.title} &nbsp;&nbsp;</span>
            </div>
            <div className="flex-shrink-0">
              <span className="item-quantity ml-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(event) => handleRemoveFromCart(item.id, event)}
                >
                <DashLg size={11} className="mr-2" />
                </Button>
                &nbsp;{item.quantity}&nbsp;
                <Button
                  variant="success"
                  size="sm"
                  onClick={(event) => handleAddToCart(item, event)}
                >
                  <Plus size={18} className="mr-2" />
                </Button>
                &nbsp;
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(event) => handleRemoveItem(item.id, event)}
                >
                  <Trash size={16} />
                </Button>
              </span>
            </div>
          </div>
        </NavDropdown.Item>
      ))) : (
        <NavDropdown.Item>
          <div className="cart-empty-message">Sepetiniz Boş</div>
        </NavDropdown.Item>
      )}
      {cartState.cartItems.length > 0 && (
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-danger" onClick={handleClearCart}>
            Sepeti Temizle
          </button>
        </div>
      )}
    </NavDropdown>
  );
};

export default CartBadge;
