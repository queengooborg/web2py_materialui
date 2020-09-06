import React from "react";
import Typography from "@material-ui/core/Typography";

const Txt = (props) => {
	return (
		<Typography
			align={
				props.align || (props.variant && props.variant.startsWith("h"))
					? "center"
					: undefined
			}
			className={props.class}
			component={props.component || "div"}
			noWrap={props.noWrap}
			style={{
				fontWeight: props.bold ? "bold" : "normal",
				...props.style,
			}}
			variant={props.variant || "body1"}
			{...(props.noBreaks ? {} : { paragraph: true })}
		>
			{props.children}
		</Typography>
	);
};

export default Txt;
