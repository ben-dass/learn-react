import { createBrowserRouter } from "react-router-dom";
import App from "@src/App.tsx";
import RTK_P1 from "@features/rtk_p1/RTK_P1.tsx";
import NotFound from "@features/NotFound.tsx";
import Home from "@components/Home.tsx";
import RTK_P2 from "@features/rtk_p2/RTK_P2.tsx";
import AddPostForm from "@features/rtk_p2/AddPostForm.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "rtk_p1",
						element: <RTK_P1 />,
					},
					{
						path: "rtk_p2",
						children: [
							{
								index: true,
								element: <RTK_P2 />,
							},
							{
								path: "add_post",
								element: <AddPostForm />,
							},
						],
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default router;
