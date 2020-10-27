import get from 'axios';

const projectBaseUrl = 'http://localhost:8090/projects/';

const getProjectList = async () => {
    return await get(projectBaseUrl).then((response) => response.data._embedded.projects);
};

export {
    getProjectList
};
