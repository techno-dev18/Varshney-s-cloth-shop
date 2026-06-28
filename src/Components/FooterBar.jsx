import "../Styles/FooterBar.css";

const FooterBar = () => {
  return (
    <footer className="footer">
      <h3>
        © {new Date().getFullYear()}
        {" "}Varshney's Cloth Shop
      </h3>
    </footer>
  );
};

export default FooterBar;