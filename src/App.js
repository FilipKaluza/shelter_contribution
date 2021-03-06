import { Route } from "react-router-dom";

// import components
import Layout from "./components/Layout/Layout";
import Contribution from "./components/Contribution/Contribution";
import ContactData from "./components/ContactData/ContactData";
import Checkout from "./components/Checkout/Checkout";


const App = () => {

  return(
    <div className="App">
        <Layout>
          <Route path="/" exact component={Contribution} />
          <Route path="/contact" exact component={ContactData} />
          <Route path="/checkout" exact component={Checkout} />
        </Layout>
    </div>
  );
};

export default App;

