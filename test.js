import fetch from "node-fetch";
import { writeFile } from "fs/promises";
import { parse } from 'node-html-parser';

const klz9 = "https://klz9.com/";

async function searchManga(mangaName) {
    const res = await fetch(
        `https://klz9.com/app/manga/controllers/search.single.php?q=${mangaName}`,
        {
            referrer: klz9,
        }
    );
    const data = await res.json();
    return data;
}

async function getChapterList(mangaName) {
    const res = await fetch(
        `https://klz9.com/app/manga/controllers/cont.listChapters.php?manga=${mangaName}`,
        {
            referrer: klz9,
        }
    );
    const data = await res.json();
    return data;
}

async function getImgList(cid) {
    const res = await fetch(
        `https://klz9.com/app/manga/controllers/cont.listImg.php?cid=${cid}`,
        {
            referrer: klz9,
        }
    );
    const data = await res.text();
    return data;
}

async function getImg(url) {
    const res = await fetch(url, {
        referrer: klz9,
    });
    const data = await res.arrayBuffer();
    return data;
}

async function requestklz9() {
    let url = process.argv.slice(2)[0];
    let mangaName = url.replace("https://klz9.com/jxsh-", "")
    mangaName = mangaName.split("-chapter-")
    let chapter = mangaName[1].replace(".html", "")
    mangaName = mangaName[0]
    let chapterlist = await getChapterList(mangaName);
    let cid = 0
    for (let chapt of chapterlist) {
        console.log(chapt.chapter);
        if (chapt.chapter == chapter) {
            cid = chapt.id
            break
        }
    }

    console.log(cid);
    let imglist = await getImgList(cid);
    console.log(imglist);
    const parsed = parse(imglist);
    let img = parsed.querySelectorAll("img");
    let imgArr = []
    for (let i of img) {
        if (i.getAttribute("alt").startsWith("Page")) {
            console.log(i.getAttribute("src"));
            imgArr.push({page: i.getAttribute("alt").replace('Page ', ""), link: i.getAttribute("src")})
        }
    }
    for (let i of imgArr) {
        let img = await getImg(i.link);
        await writeFile(`${i.page}.jpg`, Buffer.from(img));
    }
}

requestklz9();