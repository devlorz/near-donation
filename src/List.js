import React from "react";
import { Grid } from "@mantine/core";

import Card from "./Card";

export default function List({ donations }) {
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: "960px",
        padding: 20,
      }}
    >
      <Grid>
        {donations
          .sort((a, b) => b.total_votes - a.total_votes)
          .map((donation) => (
            <Grid.Col md={6} lg={4} key={donation.id}>
              <Card donation={donation} />
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
}
