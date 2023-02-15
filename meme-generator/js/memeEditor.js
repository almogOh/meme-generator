'use strict'

var gSelectedMeme

function memeEditor(id) {
    changeDiv()
    gSelectedMeme = renderSelectedMeme(id)
    //renderCanvas() TODO
    renderMemeEditor()
}

function changeDiv() {
    /*toggle ( token ) - removes token from string and returns false. If token doesn't exist it's added and the function returns true
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.grid-container').classList.toggle('hidden')*/
    console.log('Im in changeDiv()')
    var elMemeCon = document.querySelector('.meme-container')
    var elGridCon = document.querySelector('.grid-container')

    if(elMemeCon.style.display === 'none'){
        elMemeCon.style.display = 'flex'
        elGridCon.style.display = 'none'
    }else{
        elMemeCon.style.display = 'none'
        elGridCon.style.display = 'grid'
    } 
}

function renderSelectedMeme(selectedImgId) {
    return {
        selectedImgId,
        txt: createTxt('Add Your Text', 150, 70)
    }
}

function createTxt(text, x, y) {
    return {
        text,
        x,
        y,
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
                    <input type="text" data-property="text" placeholder="${gSelectedMeme.txt.text}" oninput="editTxt(this)">
                    Text Size:
                    <button onclick="biggerTxt()"><i class="fa-regular fa-square-plus"></i></button><button onclick="smallerTxt()"><i class="fa-regular fa-square-minus"></i></button>
                    <input type="color" value="${gSelectedMeme.txt.color}" data-property="color" oninput="editTxt(this)">
                    Font: 
                    <select data-property="fontFamily" oninput="editFont(this)">
                    <option value="Impact">Impact</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                    </select>
                    </p>

                    <p>
                    <button onclick="addTxt()"><i class="fa-solid fa-plus"></i>Add Text</button>
                    <button onclick="leftTxt()"><i class="fa-solid fa-align-left"></i></button>
                    <button onclick="centerTxt()"><i class="fa-solid fa-align-center"></i></button>
                    <button onclick="rightTxt()"><i class="fa-solid fa-align-right"></i></button>
                    </p>

                    <p>
                    <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this)">
                    <label for="outline">Outline</label>
                    Width: <input type="number" value="${gSelectedMeme.txt.outlineWidth}"  min="0" step="1" data-property="lineWidth" oninput="editTxt(this)">
                    <input type="color" value="${gSelectedMeme.txt.strokeStyle}" data-property="strokeStyle" oninput="editTxt(this)">
                    </p>

                    <p>
                    <button onclick="changeDiv()"><i class="fa-solid fa-caret-left"></i> Back to Gallery</button>
                    </p>
                 
                </div>`

    document.querySelector('.txt-editor').innerHTML = strHtml;
}



