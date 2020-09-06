import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	createMuiTheme,
	makeStyles,
	ThemeProvider,
} from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import ChatWidget from "./lib/ChatWidget";
import ErrorHandler from "./lib/ErrorHandler";
import NavBar from "./lib/NavBar";
import PageBase from "./lib/PageBase";

import Homepage from "./pages/Homepage";

import config from "./config";

const theme = {
	palette: {
		type: "dark",
		primary: {
			appbar: "#6a24c6",
			light: "#9d46ff",
			main: "#b885ff",
			dark: "#0a00b6",
			contrastText: "#fff",
		},
		secondary: {
			light: "#7bc8ef",
			main: "#1785bc",
			dark: "#093349",
			contrastText: "#fff",
		},
		background: {
			paper: "#222",
			default: "#111",
		},
	},
	typography: {
		useNextVariants: true,
	},
};

const contentBoxStyles = makeStyles({
	root: {
		marginLeft: "24px",
		width: "calc(100% - 48px)",
	},
});

const Router = () => {
	return (
		<BrowserRouter>
			<Suspense>
				<Switch>
					<Route
						exact
						path={`${config.baseurl}/`}
						render={(props) => <Homepage {...props} />}
					/>
					<Route
						render={(props) => (
							<p style={{ color: "white" }}>Not found</p>
						)}
					/>
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
};

const App = () => {
	const muiTheme = React.useMemo(() => createMuiTheme(theme), []);

	return (
		<ThemeProvider theme={muiTheme}>
			<HelmetProvider>
				<Router />
				<ChatWidget />
			</HelmetProvider>
			<ErrorHandler />
		</ThemeProvider>
	);
};

export default App;
