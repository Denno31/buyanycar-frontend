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
import PrivateRoute from "./Auth/PrivateRoute";
import Account from "./pages/account/Account";
import ActiveAds from "./pages/myads/ActiveAds";
import EditVehicle from "./pages/myads/EditVehicle";
import Favorite from "./pages/myads/Favorite";
import UnderReviewAds from "./pages/myads/UnderReviewAds";
import DeclinedAds from "./pages/myads/DeclinedAds";
import Message from "./pages/message/Message";

const uri_prod = "https://buyanycar-backend.herokuapp.com/graphql";
// const uri_dev = "http://localhost:5000/graphql";

const httpLink = createHttpLink({
  uri: uri_prod,
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
              <Route
                exact
                path="/new-ad"
                element={
                  <PrivateRoute>
                    <CreateAd />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/me/account"
                element={
                  <PrivateRoute>
                    <Account />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/me/active-ads"
                element={
                  <PrivateRoute>
                    <ActiveAds />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/me/favorites"
                element={
                  <PrivateRoute>
                    <Favorite />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/me/under-review-ads"
                element={
                  <PrivateRoute>
                    <UnderReviewAds />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/me/declined-ads"
                element={
                  <PrivateRoute>
                    <DeclinedAds />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/me/:vehicleId/edit"
                element={
                  <PrivateRoute>
                    <EditVehicle />
                  </PrivateRoute>
                }
              ></Route>
               <Route
                exact
                path="/me/messages"
                element={
                  <PrivateRoute>
                    <Message />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="*" element={<Home />}></Route>
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
