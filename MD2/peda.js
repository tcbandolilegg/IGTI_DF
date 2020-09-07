function findLengthEstado() {
  // 2.Criar uma função que recebe como parâmetro o UF do estado, 
  // realize a leitura do arquivo JSON correspondente e retorne a quantidade 
  // de cidades daquele estado.


  function pergunta() {
    rl.question("\nPesquisa de número de cidades d e Um Estado.\nDigite a Sigla: (P = para parar) ", UfFind => {
        const findEstado = globalEstados.find(
          (findEstado) => findEstado.Sigla === UfFind);
        if (findEstado.Sigla != "") {
          console.log(findEstado.Sigla);
          if (UfFind.toLocaleLowerCase() === "p") {
            rl.close();
          } else {
            //console.log(cls);
            console.log("Para  parar digite <P> ou um sigla válida");
            pergunta();
          }
        } else {
          const temEstadoFind = [];
          tempEstadoFind = JSON.parse(fs.readFile(`${UfFind}.json`));
          let totalCidades = tempEstadoFind.length;
          // console.log(globalCidades);
          if (tempEstadoFind.length === 0) {
            console.log("Não existem cidades para este estado");
          } else {
            console.log(totalCidades);
          }
        }
      }
      pergunta();
    }
  });
}
}