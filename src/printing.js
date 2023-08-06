import readline from "readline";

export function printString(str, bashColorCode) {
    console.log("\x1B[" + bashColorCode + "m"  + `${str}` + "\x1B[0m");
}

export  function question(question, bashColorCode) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question("\x1B[" + bashColorCode + "m" + `${question}`  + "\x1B[0m", (answer) => {
            rl.close()
            resolve(answer)
        })
    })
}