// Função para executar os testes
function testar(nome, funcao) {
  const resultsContainer = document.getElementById('testResultsContent');
  const resultElement = document.createElement('div');
  resultElement.className = 'p-2 rounded border-b';
  
  try {
    funcao();
    resultElement.innerHTML = `
      <div class="flex items-center text-green-600">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${nome}</span>
      </div>
    `;
    console.log(`✅ ${nome} - Passou`);
  } catch (erro) {
    resultElement.innerHTML = `
      <div class="flex items-center text-red-600">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span>${nome} - ${erro.message}</span>
      </div>
    `;
    console.error(`❌ ${nome} - Falhou: ${erro.message}`);
  }
  
  resultsContainer.appendChild(resultElement);
}

// Função que roda todos os testes
function runUnitTests() {
  // Adicionar título da seção
  const resultsContainer = document.getElementById('testResultsContent');
  const sectionTitle = document.createElement('h4');
  sectionTitle.className = 'font-bold text-blue-600 mb-2 text-lg';
  sectionTitle.textContent = 'Testes Unitários';
  resultsContainer.appendChild(sectionTitle);
  
  // Testes de cálculo de valor total
  testar("UNIT - Cálculo de valor total com uma câmera", () => {
    const valor = calcularValorTotal(1, 25.99);
    if (valor !== 25.99) throw new Error("Esperado R$ 25,99");
  });

  testar("UNIT - Cálculo de valor total com múltiplas câmeras", () => {
    const valor = calcularValorTotal(3, 25.99);
    if (valor !== 77.97) throw new Error("Esperado R$ 77,97");
  });

  // Testes de cálculo de armazenamento
  testar("UNIT - Cálculo de dias de gravação 1080p", () => {
    const dias = calcularDiasGravacao(1, "1080p", "continuous", 1000);
    if (dias < 1) throw new Error("Deveria ter pelo menos 1 dia de gravação");
  });

  testar("UNIT - Cálculo de dias de gravação com detecção de movimento", () => {
    const dias = calcularDiasGravacao(1, "1080p", "motion", 1000);
    if (dias < 1) throw new Error("Deveria ter pelo menos 1 dia de gravação");
  });

  // Testes de validação de CEP
  testar("UNIT - Validação de CEP válido", () => {
    const cep = "88010000";
    if (!validarCEP(cep)) throw new Error("CEP válido não foi aceito");
  });

  testar("UNIT - Validação de CEP inválido", () => {
    const cep = "123";
    if (validarCEP(cep)) throw new Error("CEP inválido foi aceito");
  });

  // Testes de recomendação de câmeras
  testar("UNIT - Recomendação para casa pequena", () => {
    const recomendacao = getRecomendacaoCameras("small-house");
    if (!recomendacao.num || !recomendacao.types) {
      throw new Error("Recomendação incompleta");
    }
  });

  testar("UNIT - Recomendação para comércio", () => {
    const recomendacao = getRecomendacaoCameras("medium-commerce");
    if (!recomendacao.num || !recomendacao.types) {
      throw new Error("Recomendação incompleta");
    }
  });
}

// Funções auxiliares para os testes
function calcularValorTotal(numCameras, precoUnitario) {
  return numCameras * precoUnitario;
}

function calcularDiasGravacao(numCameras, resolucao, tipoGravacao, armazenamentoGB) {
  const bitrates = {
    "720p": 2,
    "1080p": 4,
    "4k": 8
  };
  const bitrate = bitrates[resolucao] || 4;
  const fatorGravacao = tipoGravacao === "motion" ? 0.5 : 1;
  const armazenamentoBits = armazenamentoGB * 8000;
  const bitsPorDia = bitrate * 60 * 60 * 24 * numCameras * fatorGravacao;
  return Math.floor(armazenamentoBits / bitsPorDia);
}

function validarCEP(cep) {
  return /^[0-9]{8}$/.test(cep);
}

function getRecomendacaoCameras(tipoAmbiente) {
  const recomendacoes = {
    "small-house": {
      num: "2-3",
      types: "1x Dome Interna, 1-2x Bullet Externa"
    },
    "medium-commerce": {
      num: "4-7",
      types: "2-3x Dome Interna, 2-4x Bullet Externa"
    }
  };
  return recomendacoes[tipoAmbiente] || { num: "0", types: "Nenhuma recomendação" };
}

