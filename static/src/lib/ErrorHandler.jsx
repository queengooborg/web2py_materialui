import React from "react";
import { toast } from "react-toastify";

const ErrorHandler = () => {
	window.onerror = (msg) => {
		toast.error(`${msg}`);
	};
	return null;
};

export default ErrorHandler;
