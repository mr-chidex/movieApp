import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import BottomNav from "./components/BottomNav";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import TvSeries from "./pages/TvSeries";
import colors from "./utils/colors";

function App() {
  const darkMode = localStorage.getItem("darkMode");
  const [dark, setDark] = useState(darkMode === "yes" ? true : false);

  useEffect(() => {
    if (darkMode === "yes") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, [darkMode]);

  const handleChangeMode = (e) => {
    const mode = e.target.checked;
    if (mode) {
      localStorage.setItem("darkMode", "yes");
      setDark(true);
      return;
    }
    setDark(false);
    localStorage.setItem("darkMode", "no");
  };

  return (
    <div
      style={{
        backgroundColor: `${dark ? colors.lightPrimary : colors.white}`,
        display: "flex",
        flex: "1",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      {/*Header */}

      <Header dark={dark} handleChangeMode={handleChangeMode} />
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
