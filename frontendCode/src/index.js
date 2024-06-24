import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";
import { DarkModeContextProvider } from "./context/darkModeContext";
import ChatProvider from "./components/chatContext/chatProvider";
import reduxToolkitStore from "./store/reduxToolkitStore";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state/index";
const adminStore = configureStore({
  reducer: {
    global: globalReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider
    store={store}
    reduxToolkitStore={reduxToolkitStore}
    adminStore={adminStore}
  >
    <BrowserRouter>
      <ChatProvider>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </ChatProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
