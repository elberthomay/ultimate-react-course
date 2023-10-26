import pizzaDatas from "./data";
export default function App() {
  return (
    <div className="container">
      <Header />
      <Menu pizzaDatas={pizzaDatas} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast react pizza co. </h1>
    </header>
  );
}

function Menu({
  pizzaDatas,
}: {
  pizzaDatas: {
    name: string;
    ingredients: string;
    price: number;
    photoName: string;
    soldOut: boolean;
  }[];
}) {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        out stone oven, all organic, all delicious
      </p>
      <div className="pizzas">
        {pizzaDatas.map((pizzaData) => (
          <Pizza {...pizzaData} />
        ))}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="order">
        <p>We're open until 22:00. Come visit us or order online.</p>
        <button className="btn">Order now</button>
      </div>
    </footer>
  );
}

function Pizza({
  name,
  ingredients,
  price,
  photoName,
  soldOut,
}: {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
  soldOut: boolean;
}) {
  return (
    <div className={`pizza ${soldOut ? "soldout" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{`$${price}`}</span>
      </div>
    </div>
  );
}
