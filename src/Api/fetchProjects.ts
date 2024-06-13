import { IProjectResume } from 'Utils/Types'
export const fetchProjects = async (type: "projects" | "portfolio"): Promise<IProjectResume[]> => {
  const cacheString = localStorage.getItem(type);
  if (cacheString) {
    const cacheObj = JSON.parse(cacheString);
    if (new Date().getTime() < cacheObj.expire) return cacheObj.data;
  }

  const response = await fetch(`https://mywebsiteassets.s3.amazonaws.com/${type}Resumes.json`);
  console.log('fetchType');
  if (!response.ok) {
    throw new Error('Failed to fetch translations');
  }
  
  const data = await response.json();  
  const cacheTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000).getTime();
  localStorage.setItem(type, JSON.stringify({ data: data, expire: cacheTime }));
  return data;
};