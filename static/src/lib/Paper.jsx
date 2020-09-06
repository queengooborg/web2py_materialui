import React from "react";
import BasePaper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		padding: "1em",
	},
});

const Paper = (props) => {
	const classes = useStyles();

	return <BasePaper classes={{ root: classes.root }} {...props} />;
};

export default Paper;
