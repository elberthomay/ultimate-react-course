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
      {pizzaDatas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from out stone oven, all organic, all delicious
          </p>
          <div className="pizzas">
            {pizzaDatas.map((pizza) => (
              <Pizza {...pizza} key={pizza.name} />
            ))}
          </div>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later</p>
      )}
    </main>
  );
}

function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = currentHour < closeHour && currentHour >= openHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We welcome you from {openHour}:00 until {closeHour}:00. Come visit
            us or order online.
          </p>
          <button className="btn">Order now</button>
        </div>
      ) : (
        <div className="order">
          <p>
            Oops, we're currently not open. We will open starting from
            {openHour}:00. We're looking forward to your visit!
          </p>
        </div>
      )}
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
    <div className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : `$${price}`}</span>
      </div>
    </div>
  );
}
