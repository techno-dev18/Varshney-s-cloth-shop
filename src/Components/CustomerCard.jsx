import "../Styles/CustomerCard.css";

const CustomerCard = ({
  customerName,
  city
}) => {

  return (
    <div className="customerCard">
      <h2>{customerName}</h2>
      <h4>{city}</h4>
    </div>
  );
};

export default CustomerCard;