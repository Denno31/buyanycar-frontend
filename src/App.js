import { createTheme, ThemeProvider } from "@mui/material";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./common/components/navbar/BottomNav";
import Navbar from "./common/components/navbar/Navbar";
import Home from "./pages/home/Home";
import "./App.css";
import Vehicle from "./pages/vehicle/Vehicle";
import CreateAd from "./pages/ad/CreateAd";
import { setContext } from "@apollo/client/link/context";

const uri_prod = "https://buyanycar-backend.herokuapp.com/graphql";
const uri_dev = "http://localhost:5000/graphql";

const httpLink = createHttpLink({
  uri: uri_dev,
});

const authLink = setContext(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: { Authorization: user ? `Bearer ${user.token}` : "" },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#F28829",
    },
    secondary: {
      main: "#3DB83A",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1400px",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App" style={{ marginBottom: "70px" }}>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>

              <Route exact path="/vehicle/:id" element={<Vehicle />}></Route>
              <Route exact path="/new-ad" element={<CreateAd />}></Route>
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
