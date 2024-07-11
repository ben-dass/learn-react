import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectID: undefined,
		projects: [],
		tasks: [],
	});

	function handleStartAddProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectID: null,
			};
		});
	}

	function handleAddProject(projectData) {
		setProjectsState((prevState) => {
			const newProject = {
				...projectData,
				id: Math.random(),
			};

			return {
				...prevState,
				selectedProjectID: undefined,
				projects: [...prevState.projects, newProject],
			};
		});
	}

	function handleCancelAddProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectID: undefined,
			};
		});
	}

	function handleSelectProject(id) {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectID: id,
			};
		});
	}

	function handleDeleteProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectID: undefined,
				projects: prevState.projects.filter(
					(project) => project.id !== prevState.selectedProjectID
				),
			};
		});
	}

	function handleAddTask(taskText) {
		setProjectsState((prevState) => {
			const taskID = Math.random();
			const newTask = {
				text: taskText,
				projectID: prevState.selectedProjectID,
				id: taskID,
			};
			console.log(newTask);

			return {
				...prevState,
				tasks: [...prevState.tasks, newTask],
			};
		});
	}

	function handleDeleteTask() {}

	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectID
	);
	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);

	if (projectsState.selectedProjectID === null) {
		content = (
			<NewProject
				onAdd={handleAddProject}
				onCancel={handleCancelAddProject}
			/>
		);
	} else if (projectsState.selectedProjectID === undefined) {
		content = (
			<NoProjectSelected onStartAddProject={handleStartAddProject} />
		);
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
				onSelectProject={handleSelectProject}
			/>
			{content}
		</main>
	);
}

export default App;
