import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { Gender } from "../domain/entity/gender";
import { PROFILE } from "../domain/services/profile";
import profileActions from "../store/profile/actions";

const Basic = () => {
  const dispatch = useDispatch();
  // ここでstateを扱う(Profile型と一致)
  const profile = useSelector((state: RootState) => state.profile);
  const classes = useStyles();
  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        value={profile.name}
        label={PROFILE.NAME}
        // 'name' exists in type 'Partial<Profile>',cfL23
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        className={classes.formField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        // 'description' exists in type 'Partial<Profile>',cfL23
        onChange={(e) => handleChange({ description: e.target.value })}
      />
      <FormControl className={classes.formField}>
        <FormLabel>{PROFILE.GENDER}</FormLabel>
        <RadioGroup
          value={profile.gender}
          // 'gender' exists in type 'Partial<Profile>',cfL23
          onChange={(e) => handleChange({ gender: e.target.value as Gender })}
        >
          <FormControlLabel
            value="male"
            label="男性"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="female"
            label="女性"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Basic;
