import Head from "next/head";
import React from "react";

export const HeadContent: React.FC = () => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			<link rel="manifest" href="./manifest.json"></link>
			<link
				rel="icon"
				href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥏</text></svg>"
			/>
			<title>DiscIt</title>
		</Head>
	);
};

export default HeadContent;
