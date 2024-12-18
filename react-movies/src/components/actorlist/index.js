import React from "react";
import Grid from "@mui/material/Grid2";
import ActorCard from "../Actorcard";

const ActorList = ({casts}) => {
  let movieCards = casts.slice(0,6).map((cast) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} sx={{ padding: "20px" }}>
      <ActorCard actor={cast} />
    </Grid>
  ));
  return movieCards;
};


export default ActorList