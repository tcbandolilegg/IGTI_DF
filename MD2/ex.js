import {
  promises as fs,
  writeFile
} from 'fs';
import {
  Console
} from 'console';

createArrays();

let globalEstados = [];
let globalCidades = [];
let tempRegister3 = [];
let globalTempResultado = [];

let globalCidadesEstados = [];

let tamEstados = 0;
let tamCidades = 0;

console.log('criando.. arrays');

async function createArrays() {
  try {
    globalCidades = JSON.parse(await fs.readFile('./arqsJson/Cidades.json'));
    //console.log(globalCidades);

    globalEstados = JSON.parse(await fs.readFile('./arqsJson/Estados.json'));
    //console.log(globalEstados);

    tamCidades = globalCidades.length;
    tamEstados = globalEstados.length;
    //    forEach1();
    //    forEach2();
    forEach3();

    //    mergeCidadesEstados(tamEstados, tamCidades);
  } catch (err) {
    console.log(err);
  }
}

// function mergeCidadesEstados(tamEstados, tamCidades) {
//   globalCidadesEstados = [];
//   console.log('mesclando dados...');
//   for (let indexCid = 0; indexCid < tamCidades; indexCid++) {
//     for (let indexEst = 0; indexEst < tamEstados; indexEst++) {
//       if (globalEstados[indexEst].ID === globalCidades[indexCid].Estado) {
//         globalCidadesEstados.push({
//           chave: globalCidades[indexCid].ID,
//           Nome: globalCidades[indexCid].Nome,
//           UF: globalEstados[indexEst].Sigla,
//         });
//         break;
//       }
//     }
//   }
//   console.log(globalCidadesEstados);
// }

function forEach1() {
  globalEstados.forEach((tempRegister1) => {
    console.log('forEach1');
    console.log(tempRegister1);
  });
}

function forEach2() {
  globalEstados.forEach((tempRegister2, tempPosition2) => {
    console.log('forEach2');
    console.log(tempPosition2);
    console.log(tempRegister2);
  });
}

function forEach3() {
  console.log('forEach3');
  globalCidades.forEach((tempRegister3, tempPosition3, tempArray3) => {
    //console.log(tempRegister3);
    const findEstado = globalEstados.find((findEstado) => findEstado.ID === tempRegister3.Estado);

    const nameArray = "globalTempResultado" + `${findEstado.Sigla}`;
    console.log(nameArray);
    globalTempResultado.push({
      ID: tempRegister3.ID,
      Nome: tempRegister3.Nome,
      SiglaEstado: findEstado.Sigla
    });
    fs.writeFile(`${findEstado.Sigla}.json`, JSON.stringify(globalTempResultado, null, 2));

    console.log(globalTempResultado.length);
    // console.log(globalTempResultado);
  });
}

function mergeCidadesEstados(tamEstados, tamCidades) {
  globalCidadesEstados = [];
  console.log('mesclando dados...');
  for (let indexCid = 0; indexCid < tamCidades; indexCid++) {
    // console.log(indexCid);
    // console.log(globalCidades[indexCid]);
    for (let indexEst = 0; indexEst < tamEstados; indexEst++) {
      // console.log("indexEst " + indexEst);
      // console.log("indexCid " + indexCid);
      // console.log(globalCidades[indexCid]);
      // console.log(globalEstados[indexEst]);
      if (globalEstados[indexEst].ID === globalCidades[indexCid].Estado) {
        // console.log("encontreio estado");
        // console.log(globalEstados[indexEst].ID);
        // console.log(globalCidades[indexCid].Estado + " , " + globalCidades[indexCid].Nome + " , " + globalEstados[indexEst].Sigla);
        globalCidadesEstados.push({
          chave: globalCidades[indexCid].ID,
          Nome: globalCidades[indexCid].Nome,
          UF: globalEstados[indexEst].Sigla,
        });
        //console.log("saindo do for de estado");
        break;
      }
    }
  }
  console.log(globalCidadesEstados);
}