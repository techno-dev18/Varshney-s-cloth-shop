import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <h1>✅ Order Placed Successfully</h1>

      <Link to="/">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;