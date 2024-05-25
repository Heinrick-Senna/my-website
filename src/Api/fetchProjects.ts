import IProjectResume from "Components/Utils/Type";
const endPoint = "http://localhost:8080";
export const fetchProjectsResumes = async (): Promise<IProjectResume[]> => {
  const cacheString = localStorage.getItem('projects');
  if (cacheString) {
    const cacheObj = JSON.parse(cacheString);
    if (new Date().getTime() < cacheObj.expire) return cacheObj.data;
  }

  const response = await fetch(endPoint + '/projectsResumes');
  console.log('fetchProjects');
  if (!response.ok) {
    throw new Error('Failed to fetch translations');
  }
  
  const data = await response.json();  
  const cacheTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000).getTime();
  localStorage.setItem('projects', JSON.stringify({ data: data, expire: cacheTime }));
  return data;
};

export const fetchProject = async (projectTitle:string): Promise<Record<string, any>> => {
  const cacheString = localStorage.getItem('projects_' + projectTitle);
  if (cacheString) {
    const cacheObj = JSON.parse(cacheString);
    if (new Date().getTime() < cacheObj.expire) return cacheObj.data;
  }

  const response = await fetch(`${endPoint}/projects`);
  console.log('fetchProjectView', projectTitle);
  if (!response.ok) {
    throw new Error('Failed to fetch translations');
  }
  
  let data = await response.json();  
  data = data[projectTitle];
  const cacheTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000).getTime();
  localStorage.setItem('projects_' + projectTitle, JSON.stringify({ data: data, expire: cacheTime }));
  return data;
};