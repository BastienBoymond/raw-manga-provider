# raw-manga-provider
a script with it's api that provide to get japanese pages

## How to use

### Install
```bash
$ npm install
```

### Run
```bash
$ node index.js
```

this will request https://klz9.com/ 

if you want to request a manga 

```bash
$ node index.js -link https://klz9.com/ybed-amagami-san-chi-no-enmusubi.html
```

if you want to request a manga with a specific chapter

```bash
$ node index.js -link https://klz9.com/jxsh-amagami-san-chi-no-enmusubi-chapter-102.html 
```

if you want to search for a manga

```bash
$ node index.js -n amagami
```

then follow the instructions of the script

