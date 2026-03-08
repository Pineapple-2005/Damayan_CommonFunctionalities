const byId = (id) => {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Expected element with id: ${id}`);
    }

    return element;
};

const viewReportsBtn = byId('viewReportsBtn');
const reportIncidentBtn = byId('reportIncidentBtn');

viewReportsBtn.addEventListener('click', () => {
    window.location.assign('/reports');
});

reportIncidentBtn.addEventListener('click', () => {
    window.location.assign('/incident');
});
