//
// Script que detecta o idioma do navegador e redireciona o usuário para o idioma correto.
//

document.addEventListener("DOMContentLoaded", function () {
    // console.log("Script language-redirect.js foi carregado!");

    // Definir a base URL da documentação
    const baseUrl = "/Documentation";

    // Detecta idiomas suportados
    const userLangs = navigator.languages || [navigator.language || navigator.userLanguage];
    const supportedLangs = ["en", "pt-br"];
    const defaultLang = "en";

    let detectedLang = defaultLang;
    for (let lang of userLangs) {
        let normalizedLang = lang.toLowerCase();
        if (supportedLangs.includes(normalizedLang)) {
            detectedLang = normalizedLang;
            break;
        }
    }

    // console.log("Idioma detectado:", detectedLang);

    // Se já estivermos na página correta, não redirecionamos
    if (window.location.pathname.startsWith(`${baseUrl}/${detectedLang}/`)) {
        // console.log("Já na página correta. Nenhum redirecionamento necessário.");
        return;
    }

    // Evita loops de redirecionamento
    if (window.location.pathname !== `${baseUrl}/`) {
        // console.log("Não estamos na página raiz. Nenhum redirecionamento.");
        return;
    }

    // Realiza o redirecionamento
    const newUrl = `${baseUrl}/${detectedLang}/`;
    // console.log("Redirecionando para:", newUrl);
    window.location.replace(newUrl);
});


