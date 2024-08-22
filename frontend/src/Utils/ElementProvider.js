import ProjectContext from "../Contexts/ProjectContext";

export function ElementProvider({ children, values }) {
  const {
    user,
    setUser,
    users,
    setUsers,
    allProjects,
    setAllProjects,
    project,
    setProject,
    notifications,
    setNotifications,
  } = values;
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
