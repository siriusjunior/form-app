import React from "react";
import { Container, Typography } from "@material-ui/core";

import Address from "./Address";
import Basic from "./Basic";
import useStyles from "./styles";

const Profile = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        基本情報
      </Typography>
      <Basic />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        住所
      </Typography>
      <Address />
    </Container>
  );
};

export default Profile;
