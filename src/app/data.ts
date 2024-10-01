export interface linkItem {
	title: string;
	link: string;
	description: string;
}

export const links: linkItem[] = [
	{
		title: "RTK Part 1",
		link: "rtk_p1",
		description: "Basic redux toolkit introductory.",
	},
	{
		title: "RTK Part 2",
		link: "rtk_p2",
		description: "Multi component redux toolkit usage.",
	},
	{
		title: "RTK Query Part 1",
		link: "rtk_query_p1",
		description: "RTK Query CRUD example app.",
	},
	{
		title: "RTK Query Part 2",
		link: "rtk_query_p2",
		description: "RTK Query advanced app example.",
	},
];
