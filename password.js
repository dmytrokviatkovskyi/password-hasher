import bcrypt from 'bcrypt';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const saltRounds = 10;
const fileName = 'passwords.txt';
const inputPassword = process.argv[2];

// 1. Перевірка введення
if (!inputPassword) {
    console.error("Помилка: введіть пароль (node password.js <ваш_пароль>)");
    process.exit(1);
}

// 2. Логіка роботи
try {
    if (!existsSync(fileName)) {
        // Якщо файлу немає — створюємо новий хеш
        const hash = await bcrypt.hash(inputPassword, saltRounds);
        writeFileSync(fileName, hash);
        console.log(`✅ Пароль вперше встановлено. Хеш збережено у ${fileName}`);
    } else {
        // Якщо файл є — порівнюємо
        const storedHash = readFileSync(fileName, 'utf8').trim();
        const isMatch = await bcrypt.compare(inputPassword, storedHash);
        
        if (isMatch) {
            console.log("🔓 Авторизовано успішно!");
        } else {
            console.log("❌ Невірний пароль!");
        }
    }
} catch (err) {
    console.error("Помилка:", err.message);
}
