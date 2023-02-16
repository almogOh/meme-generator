'use strict'

var gSelectedImgURL = ''
var gTexts = []
var gPlaceText = 0
var gMaxLine = 0
var gCtx
var gImgObj

function memeEditor(url) {
    updateSelectedImgURL(url)
    changeDiv()
    gTexts.push(createText())
    renderCanvas()
    renderMemeEditor()
}

function createText(){
    return {
        text: 'Add Your Text',
        x: 150,
        y: 70,
        id: makeId(),
        align: 'center',
        color: '#000000',
        fontFamily: 'Impact',
        size: 35,
        isOutline: true,
        outlineWidth: 4,
        strokeStyle: '#ffffff',
    }
}

function renderMemeEditor() {
    var strHtml = `<div class="meme-editor">
                   
                        <p>
                        <button onclick="deleteTxt()"><i class="fa-solid fa-eraser"></i></button>
                        <input class="text-input" type="text" data-property="text" placeholder="${gTexts[gPlaceText].text}" oninput="editTxt(this)">
                        <input type="color" value="${gTexts[gPlaceText].color}" data-property="color" oninput="editTxt(this)">
                        </p>

                        <p>
                        Text Size:
                        <button onclick="biggerTxt()"><i class="fa-regular fa-square-plus"></i></button><button onclick="smallerTxt()"><i class="fa-regular fa-square-minus"></i></button>
                        Font: 
                        <select data-property="fontFamily" oninput="editTxt(this)">
                        <option value="Impact">Impact</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Brush Script MT">Brush Script MT</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Garamond">Garamond</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        </select>
                        </p>

                        <p>
                        <button onclick="changeLine()"><i class="fa-solid fa-retweet"></i></button>
                        <button onclick="addTxt()"><i class="fa-solid fa-plus"></i>Add Text</button>
                        <button onclick="leftTxt()"><i class="fa-solid fa-align-left"></i></button>
                        <button onclick="centerTxt()"><i class="fa-solid fa-align-center"></i></button>
                        <button onclick="rightTxt()"><i class="fa-solid fa-align-right"></i></button>
                        <button onclick="upTxt()"><i class="fa-solid fa-up-long"></i></button>
                        <button onclick="downTxt()"><i class="fa-solid fa-down-long"></i></button>
                        </p>

                        <p>
                        <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this)">
                        <label for="outline">Outline</label>
                        Width: <input type="number" value="${gTexts[gPlaceText].outlineWidth}"  min="0" step="1" data-property="outlineWidth" oninput="editTxt(this)">
                        <input type="color" value="${gTexts[gPlaceText].strokeStyle}" data-property="strokeStyle" oninput="editTxt(this)">
                        </p>

                        <p>
                        <button onclick="changeDiv()"><i class="fa-solid fa-caret-left"></i> Back to Gallery</button>
                        </p>
                 
                </div>`

    document.querySelector('.txt-editor').innerHTML = strHtml
}

function renderCanvas() {
    var elCanvas = document.querySelector('.canvas')
    gCtx = elCanvas.getContext('2d')

    gImgObj = new Image()
    gImgObj.src = gSelectedImgURL

    gImgObj.onload = function () {
        elCanvas.width = gImgObj.width
        elCanvas.height = gImgObj.height

        gTexts[gPlaceText].y = gImgObj.height - 70 //להוסיף לכל הטקסטים מיקומים
        gTexts[gPlaceText].x = gImgObj.width * 0.5

        drawCanvas()
    }
}

