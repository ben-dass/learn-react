import { Link } from "react-router-dom";
import { useState } from "react";
import { links } from "@src/app/data.ts";

const Home = () => {
	const [hoveredTitle, setHoveredTitle] = useState("");

	return (
		<section className="flex flex-col gap-2">
			{links.map(({ title, link, description }) => (
				<div
					className="flex flex-row gap-10 text-sm"
					key={title}
				>
					<Link
						to={`/${link}`}
						className="group w-[6rem] text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900"
					>
						<span
							onMouseOver={() => setHoveredTitle(title)}
							onMouseOut={() => setHoveredTitle("")}
							className="bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_1px]"
						>
							{title}
						</span>
					</Link>
					<span
						className={`${hoveredTitle === title ? "text-gray-900" : "text-gray-300"} transition duration-300 ease-in-out`}
					>
						{description}
					</span>
				</div>
			))}
		</section>
	);
};

export default Home;
