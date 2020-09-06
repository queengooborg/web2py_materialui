import React from "react";
import FreshChat from "react-freshchat";
import config from "../config";

const ChatWidget = () =>
	config.tokens.freshchat && <FreshChat token={config.tokens.freshchat} />;

export default ChatWidget;
