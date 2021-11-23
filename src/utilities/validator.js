
// Validateur de formulaire

// Vérifie si la structure de l'email est valide
const isValidEmail = function(email) {
        const regex = /\S+@\S+\.\S+/
        let split = email.split("@");

        if(split.length !== 2) return false;
        if(split[0].length > 64 || split[1].length > 254) return false;
        
        return regex.test(email);
}

// Vérifie si la composition du nom est valide :
// longueur : 2 - 20
// pas de chiffre ou caractère spécial (excepté ' et - )
const isValidName = function(name) {
    if(name.length > 20) return false;

    let regex = /^[a-zA-ZÀ-ÿ\-\']{2,}$/; //eslint-disable-line
    return regex.test(name);
}

// Vérifie si le mot de passe est valide
// longueur : 8 - 50
// Minimum : 1 Majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial parmi #?!@$ %^&*
const isValidPassword = function(password) {
    if(password.length > 50) return false;
    if(password.length < 8) return false;

    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/;

    return regex.test(password)
}

module.exports = {
    isValidEmail,
    isValidName,
    isValidPassword
}