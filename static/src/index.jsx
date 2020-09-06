import React from "react";
import ReactDOM from "react-dom";
import browserUpdate from "browser-update";
import App from "./App";

browserUpdate({
	required: {
		e: -3,
		f: -3,
		o: -3,
		s: -1,
		c: -3,
	},
	reminder: 0,
	insecure: true,
	unsupported: true,
	style: "bottom",
	api: 2020.06,
});

ReactDOM.render(<App />, document.getElementById("root"));
