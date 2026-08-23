import "../Styles/ShimmerCard.css";

const ShimmerCard = () => {
  return (
    <div className="shimmerCard">

      {/* Product Image */}
      <div className="shimmerImage"></div>

      {/* Product Content */}
      <div className="shimmerContent">

        {/* Product Name */}
        <div className="shimmerLine shimmerTitle"></div>

        {/* Brand */}
        <div className="shimmerLine shimmerBrand"></div>

        {/* Rating */}
        <div className="shimmerLine shimmerRating"></div>

        {/* Price */}
        <div className="shimmerPrice">

          <div className="shimmerLine shimmerOldPrice"></div>

          <div className="shimmerLine shimmerNewPrice"></div>

        </div>

        {/* Size Select */}
        <div className="shimmerSelect"></div>

        {/* Button */}
        <div className="shimmerButton"></div>

      </div>

    </div>
  );
};

export default ShimmerCard;