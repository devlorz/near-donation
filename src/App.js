import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import { Title } from "@mantine/core";

import Layout from "./Layout";
import Content from "./Content";
import List from "./List";

import getConfig from "./config";

export default function App() {
  const [donations, setDonations] = React.useState([]);

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract.list_crowdfunds().then((res) => {
        setDonations(res);
      });
    }
  }, []);

  if (!window.walletConnection.isSignedIn()) {
    return (
      <Layout buttonClick={login}>
        <Title order={3} style={{ marginTop: "100px", textAlign: "center" }}>
          Sign in to use app
        </Title>
      </Layout>
    );
  }

  return (
    <Layout buttonClick={logout} isLoggedIn={true}>
      <Content />
      <List donations={donations} />
    </Layout>
  );
}
