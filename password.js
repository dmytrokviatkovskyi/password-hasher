import bcrypt from "bcryptjs";
import { readFile, writeFile } from "fs/promises";

const saltRounds = 10;
const myPlaintextPassword = process.argv[2];

if (!myPlaintextPassword) {
    console.log("Please provide a password as an argument");
    process.exit(1);
}

const testHashing = async () => {
    let data = '';

    try {
        data = (await readFile('password.txt', 'utf-8')).trim();
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error("Read error:", error.message);
            return;
        }
    }

    if (!data) {
        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        await writeFile('password.txt', hash);
        console.log('Password hashed and saved');
    } else {
        const isMatch = await bcrypt.compare(myPlaintextPassword, data);

        console.log(isMatch ? 'Password is correct' : 'Password is incorrect');
    }
};

testHashing();
