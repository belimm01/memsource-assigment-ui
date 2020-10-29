import axios from 'axios';

const projectBaseUrl = 'http://localhost:8090/projects';

const getProjectList = async () => {
    return await axios.get(projectBaseUrl).then((response) => response.data._embedded.projects);
};

const addProject = async (project) => {
    await axios.post(projectBaseUrl, project)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
};

const updateProject = async (project) => {
    await axios.put(projectBaseUrl + '/' + project.id, {project: project})
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
};

const isDueDateValid = (date) => {
    return new Date(date) > new Date().getDate();
};

const getFormattedTargetLanguages = (project) => {
    return project.targetLanguages.split(',');
};

const getSummary = async (projects) => {
    const result = {
        countByStatus: {},
        countAfterDueDate: countAfterDueDate([...projects]),
        prominentLanguage: mostFrequentSourceLanguage([...projects]),
    }
    const statusArray = projects.map(p => p.status);
    result.countByStatus = countOccurrences(statusArray);

    return result;
}

const countAfterDueDate = (arr) => {
    const today = new Date();
    return arr.filter(p => new Date(p.dateDue) < today).length;
}

const mostFrequentSourceLanguage = (arr) => {
    return arr.sort((a, b) =>
        arr.filter(v => v.sourceLanguage === a.sourceLanguage).length
        - arr.filter(v => v.sourceLanguage === b.sourceLanguage).length
    ).pop().sourceLanguage;
}

const countOccurrences = (arr) => {
    let counts = {};
    for (let i = 0; i < arr.length; i++) {
        let status = arr[i];
        counts[status] = counts[status] ? counts[status] + 1 : 1;
    }
    return counts;
}

export {
    getProjectList,
    getSummary,
    addProject,
    updateProject,
    getFormattedTargetLanguages,
    isDueDateValid
};
