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

function runComponentTests() {
  // Adicionar título da seção
  const resultsContainer = document.getElementById('testResultsContent');
  const sectionTitle = document.createElement('h4');
  sectionTitle.className = 'font-bold text-blue-600 mb-2 text-lg mt-4';
  sectionTitle.textContent = 'Testes de Componentes';
  resultsContainer.appendChild(sectionTitle);

  // Teste do input de número de câmeras
  testar("COMPONENT - Input de número de câmeras deve aceitar valores", () => {
    const input = document.getElementById("numCameras");
    if (!input) throw new Error("Input de número de câmeras não encontrado");
    
    input.value = "3";
    if (input.value !== "3") {
      throw new Error("Input não aceitou o valor corretamente");
    }
  });

  // Teste do cálculo de valor estimado
  testar("COMPONENT - Cálculo de valor estimado deve atualizar display", () => {
    const input = document.getElementById("numCameras");
    const display = document.getElementById("estimatedValue");
    
    if (!input || !display) throw new Error("Elementos necessários não encontrados");
    
    input.value = "2";
    input.dispatchEvent(new Event("input"));
    
    if (!display.textContent.includes("R$")) {
      throw new Error("Display não mostra valor em reais");
    }
  });

  // Teste da calculadora de armazenamento
  testar("COMPONENT - Calculadora de armazenamento deve atualizar dias", () => {
    const numCameras = document.getElementById("calcNumCameras");
    const resolution = document.getElementById("calcResolution");
    const storageSize = document.getElementById("calcStorageSize");
    const daysDisplay = document.getElementById("estimatedRecordingDays");
    
    if (!numCameras || !resolution || !storageSize || !daysDisplay) {
      throw new Error("Elementos da calculadora não encontrados");
    }
    
    numCameras.value = "1";
    resolution.value = "1080p";
    storageSize.value = "1000";
    
    numCameras.dispatchEvent(new Event("input"));
    
    if (!daysDisplay.textContent.includes("dias")) {
      throw new Error("Display não mostra dias de gravação");
    }
  });

  // Teste do botão de formas de pagamento
  testar("COMPONENT - Botão de formas de pagamento deve alternar visibilidade", () => {
    const button = document.getElementById("togglePaymentMethods");
    const content = document.getElementById("paymentMethodsContent");
    
    if (!button || !content) throw new Error("Elementos de pagamento não encontrados");
    
    const initialState = content.classList.contains("hidden");
    button.click();
    
    if (content.classList.contains("hidden") === initialState) {
      throw new Error("Visibilidade do conteúdo não alternou");
    }
  });

  // Teste da consulta de CEP
  testar("COMPONENT - Consulta de CEP deve validar formato", () => {
    const cepInput = document.getElementById("cep");
    const consultaButton = document.getElementById("consultaCep");
    const resultado = document.getElementById("resultadoCep");
    
    if (!cepInput || !consultaButton || !resultado) {
      throw new Error("Elementos de CEP não encontrados");
    }
    
    cepInput.value = "123";
    consultaButton.click();
    
    if (!resultado.textContent.includes("inválido")) {
      throw new Error("Validação de CEP inválido não funcionou");
    }
  });
} 