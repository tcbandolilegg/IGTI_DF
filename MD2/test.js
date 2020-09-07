import {
  promises as fs
} from 'fs';

import {
  Console
} from 'console';

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let globalEstados = [];
let globalCidades = [];
let globalEstadosQTDCidades = [];

let globalCidadesEstados = []; // ID: Nome: UF:

let tamEstados = 0;
let UfFind = null;
let MenorFind = [];

async function trabPraticoMod2() {
  await createArrays(); //partUm();
  //await findLengthEstado(); //partDois();
  //await partTres();
  //await partQuatro();
  await partCinco();
  //await partSeis();
  //await partSete();
  //awaitpartOito();
}

trabPraticoMod2();

async function createArrays() {
  console.log('criando.. arrays');
  console.log(
    '\n1.Criar uma função que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, \ne o seu conteúdo será um array das cidades pertencentes a aquele estado, de acordo com o arquivo Cidades.json. \nO nome do arquivo deve ser o UF do estado, \npor exemplo: MG.json.'
  );

  try {
    globalCidades = await JSON.parse(
      await fs.readFile('./arqsJson/Cidades.json')
    );
    globalEstados = await JSON.parse(
      await fs.readFile('./arqsJson/Estados.json')
    );

    tamEstados = globalEstados.length;

    mergeCidadesEstados();
  } catch (err) {
    console.log(err);
  }
}

function mergeCidadesEstados() {
  console.log(
    '\npesquisando a sigla de estados e montando o array Cidades com sigla dos estados'
  );
  globalCidades.forEach((tempRegister3) => {
    const findEstado = globalEstados.find(
      (findEstado) => findEstado.ID === tempRegister3.Estado
    );
    globalCidadesEstados.push({
      ID: tempRegister3.ID,
      Nome: tempRegister3.Nome,
      UF: findEstado.Sigla,
    });
  });
  console.log(globalCidadesEstados);
  jsonEstates(tamEstados);
}

function jsonEstates(tamEstados) {
  console.log('montando JSON estado');
  globalEstados.forEach((tempEstado) => {
    let writeEstado = globalCidadesEstados.filter(
      (cidades) => cidades.UF === tempEstado.Sigla
    );
    console.log('Gravando estado de ', tempEstado.Sigla);

    fs.writeFile(
      `${tempEstado.Sigla}.json`,
      JSON.stringify(writeEstado, null, 2)
    );

    globalEstadosQTDCidades.push({
      Sigla: tempEstado.Sigla,
      NumCities: writeEstado.length
    });
  });
}

function partTres() {
  console.log(
    '3.Criar  um  método  que  imprima  no  console um  array  com  o  UF  \ndos  cinco estados que mais possuem cidades, seguidos da quantidade, \nem ordem decrescente.Você pode usar a função criadano tópico 2.\nExemplo de impressão: [“UF-93”, “UF-82”, “UF-74”, “UF-72”, “UF-65”]'
  );

  globalEstadosQTDCidades.sort((a, b) => {
    return b.NumCities - a.NumCities;
  });

  console.log(globalEstadosQTDCidades.slice(0, 4));
  // fim 3
}

function partQuatro() {
  console.log(
    '\n4.Criar  um  método  que  imprima  no  console  um  array  com  o  UF \ndos cinco  estados que  menos  possuem  cidades,  seguidos  da  quantidade, \nem  ordem  decrescente. Você pode usar a função criada no \ntópico 2. Exemplo de impressão: [“UF-30”, “UF-27”, “UF-25”, “UF-23”, “UF-21”]\n'
  );

  globalEstadosQTDCidades.sort((a, b) => {
    return a.NumCities - b.NumCities;
  });
  console.log('sorteado crescente');
  console.log('separando os 5 primeiros com menos cidades');
  let tempMenor = globalEstadosQTDCidades.slice(0, 5);
  console.log('sorteado decrescente');
  tempMenor.sort((a, b) => {
    return b.NumCities - a.NumCities;
  });
  console.log(tempMenor);

  // fim 4
}

function partCinco() {
  console.log(
    '5.Criar um método que imprima no console um array com \na cidade de maior nome de cada estado, \nseguida de seu UF. Por exemplo: [“Nome da Cidade –UF”, “Nome da Cidade –UF”, ...].'
  );
  let cidadesMaior = [];

  globalEstados.forEach((tempEstado) => {
    console.log('Estado', tempEstado);

    let tempCidades = globalCidadesEstados.filter(
      (tempCidades) => tempCidades.UF === tempEstado.UF
    );
    console.log('tempCidades', tempCidades);

    tempCidades.sort((a, b) => {
      return b.tempCidades.Nome.length - a.tempCidades.Nome.length;
    });
    cidadesMaior.push({
      Nome: tempCidades[0].Nome,
      UF: tempPositionMenor.Sigla,
    });
    console.log(cidadesMaior);
    /// fim 5
  });
}

function partSeis() {
  // (  ) 6.Criar um método que imprima no console um array com a cidade
  //de menor nome de cada estado, seguida de seu UF.
  // Por exemplo: [“Nome da Cidade –UF”, “Nome da Cidade –UF”, ...].
  // fim 6
}

function partSete() {
  // //********************** */
  //     (  ) 7.Criar um método que imprima no console a cidade de maior nome entre todos
  // os estados, seguido do seu UF.
  // Exemplo: “Nome da Cidade -UF".
  globalCidadesEstados.sort((a, b) => {
    return b.Nome.length - a.Nome.length;
  });
  console.log(globalCidadesEstados);
  //console.log(globalCidadesEstados[0].Nome, " - ", globalCidadesEstados[0].UF);

  // FIM 7
}

function partOito() {
  // (  ) 8.Criar um método que imprima no console a cidade de menor nome entre
  // todos os estados, seguido do seu UF.
  // Exemplo: “Nome da Cidade -UF".

  // //************************ */
  globalCidadesEstados.sort((a, b) => {
    return a.Nome.length - b.Nome.length;
  });

  // console.log(globalCidadesEstados[0].Nome), " - ", globalCidadesEstados[0].UF);

  // FIM 8
}

function findLengthEstado() {
  // 2.Criar uma função que recebe como parâmetro o UF do estado,
  // realize a leitura do arquivo JSON correspondente e retorne a quantidade
  // de cidades daquele estado.

  pergunta();

  function pergunta() {
    rl.question(
      '\nPesquisa de número de cidades d e Um Estado.\nDigite a Sigla: (P = para parar) ',
      (UfFind) => {
        if (UfFind.toLocaleLowerCase() === 'p') {
          rl.close();
        } else {
          const findEstado2 = globalEstados.find(
            (findEstado2) => findEstado2.Sigla === UfFind.toUpperCase()
          );
          if (findEstado2 != null) {
            lerJson(findEstado2.Sigla);
            pergunta();
          } else {
            console.log('Para  parar digite <P> ou um sigla válida');
            pergunta();
          }
        }
      }
    );
  }
}

async function lerJson(recSigla) {
  try {
    MenorFind = await JSON.parse(await fs.readFile(`${recSigla}.json`));
    let totalCidades = MenorFind.length;
    if (totalCidades === 0) {
      console.log('\nNão existem cidades para este estado');
    } else {
      console.log('\nO estado do', recSigla, ' possui ', totalCidades);
    }
  } catch (err) {
    console.log(err);
  }
}