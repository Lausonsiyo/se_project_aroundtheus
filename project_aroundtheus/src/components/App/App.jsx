// COMPONENTS IMPORTS
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";

//STYLES IMPORTS
import "./App.css";

// APP COMPONENT

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>
      {/* Overlay */}
    </div>
  );
}

export default App;
