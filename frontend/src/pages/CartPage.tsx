import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.bookPrice * item.quantity,
    0
  );

  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID} style={{ marginBottom: '1rem' }}>
                <strong>{item.bookTitle}</strong>
                <br />
                Price: ${item.bookPrice.toFixed(2)}
                <br />
                Quantity: {item.quantity}
                <br />
                Subtotal: ${(item.bookPrice * item.quantity).toFixed(2)}
                <br />
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button>Checkout</button>{' '}
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
