import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { PROFILE } from "../domain/services/profile";
import {
  TextField,
  Grid,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";

import { Career as ICareer } from "../domain/entity/career";
import profileActions from "../store/profile/actions";
import { exitEmptyCareers } from "../domain/services/career";
import { calculateValidation } from "../domain/services/validation";
import validationActions from "../store/validation/actions";

const Career = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const careers = useSelector((state: RootState) => state.profile.careers);
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const isUnableToAddCareer = exitEmptyCareers(careers);

  const handleDeleteCareer = (i: number) => {
    dispatch(profileActions.deleteCareer(i));
  };

  // memberに引数の変数として各々の項目を受ける(iごとのaction中のcareer)
  // 各careerの変更とdispatch(actionsのPartial<Career>に適合)
  const handleChange = (member: Partial<ICareer>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));
    recalculateValidation(member, i);
  };

  const handleAddCareer = () => {
    dispatch(profileActions.addCareer({}));
  };

  const recalculateValidation = (member: Partial<ICareer>, i: number) => {
    if (!validation.isStartValidation) return;
    const newProfile = {
      ...profile,
      // profile中のcareer項目を_iとiを参照しstate更新
      careers: profile.careers.map((c, _i) =>
        _i === i ? { ...c, ...member } : c
      ),
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  return (
    <>
      {/* map()の返却値に一つのコンポーネントを返す(Fragment) */}
      {careers.map((c, i) => (
        <Fragment key={i}>
          <Typography variant="h5" component="h3" className={classes.title}>
            職歴{i + 1}
          </Typography>
          <TextField
            className={classes.formField}
            fullWidth
            error={!!validation.message.careers[i]?.company}
            helperText={validation.message.careers[i]?.company}
            label={PROFILE.CAREERS.COMPANY}
            value={c.company}
            onChange={(e) => handleChange({ company: e.target.value }, i)}
          />
          <TextField
            className={classes.formField}
            fullWidth
            error={!!validation.message.careers[i]?.position}
            helperText={validation.message.careers[i]?.position}
            label={PROFILE.CAREERS.POSITION}
            value={c.position}
            onChange={(e) => handleChange({ position: e.target.value }, i)}
          />
          <div className={classes.careerSpan}>
            <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
            <Grid
              container
              spacing={1}
              alignContent="space-between"
              alignItems="center"
            >
              {/* 開始月のフォーム */}
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  error={!!validation.message.careers[i]?.startAt}
                  helperText={validation.message.careers[i]?.startAt}
                  InputLabelProps={{ shrink: true }}
                  value={c.startAt}
                  onChange={(e) => handleChange({ startAt: e.target.value }, i)}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography align="center">〜</Typography>
              </Grid>
              {/* 終了月のフォーム */}
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  error={!!validation.message.careers[i]?.endAt}
                  helperText={validation.message.careers[i]?.endAt}
                  InputLabelProps={{ shrink: true }}
                  value={c.endAt}
                  onChange={(e) => handleChange({ endAt: e.target.value }, i)}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.careerSpan}
            onClick={() => handleDeleteCareer(i)}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            職歴{i + 1}を削除
          </Button>
        </Fragment>
      ))}
      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
        disabled={isUnableToAddCareer}
      >
        職歴を追加
      </Button>
    </>
  );
};

export default Career;
