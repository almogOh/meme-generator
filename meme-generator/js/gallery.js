'use strict'

var gImgs

function init() {
    gImgs = pushImages();
    renderImages(gImgs);
}

function pushImages() {
    var imgs = []

    for (var i = 1; i < 19; i++) {
        imgs.push(createImage(`./img/memes/${i}.jpg`, 'happy'))
    }

    return imgs
}

function createImage(url, searchWord) {
    return {
        id: makeId(),
        url,
        searchWord,
    }
}

function renderImages(imgs) {
    var strHtml = imgs.map(function (img, idx) {
        return `<img id='${img.id}' src='${img.url}' onclick="memeEditor(${img.id},this)"/>`
    }).join(' ')
        
    document.querySelector('.grid-container').innerHTML = strHtml;
}
