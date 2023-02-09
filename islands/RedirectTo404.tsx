import {  useEffect } from "preact/hooks";

const RedirectTo404 = () => {
	useEffect(() => {
		location.href = "/404";
	}, []);

	return <>/</>;
};

export default RedirectTo404;
