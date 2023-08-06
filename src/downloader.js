import { Klz9Request } from "./getter.js";
import { printString, question } from "./printing.js";
import { writeFile } from "fs/promises";
import { parse } from 'node-html-parser';
import fs from "fs";

export class Downloader {
    constructor(mangaName) {
        this.klz9 = new Klz9Request()
        this.mangaName = mangaName
    }

    getCid(chapterlist, chapter) {
        for (let chapt of chapterlist) {
            if (chapt.chapter == chapter) {
                return chapt.id
            }
        }
        return 0
    }

    async getManga() {
        let chapterlist = await this.klz9.getChapterList(this.mangaName);
        for (let chapt of chapterlist) {
            await this.getChapter(chapt.chapter, chapt.id)
        }
    }

    async getChapter(chapter, cid = 0) {
        printString("Downloading chapter " + chapter + " of " + this.mangaName, "1;33")
        if (cid == 0) {
            let chapterlist = await this.klz9.getChapterList(this.mangaName);
            cid = this.getCid(chapterlist, chapter)
        }
        let imglist = await this.klz9.getImgList(cid);
        const parsed = parse(imglist);
        let img = parsed.querySelectorAll("img");
        let imgArr = []
        for (let i of img) {
            if (i.getAttribute("alt").startsWith("Page")) {
                imgArr.push({page: i.getAttribute("alt").replace('Page ', ""), link: i.getAttribute("src")})
            }
        }
        for (let i of imgArr) {
            let img = await this.klz9.getImg(i.link);
            await fs.promises.mkdir(this.mangaName, { recursive: true });
            await fs.promises.mkdir(`${this.mangaName}/${chapter}`, { recursive: true });
            printString(`Downloading page ${i.page} of ${imgArr.length}`, "1;34")
            await writeFile(`${this.mangaName}/${chapter}/${i.page}.jpg`, Buffer.from(img));
        }
        printString(`Chapter ${chapter} of ${this.mangaName} downloaded!`, `1;32`)
    }

    async downloadFromAChapter(chapter) {
        let chapterlist = await this.klz9.getChapterList(this.mangaName);
        for (let chapt of chapterlist) {
            if (chapt.chapter >= parseInt(chapter)) {
                printString(chapt.chapter + " " + chapter, "1;33")

                await this.getChapter(chapt.chapter, chapt.id)
            }
        }
    }

    async selectDowloadFormat() {
        const answer = await question("Did you mean to download the whole manga? (y/n): ", "1;33")
        if (answer == "y" || answer == "yes") {
            printString("Downloading " + mangaName, "1;33")
            await this.getManga()
        } else {
            let answer = await question("Do you prefer to download from a certain chapter or download a selection of chapters\n1. Certain chapter\n2. Selection of chapters\nAnswer: ", "1;33")
            if (answer == "1") {
                answer = await question("From which chapter do you want to download chapters: ", "1;33")
                await this.downloadFromAChapter(answer)
            } else {
                const answer = await question("What chapter do you want to download?, (format - 1,2,3,4): ", "1;33")
                const chapters = answer.split(",")
                for (let chapter of chapters) {
                    await this.getChapter(chapter)
                }
            }
        }
    }
}