import { Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import PokeDetail from "./Components/PokeDetail/PokeDetail";
import LandingPage from "./Components/Landing/LandingPage";
import Form from "./Components/Form/Form";
import Nav from "./Components/Nav/Nav";
function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={LandingPage}></Route>
      <Route path={"/home"} component={Nav}></Route>
      <Route exact path={"/home"} component={Home}></Route>
      <Route exact path={"/home/:id"} component={PokeDetail}></Route>
      <Route exact path={"/create"} component={Form}></Route>
    </div>
  );
}

export default App;
