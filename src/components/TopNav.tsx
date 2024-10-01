import { Link, useLocation } from "react-router-dom";
import { links } from "@src/app/data.ts";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const TopNav = () => {
	const location = useLocation();

	const currentItem = links.find(
		(item) => item.link === location.pathname.split("/")[1],
	);

	return (
		<div className="mb-[2.5rem] mt-[1.5rem] flex h-full w-full flex-row justify-between rounded-lg bg-gray-400 bg-opacity-20 pb-[0.5rem] pt-[0.5rem] outline outline-[0.1rem] outline-gray-300 drop-shadow-lg backdrop-blur-lg">
			<div className="ml-3 flex w-[20rem] flex-row items-center gap-2">
				<Link
					to="/"
					className="group font-bold uppercase text-gray-900 transition-all duration-300 ease-in-out"
				>
					<span className="bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_1px]">
						Learn React
					</span>
				</Link>
				{location.pathname === "/" ? (
					""
				) : (
					<>
						<ChevronRightIcon />
						<span className="text-sm">{currentItem?.title}</span>
					</>
				)}
			</div>
			<div className="mr-3 flex items-center text-xs">
				<em>Benjamin Dass</em>
			</div>
		</div>
	);
};

export default TopNav;
