
const colors = {
    lightMode : {
        darker : "#a45c40",
        lighter : "#f6eee0",
        highlight : "#c38370",
        outline : "#913714"
    },
    darkMode : {
        darker : "#222124",
        lighter : "#2c2c2c",
        highlight : "#ffb331",
        outline : "#707070"
    }
}

const switchColorTheme = (darkMode = false) => {
    let root = document.querySelector(':root');
    let switchElem = document.querySelector('.switcher');
    if(darkMode){
        root.style.setProperty('--grey', colors.darkMode.darker);
        root.style.setProperty('--lightgrey', colors.darkMode.lighter);
        root.style.setProperty('--orange', colors.darkMode.highlight);
        root.style.setProperty('--outline', colors.darkMode.outline);
        switchElem?.classList.remove('switch-light');
        switchElem?.classList.add('switch-dark');
    } else {
        root.style.setProperty('--grey', colors.lightMode.darker);
        root.style.setProperty('--lightgrey', colors.lightMode.lighter);
        root.style.setProperty('--orange', colors.lightMode.highlight);
        root.style.setProperty('--outline', colors.lightMode.outline);
        switchElem?.classList.remove('switch-dark');
        switchElem?.classList.add('switch-light');
    }
}

module.exports = {
    colors,
    switchColorTheme
}