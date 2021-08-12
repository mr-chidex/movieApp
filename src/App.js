import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import BottomNav from "./components/BottomNav";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import TvSeries from "./pages/TvSeries";

function App() {
  return (
    <div>
      {/*Header */}

      <Header />
      {/**body */}
      <Container>
        <Switch>
          <Route component={Movies} path="/movies" />
          <Route component={TvSeries} path="/tvseries" />
          <Route component={Search} path="/search" />
          <Route component={Home} path="/" />
        </Switch>
      </Container>

      <BottomNav />
      {/**footer */}
    </div>
  );
}

export default App;
