// function constructBaseData(dataUsers) {
//   globalUserList = dataUsers.results.map((person) => {
//     return {
//       name: person.name.first + ' ' + person.name.last,
//       gender: person.gender,
//       age: person.dob.age,
//       photo: person.picture.large
//     };
//   });
//   globalFilteredUser = [...globalUserList];
//   render();
//   //showData(globalUserList);

// }

// function showData(globalUserList) {
//   console.log('ShowData');
//   console.log(globalUserList);
//   let divUsers = document.querySelector('#usersFilter');
//   let resultFind = document.querySelector('#usersEstatistics');

//   let numbersFound = globalUserList.length;
//   let female = 0,
//     male = 0,
//     sumAge = 0,
//     averageAge = 0;

//   for (let index = 0; index < globalUserList.length; index++) {
//     if (globalUserList[index].gender === "female") {
//       female++;
//     } else {
//       male++;
//     }
//     sumAge = sumAge + globalUserList[index].age;
//     averageAge = sumAge / index;
//   }

//   divUsers.innerHTML = `<h2>Encontrados ${numbersFound}</h2>`;

//   resultFind.innerHTML = `
//        <h2>Estatísticas</h2>
//      <p> Mulheres ${female} </p>
//      <p> Homens ${male} </p>
//      <p> Soma das idades ${sumAge} </p>
//      <p> Média das idades ${averageAge} </p>
//    `;
// }