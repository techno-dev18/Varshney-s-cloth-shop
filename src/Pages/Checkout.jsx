import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const placeOrder = () => {
    navigate("/success");
  };

  return (
    <div>
      <h1>Checkout</h1>

      <input placeholder="Name" />
      <br /><br />

      <input placeholder="Phone" />
      <br /><br />

      <textarea placeholder="Address" />

      <br /><br />

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;