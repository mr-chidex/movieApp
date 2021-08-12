import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import BottomNav from "./components/BottomNav";
import { Header } from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      {/*Header */}

      <Header />
      {/**body */}
      <Container>
        <Switch>
          <Route component={Home} path="/" />
        </Switch>
      </Container>

      <BottomNav />
      {/**footer */}
    </div>
  );
}

export default App;
