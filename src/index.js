import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initContract } from "./utils";
import { NotificationsProvider } from "@mantine/notifications";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <NotificationsProvider>
        <App />
      </NotificationsProvider>,
      document.querySelector("#root")
    );
  })
  .catch(console.error);
