import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h4>Mini Shop 🛒</h4>
      <Link to="/shop">Go to Shop</Link>
    </div>
  );
}