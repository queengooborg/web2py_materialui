import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Link from "./Link";

import config from "../config";

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.primary.appbar,
	},
	title: {
		flexGrow: 1,
	},
	drawer: {
		minWidth: "180px",
	},
});

const Sidebar = () => {
	return (
		<List>
			<Link key={0} to="/">
				<ListItem button={true}>
					<ListItemText>Homepage</ListItemText>
				</ListItem>
			</Link>
			<Link key={1} to="/">
				<ListItem button={true}>
					<ListItemText>About</ListItemText>
				</ListItem>
			</Link>
		</List>
	);
};

const NavBar = ({ classes, title }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleOpen = () => setSidebarOpen(true);
	const handleClose = () => setSidebarOpen(false);

	return (
		<>
			<AppBar className={classes.root} position="static">
				<Toolbar>
					<IconButton
						aria-label="menu"
						color="inherit"
						edge="start"
						onClick={handleOpen}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{title}
					</Typography>
					<div>
						{config.socials.facebook && (
							<Link
								to={`https://www.facebook.com/${config.socials.facebook}/`}
							>
								<IconButton
									aria-label="Facebook"
									color="inherit"
									edge="start"
								>
									<FacebookIcon />
								</IconButton>
							</Link>
						)}
						{config.socials.twitter && (
							<Link
								to={`https://twitter.com/${config.socials.twitter}/`}
							>
								<IconButton
									aria-label="Twitter"
									color="inherit"
									edge="start"
								>
									<TwitterIcon />
								</IconButton>
							</Link>
						)}
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="left"
				className="headerMenu"
				classes={{
					paper: classes.drawer,
				}}
				onClick={handleClose}
				onClose={handleClose}
				open={sidebarOpen}
			>
				<Sidebar />
			</Drawer>
		</>
	);
};

export default withStyles(styles, { withTheme: true })(NavBar);
