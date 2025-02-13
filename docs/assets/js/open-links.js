//
// Script que carrega todos os links para sites externos de uma página e os altera para abrirem em outra aba do navegador.
//

(function () {
    document.addEventListener("DOMContentLoaded", function () {
    // Observa mudanças no DOM, para lidar com carregamento dinâmico.
        const links = document.querySelectorAll("a[href^='http']"); // Captura http e https.
        links.forEach(function (link) {
            if (!link.href.includes(window.location.hostname)) {    // Verifica se link é externo.
                link.setAttribute("target", "_blank");              // Abre em nova aba.
                link.setAttribute("rel", "noopener noreferrer");    // Melhora a segurança.
            }
        });
    });
})();

