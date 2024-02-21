const puppeteer = require('puppeteer');

async function runGoogleSearch() {
  try {
    // Iniciar o navegador Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navegar até a página do Google
    await page.goto('https://www.google.com');
    
    // Aguardar até que a barra de pesquisa esteja pronta
    await page.waitForSelector('textarea[name="q"]');
    
    // Digitar a pesquisa "ExpertDev" na barra de pesquisa do Google
    await page.type('textarea[name="q"]', 'MillyArtesanato');
    
    // Pressionar Enter para iniciar a pesquisa
    await page.keyboard.press('Enter');
    
    // Aguardar até que os resultados da pesquisa sejam carregados
    await page.waitForSelector('h3');
    
    // Extrair os títulos dos resultados da pesquisa e imprimi-los
    const searchResults = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('h3').forEach(title => {
        results.push(title.textContent);
      });
      return results;
    });

    console.log('Resultados da pesquisa para "MillyArtesanato":');
    searchResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result}`);
    });
    
    // Fechar o navegador
    await browser.close();
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

// Executar a função principal
runGoogleSearch();
