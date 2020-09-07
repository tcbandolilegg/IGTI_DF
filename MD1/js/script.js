let globalFilteredUsers = [];
let divUsers = null;
let divResultFind = null;


let totalUsersFemale = 0;
let totalUsersMale = 0;
let totalAge = 0;
let mediaAge = 0;
let usersFound = 0;

let totalUsersFemaleShow = null;
let totalUsersMaleShow = null;
let totalAgeShow = null;
let mediaAgeShow = null;
let tabUserListShow = null;
let countUsersShow = null;

let numberFormat = Intl.NumberFormat('pt-BR');

function start() {
  fetchUsers();
  initialAreas();
  hideSpinner();
  configFilter();
}

function initialAreas() {
  totalUsersFemaleShow = document.querySelector('#usersFemale');
  totalUsersMaleShow = document.querySelector('#usersMale');
  totalAgeShow = document.querySelector('#usersSumAge');
  mediaAgeShow = document.querySelector('#usersMediaAge');
  tabUserListShow = document.querySelector('#tabUsers');
  countUsersShow = document.querySelector('#usersFound');
}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();
    setTimeout(() => {
      console.log('promiseUsers resolvida');
      resolve(users);
    }, 1000);
  });
}

async function fetchUsers() {
  const resource = await fetch('./js/api.js');
  const json = await resource.json();

  globalUsers = json.results.map(({
    name,
    gender,
    dob,
    picture
  }) => {
    return {
      name: name.first + ' ' + name.last,
      gender: gender,
      age: dob.age,
      photo: picture.large,
    };
  });

  console.log('creating...');
  render(globalUsers);
}

function render(globalUsers) {
  sortUsers(globalUsers);
  renderUsersList();
  renderSummary(female, male, sumAge, averageAge);
}

function sortUsers(globalUsers) {
  globalUsers.sort((a, b) => a.name.localeCompare(b.name));
  globalFilteredUsers = [...globalUsers];
  console.log("sorting...");
}

function renderUsersList() {
  usersFound = globalFilteredUsers.length;
  countUsersShow.textContent = formatNumber(usersFound);
  let usersHTML = "<div>";
  console.log("rendering...");

  female = 0;
  male = 0;
  sumAge = 0;
  averageAge = 0.00;

  globalFilteredUsers.forEach(user => {
    const {
      name,
      photo,
      age,
      gender
    } = user;

    sumAge = sumAge + age;
    averageAge = sumAge / usersFound;
    if (gender === "female") {
      female++;
    } else {
      male++;
    };

    const userHTML = `
          <div class='users'>
               <div class="userItemList card">
                 <img src="${photo}" alt="${name}">
                 <span>${name} </span>  
                 <span>, ${age} anos  </span>  
               </div>  
          </div>
       `;
    usersHTML += userHTML;
  });

  tabUserListShow.innerHTML = usersHTML;
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  console.log("Runing spinner...");
  // A class hide faz parte do Materialize
  spinner.classList.add('hide');
}

function configFilter() {
  const buttonFilter = document.querySelector('#buttonFilter');
  const inputFilter = document.querySelector('#inputFilter');
  console.log("Configuring Filter...");

  inputFilter.addEventListener('keyup', handleFilterKeyUp);
  buttonFilter.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.toLowerCase().trim();
  console.log("Cliking Fiter...");

  globalFilteredUsers = globalUsers.filter((item) => {
    return item.name.toLowerCase().includes(filterValue);

  });
  renderUsersList();
  renderSummary(female, male, sumAge, averageAge);
}

function handleFilterKeyUp({
  key
}) {
  //const { key } = event;
  if (key !== 'Enter') {
    return;
  }
  handleButtonClick();
}
// 
start();

function renderSummary(female, male, sumAge, averageAge) {
  totalUsersFemaleShow.textContent = formatNumber(female);
  totalUsersMaleShow.textContent = formatNumber(male);
  totalAgeShow.textContent = formatNumber(sumAge);
  mediaAgeShow.textContent = formatNumber(averageAge);
}

function formatNumber(number) {
  return numberFormat.format(number);
}