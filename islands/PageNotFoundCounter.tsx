import { useState, useEffect } from "preact/hooks";

interface TimerProps {
	initialSeconds: number;
}

const PageNotFoundCounter = ({ initialSeconds }: TimerProps) => {
	const [seconds, setSeconds] = useState(initialSeconds);

	useEffect(() => {
		const myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	useEffect(() => {
		if (seconds > 0) return;
		location.href = "/";
	}, [seconds]);

	return (
		<div>
			{seconds === 0 ? (
				<span class="text-bold text-2xl">Redirecting...</span>
			) : (
				<span class="text-bold text-2xl">
					We will automatically redirect you to the homepage in
					{" " + seconds} seconds.
				</span>
			)}
		</div>
	);
};

export default PageNotFoundCounter;
