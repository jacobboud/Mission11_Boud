import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';

function BuyPage() {
  const navigate = useNavigate();
  const { bookTitle, bookID, price } = useParams();
  const { addToCart } = useCart();
  const bookPrice = Number(price);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      bookTitle: bookTitle || 'No Book Found',
      bookPrice: bookPrice,
      quantity: quantity, // 👈 this is new
    };

    addToCart(newItem);
    console.log('Added to cart:', newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2>
          Buy <em>{bookTitle}</em> for ${bookPrice.toFixed(2)} each
        </h2>
        <div className="my-3">
          <label htmlFor="quantity">Quantity:</label>{' '}
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: '80px', marginLeft: '10px' }}
          />
        </div>
        <p>
          <strong>Subtotal: ${(bookPrice * quantity).toFixed(2)}</strong>
        </p>
        <button className="btn btn-success" onClick={handleAddToCart}>
          Add to Cart
        </button>{' '}
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default BuyPage;
