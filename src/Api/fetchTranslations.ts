export const fetchTranslations = async (language: string): Promise<Record<string, string>> => {
  const endPoint = "http://localhost:8080/language_" + language;
  const cacheString = localStorage.getItem('language_'+language);
  if (cacheString) {
    const cacheObj = JSON.parse(cacheString);
    if (new Date().getTime() < cacheObj.expire) return cacheObj.data;
  }

  const response = await fetch(endPoint);
  console.log('fetchLanguage');
  if (!response.ok) {
    throw new Error('Failed to fetch translations');
  }

  const data = await response.json();  
  const cacheTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000).getTime();
  localStorage.setItem('language_'+language, JSON.stringify({ data: data, expire: cacheTime }));      
  return data;
};
