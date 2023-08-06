import fetch from "node-fetch";

export class Klz9Request {
    klz9 = "https://klz9.com/";

    constructor() {}

    async searchManga(mangaName) {
        const res = await fetch(
            `https://klz9.com/app/manga/controllers/search.single.php?q=${mangaName}`,
            {
                referrer: this.klz9,
            }
        );
        const data = await res.json();
        return data;
    }

    async getChapterList(mangaName) {
        const res = await fetch(
            `https://klz9.com/app/manga/controllers/cont.listChapters.php?manga=${mangaName}`,
            {
                referrer: this.klz9,
            }
        );
        const data = await res.json();
        return data;
    }

    async getImgList(cid) {
        const res = await fetch(
            `https://klz9.com/app/manga/controllers/cont.listImg.php?cid=${cid}`,
            {
                referrer: this.klz9,
            }
        );
        const data = await res.text();
        return data;
    }

    async getImg(url) {
        const res = await fetch(url, {
            referrer: this.klz9,
        });
        const data = await res.arrayBuffer();
        return data;
    }
}