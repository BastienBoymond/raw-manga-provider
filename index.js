import { printString, question } from "./src/printing.js";
import { findTypeofUrl } from "./src/urlRecognition.js";
import { Downloader } from "./src/downloader.js";
import { Searcher } from "./src/searcher.js";


async function usage() {
    printString("Usage: node test.js <params>", "1;33")
    printString("Params:", "1;33")
    printString("  -h, --help: Show this help message", "1;33")
    printString("  -u, -l, --url, --link: URL of the manga or one chapter", "1;33")
    printString("  -n, --name: Name of the manga", "1;33")
}


async function main() {
    let argv = process.argv.slice(2)
    if (argv.length == 0 || argv.length != 2) {
        usage()
    } else {
        if (process.argv.includes("--url") || process.argv.includes('--link') || process.argv.includes('-l') ||  process.argv.includes('-u')) {
            const urlTypes = findTypeofUrl(argv[1])
            const downloader = new Downloader(urlTypes.mangaName)
            if (urlTypes.type == "chapter") {
                await downloader.getChapter(urlTypes.chapter)
            } else if (urlTypes.type == "manga") {
                await downloader.selectDowloadFormat()
            }
            
        } else if (process.argv.includes("--name") || process.argv.includes('-n')) {
            const search = new Searcher(argv[1])
            search.searchManga(argv[1])
        }
    }
    return;

}

main()