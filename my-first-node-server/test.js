import bcrypt from "bcrypt";

const testPassword = async () => {
    const storedHash = "$2b$10$z0nFj1Fv1hrBG.1VtJH9uNru9/CKOgeQttbOebYbn4skn3U3MCky"; // Ton hash actuel
    const passwordsToTest = ["admin", "admin123", "Admin123", "motdepasse", "test123"];

    for (const password of passwordsToTest) {
        const isMatch = await bcrypt.compare(password, storedHash);
        console.log(`Test avec "${password}" : ${isMatch ? "✔️ VALIDE" : "❌ INCORRECT"}`);
    }
};

testPassword();


const generateHash = async () => {
    const password = "Admin1234"; // Change ici par le mot de passe voulu
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Nouveau hash : ${hash}`);
};

generateHash();

