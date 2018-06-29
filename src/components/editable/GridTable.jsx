import React from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

import Editable from "./Editable";
import GridTableEditor from "../editingTools/GridTableEditor";

import { withStyles } from "material-ui/styles";

const styles = {
  container: {
    padding: "1rem"
  },
  item: {
    padding: "0.2rem",
    fontSize: "0.8rem",
    minHeight: "10rem"
  },
  innerItem: {
    borderRadius: "4px",
    backgroundColor: "#f3f7f6",
    height: "100%",
    width: "100%",
    padding: "0.6rem"
  },
  addItem: {
    border: "1px solid green"
  },
  formControl: {
    flexGrow: "1"
  },
  input: {
    fontSize: "0.8rem"
  },
  row: {
    marginBottom: "1rem"
  },
  deleteButton: {
    width: "30px",
    height: "30px"
  },
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "normal"
  },
  miniLabel: {
    textTransform: "uppercase",
    fontSize: "0.7rem"
  },
  verticalLabel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "6px"
  },
  horizontalLabel: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "6px"
  }
};

const GridTableItem = props => {
  return (
    <Grid item xs={4} className={props.classes.item}>
      <div className={props.classes.innerItem}>{props.children}</div>
    </Grid>
  );
};

const GridTable = props => {
  const handleSave = content => {
    props.saveTable(content.tableData);
  };

  const { tableData } = props;


  return (
    <Editable
      editor={GridTableEditor}
      handleSave={handleSave}
      content={{ tableData: props.tableData }}
      {...props}
    >
      <Paper className={props.classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} className={props.classes.verticalLabel}>
                <div className={props.classes.miniLabel}>High</div>
                <div className={props.classes.label}>
                  Likelihood of occurence
                </div>
                <div className={props.classes.miniLabel}>Low</div>
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <GridTableItem classes={props.classes}>
                    {tableData.highLikelihood.lowRisk}
                  </GridTableItem>

                  <GridTableItem classes={props.classes}>
                    {tableData.highLikelihood.mediumRisk}
                  </GridTableItem>

                  <GridTableItem classes={props.classes}>
                    {tableData.highLikelihood.highRisk}
                  </GridTableItem>
                </Grid>

                <Grid container>
                  <GridTableItem classes={props.classes}>
                    {tableData.mediumLikelihood.lowRisk}
                  </GridTableItem>

                  <GridTableItem classes={props.classes}>
                    {tableData.mediumLikelihood.mediumRisk}
                  </GridTableItem>

                  <GridTableItem classes={props.classes}>
                    {tableData.mediumLikelihood.highRisk}
                  </GridTableItem>
                </Grid>

                <Grid container>
                  <GridTableItem classes={props.classes}>
                    {tableData.lowLikelihood.lowRisk}
                  </GridTableItem>

                  <GridTableItem classes={props.classes}>
                    {tableData.lowLikelihood.mediumRisk}
                  </GridTableItem>

                  <GridTableItem classes={props.classes}>
                    {tableData.lowLikelihood.highRisk}
                  </GridTableItem>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={1} />
                  <Grid item xs={11} className={props.classes.horizontalLabel}>
                    <div className={props.classes.miniLabel}>Low</div>
                    <div className={props.classes.label}>Severity of Risk</div>
                    <div className={props.classes.miniLabel}>High</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Editable>
  );
};

export default withStyles(styles)(GridTable);