const byId = <T extends HTMLElement>(id: string): T => {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Expected element with id: ${id}`);
    }

    return element as T;
};

const viewReportsBtn = byId<HTMLButtonElement>('viewReportsBtn');
const reportIncidentBtn = byId<HTMLButtonElement>('reportIncidentBtn');

viewReportsBtn.addEventListener('click', () => {
    window.location.assign('/reports');
});

reportIncidentBtn.addEventListener('click', () => {
    window.location.assign('/incident');
});