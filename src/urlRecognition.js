export function findTypeofUrl(url) {
    if (url.includes("jxsh")) {
        let mangaName = url.replace("https://klz9.com/jxsh-", "")
        mangaName = mangaName.split("-chapter-")
        let chapter = mangaName[1].replace(".html", "")
        mangaName = mangaName[0]
        return {type:"chapter", chapter: chapter, mangaName: mangaName}
    } else if (url.includes("ybed")) {
        return {type:"manga", mangaName: url.replace("https://klz9.com/ybed-", "").replace(".html", "")}
    }
}