import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import NavBar from "./NavBar";

const contentBoxStyles = makeStyles({
	root: {
		marginLeft: "24px",
		width: "calc(100% - 48px)",
	},
});

const PageBase = ({ children, title }) => {
	const contentBoxTheme = contentBoxStyles();
	const defaultTitle = "web2py + Material UI";

	return (
		<div>
			<CssBaseline />
			<title>{title || defaultTitle}</title>
			<NavBar title={title || defaultTitle} />
			<br />
			<Box className={contentBoxTheme.root}>{children}</Box>
			<ToastContainer position="top-center" />
		</div>
	);
};

export default PageBase;
