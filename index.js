const STUDENTS_URL = 'https://my-json-server.typicode.com/paraplancrm/api/students';
const STATUSES_URL = 'https://my-json-server.typicode.com/paraplancrm/api/statuses';

initApp();

async function initApp() {
  const [students, statuses] = await fetchStudentsAndStatuses();
  console.log([students, statuses]);

  const studentsWithStatuses = students.map(student => {
    return {
      name: student.name,
      statusInfo: statuses.find(status => status.id === student.status),
    }
  });
  console.log(studentsWithStatuses);

  const activeStudents = studentsWithStatuses
    .filter(student => student.statusInfo.active)
    .sort(sortStudents);

  const noActiveStudents = studentsWithStatuses
    .filter(student => !student.statusInfo.active)
    .sort(sortStudents);

  showStudentsList('active', activeStudents);
  showStudentsList('no-active', noActiveStudents);
}

function fetchJson(url) {
  return fetch(url).then(response => response.json());
}

function fetchStudents() {
  return fetchJson(STUDENTS_URL);
}

function fetchStatuses() {
  return fetchJson(STATUSES_URL);
}

function fetchStudentsAndStatuses() {
  return Promise.all([fetchStudents(), fetchStatuses()]);
}

function sortStudents(a, b) {
  if (a.statusInfo.order > b.statusInfo.order) return 1;
  if (a.statusInfo.order < b.statusInfo.order) return -1;
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;

  return 0;
  
}

function showStudentsList(nodeId, students) {
  const ul = document.getElementById(nodeId);

  
  students.forEach(student => {
    const li = document.createElement('li');
    li.textContent = `имя: ${student.name}` + ";" + " " + `статус: ${student.statusInfo.name}`;
    ul.appendChild(li);
  })
}