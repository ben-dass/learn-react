import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeoout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		const timer = setTimeout(onTimeoout, timeout);

		return () => {
			clearTimeout(timer);
		};
	}, [timeout, onTimeoout]);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime((prevRemainingtime) => prevRemainingtime - 100);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<progress
			id="question-time"
			max={timeout}
			value={remainingTime}
		/>
	);
}
