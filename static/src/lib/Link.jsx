import React from "react";
import { Link as BaseLink } from "react-router-dom";
import config from "../config";

const Link = (props) => {
	let link = props.to;
	if (props.to && props.to.startsWith("/")) link = config.baseurl + link;

	return props.to && props.to.startsWith("http") ? (
		<a
			{...props}
			href={link}
			target={props.target || "_blank"}
			style={{ color: "inherit", textDecoration: "inherit" }}
		>
			{props.children}
		</a>
	) : (
		<BaseLink
			{...props}
			to={link}
			style={{ color: "inherit", textDecoration: "inherit" }}
		/>
	);
};

export default Link;
