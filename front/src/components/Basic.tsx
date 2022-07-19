import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { Gender } from "../domain/entity/gender";
import { PROFILE } from "../domain/services/profile";
import profileActions from "../store/profile/actions";
import { calculateValidation } from "../domain/services/validation";
import validationActions from "../store/validation/actions";

const Basic = () => {
  const dispatch = useDispatch();
  // ここでstateを扱う(Profile型と一致)
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const classes = useStyles();
  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));
    recalculateValidation(member);
  };
  const recalculateValidation = (member: Partial<Profile>) => {
    // バリデーションが機能していなければ作動させない
    if (!validation.isStartValidation) return;
    const newProfile = { ...profile, ...member };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  return (
    <>
      <TextField
        fullWidth
        label={PROFILE.NAME}
        required
        error={!!validation.message.name}
        helperText={validation.message.name}
        className={classes.formField}
        value={profile.name}
        // 'name' exists in type 'Partial<Profile>',cfL23
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        error={!!validation.message.description}
        helperText={validation.message.description}
        className={classes.formField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        // 'description' exists in type 'Partial<Profile>',cfL23
        onChange={(e) => handleChange({ description: e.target.value })}
      />
      <FormControl
        error={!!validation.message.gender}
        required
        className={classes.formField}
      >
        <FormLabel>{PROFILE.GENDER}</FormLabel>
        <RadioGroup
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
        <FormHelperText>{validation.message.gender}</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        required
        error={!!validation.message.birthday}
        helperText={validation.message.birthday}
        className={classes.formField}
        label={PROFILE.BIRTHDAY}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={profile.birthday}
        // 'birthday' exists in type 'Partial<Profile>',cfL23
        onChange={(e) => handleChange({ birthday: e.target.value })}
      />
    </>
  );
};

export default Basic;
