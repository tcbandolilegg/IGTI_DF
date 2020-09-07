import { promises as fs } from 'fs';

import { Console } from 'console';

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
let UFFind = null;
let MenorFind = [];

let cidadesMenor = [];
let cidadesMaior = [];

async function trabPraticoMod2() {
  await createArrays(); //partUm();
  //await findLengthEstado(); //partDois();
  //await partTres();
  //await partQuatro();
  //await partCinco();
  //await partSeis();
  //await partSete();
  await partOito();
  console.log('fim');
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
    '\npesquisando a UF de estados e montando o array Cidades com UF dos estados'
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

  jsonEstates(tamEstados);
}

function jsonEstates(tamEstados) {
  console.log('montando JSON estado');
  globalEstados.forEach((tempEstado) => {
    let writeEstado = globalCidadesEstados.filter(
      (cidades) => cidades.UF === tempEstado.Sigla
    );

    fs.writeFile(
      `${tempEstado.Sigla}.json`,
      JSON.stringify(writeEstado, null, 2)
    );

    globalEstadosQTDCidades.push({
      UF: tempEstado.Sigla,
      NumCities: writeEstado.length,
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

  console.log(globalEstadosQTDCidades.slice(0, 5));
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

  globalEstados.forEach((tempEstado5) => {
    let tempMaior = globalCidadesEstados.filter(
      (cidades5) => cidades5.UF === tempEstado5.Sigla
    );

    tempMaior.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });

    cidadesMaior.push({
      Nome: tempMaior[0].Nome,
      UF: tempEstado5.Sigla,
    });
    console.log(cidadesMaior);
  });

  // fim 5
}

function partSeis() {
  console.log(
    '6.Criar um método que imprima no console um array com a cidade\nde menor nome de cada estado, seguida de seu UF. \nPor exemplo: [“Nome da Cidade –UF”, “Nome da Cidade –UF”, ...].'
  );

  globalEstados.forEach((tempEstado6) => {
    let tempMenor = globalCidadesEstados.filter(
      (cidades6) => cidades6.UF === tempEstado6.Sigla
    );

    tempMenor.sort((a, b) => {
      return a.Nome.length - b.Nome.length;
    });

    cidadesMenor.push({
      Nome: tempMenor[0].Nome,
      UF: tempEstado6.Sigla,
    });
    console.log(cidadesMenor);
  });

  // fim 6
}

function partSete() {
  console.log(
    '7.Criar um método que imprima no console a cidade de maior nome \nentre todos os estados, seguido do seu UF.\nExemplo: Nome da Cidade -UF.'
  );

  globalCidadesEstados.sort((a, b) => {
    return b.Nome.length - a.Nome.length;
  });
  console.log(
    'A cidade de Nome com Maior tamanho fica no estado de sigla',
    globalCidadesEstados[0].UF,
    'e se chama',
    globalCidadesEstados[0].Nome
  );

  // FIM 7
}

function partOito() {
  console.log(
    '8.Criar um método que imprima no console a cidade de menor nome \nentre todos os estados, seguido do seu UF. \nExemplo: Nome da Cidade -UF.'
  );
  ///peguei meu array completo sortiei em ordem crescente por Nome,  e  coloquei em tempEscolhendoMenores
  globalCidadesEstados.sort((a, b) => {
    return a.Nome.length - b.Nome.length;
  });
  let menorTamanho = globalCidadesEstados[0].Nome.length;
  console.log(menorTamanho);
  let tempEscolhendoMenores = globalCidadesEstados.filter(
    (cidadesMenores) => cidadesMenores.Nome.length === menorTamanho
  );
  console.log(cidadesMenores);

  tempEscolhendoMenores.sort((a, b) => {
    return a.Nome - b.Nome;
  });
  console.log(
    'A cidade de Nome com Menor tamanho fica no estado de sigla',
    tempEscolhendoMenores[0].UF,
    'e se chama',
    tempEscolhendoMenores[0].Nome
  );

  // FIM 8
}

function findLengthEstado() {
  // 2.Criar uma função que recebe como parâmetro o UF do estado,
  // realize a leitura do arquivo JSON correspondente e retorne a quantidade
  // de cidades daquele estado.

  pergunta();

  function pergunta() {
    rl.question(
      '\nPesquisa de número de cidades d e Um Estado.\nDigite a UF: (P = para parar) ',
      (UFFind) => {
        if (UFFind.toLocaleLowerCase() === 'p') {
          rl.close();
        } else {
          const findEstado2 = globalEstados.find(
            (findEstado2) => findEstado2.UF === UFFind.toUpperCase()
          );
          if (findEstado2 != null) {
            lerJson(findEstado2.UF);
            pergunta();
          } else {
            console.log('Para  parar digite <P> ou um UF válida');
            pergunta();
          }
        }
      }
    );
  }
}

async function lerJson(recUF) {
  try {
    MenorFind = await JSON.parse(await fs.readFile(`${recUF}.json`));
    let totalCidades = MenorFind.length;
    if (totalCidades === 0) {
      console.log('\nNão existem cidades para este estado');
    } else {
      console.log('\nO estado do', recUF, ' possui ', totalCidades);
    }
  } catch (err) {
    console.log(err);
  }
}
