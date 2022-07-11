import React from "react";
import { useSelector, useDispatch } from "react-redux";
import collegesActions from "../store/colleges/actions";
import { RootState } from "../domain/entity/rootState";
import { TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
import { searchColleges } from "../store/colleges/effects";

const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.colleges);
  const classes = useStyles();

  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  const handleSearch = () => {
    dispatch(searchColleges(colleges.search));
  };

  return (
    <>
      <TextField
        className={classes.formField}
        fullWidth
        label="大学名を検索"
        value={colleges.search}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleSearch}
        disabled={!colleges.search}
      >
        検索
      </Button>
    </>
  );
};

export default College;
