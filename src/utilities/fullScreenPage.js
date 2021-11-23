
// Vérifie que la page occupe bien tout l'écran
// Resize la page dans le cas contraire

export default function fullScreenPage () {
    const page = document.querySelector(".page");
    const header = document.querySelector(".header-wrapper");
    const footer = document.querySelector("footer");

    const screenHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const pageHeight = parseFloat(getComputedStyle(page).height);
    const headerHeight = parseFloat(getComputedStyle(header).height);
    const footerHeight = parseFloat(getComputedStyle(footer).height);

    const margin = parseFloat(getComputedStyle(page).marginTop);
    
    if(pageHeight < screenHeight - headerHeight) {
        page.style.minHeight =(screenHeight - headerHeight - footerHeight - 2*margin) + "px";
    }
}