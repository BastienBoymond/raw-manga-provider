import { Klz9Request } from "./getter.js";
import { printString, question } from "./printing.js";
import { Downloader } from "./downloader.js";


export class Searcher {
    constructor(mangaName) {
        this.klz9 = new Klz9Request()
        this.mangaName = mangaName
    }

    async searchManga(mangaName) {
        let res = await this.klz9.searchManga(mangaName)
        res = res[0].data
        for (let manga of res) {
            let index = res.indexOf(manga)
            printString(index + ": " + manga.primary, "1;33")
        }
        const answer = await question("Which manga do you want to download?: ", "1;33")
        if (answer == "exit") {
            return;
        }
        const manga = res[answer]
        mangaName = manga.onclick.replace("window.location='/ybed-", "").replace(".html'", "")
        const downloader = new Downloader(mangaName)
        await downloader.selectDowloadFormat()
    }
}