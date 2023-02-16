'use strict'

var gIsGallery = true

function updateSelectedImgURL(url){
    gSelectedImgURL = url
}

function changeDiv() {
    /*toggle ( token ) - removes token from string and returns false. If token doesn't exist it's added and the function returns true
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.grid-container').classList.toggle('hidden')*/

    var elMemeCon = document.querySelector('.meme-container')
    var elGridCon = document.querySelector('.grid-container')

    if(gIsGallery){
        elMemeCon.style.display = 'grid'
        elGridCon.style.display = 'none'
        gIsGallery = false
    }else{
        elMemeCon.style.display = 'none'
        elGridCon.style.display = 'grid'
        gIsGallery = true
    }
}

function drawCanvas() {
    gCtx.drawImage(gImgObj, 0, 0)

    drawTxt()
}

function drawTxt() {
    for (var i = 0; i < gTexts.length; i++) {
        //if(gTexts[i] === undefined) continue
        gCtx.font = gTexts[i].size + 'px' + ' ' + gTexts[i].fontFamily
        gCtx.textAlign = gTexts[i].align
        gCtx.fillStyle = gTexts[i].color
        if (gTexts[i].isOutline) addTxtOutline(i)

        gCtx.fillText(gTexts[i].text, gTexts[i].x, gTexts[i].y) 
    }
    
}

function addTxtOutline(idx) {
    gCtx.strokeStyle = gTexts[idx].strokeStyle
    gCtx.lineWidth = gTexts[idx].outlineWidth
    gCtx.strokeText(gTexts[idx].text, gTexts[idx].x, gTexts[idx].y)
}

function editTxt(elinput) {
    console.log('im in editTxt()')

    var property = elinput.dataset.property
    console.log('elinput', elinput)
    console.log('property', property)
    var value

    if(!gTexts.length){
        document.querySelector('.text-input').value = ''
        alert('You have to add a new text box')
        return
    }

    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value
            break;
        case 'checkbox':
            value = elinput.checked
            break;
        default: 
            value = elinput.value
            break;
    }
    gTexts[gPlaceText][property] = value

    console.log('value', value)
    console.log('gTexts[gPlaceText].property', gTexts[gPlaceText].property)

    drawCanvas()
}

function deleteTxt(){
    console.log('im in deleteTxt()')

    if(gTexts.length === 1) {
        gTexts.push(createText())
        gMaxLine = gMaxLine + 1
    }
    

    gTexts.splice(gPlaceText, 1)
    gMaxLine = gMaxLine - 1

    document.querySelector('.text-input').value = ''

    drawCanvas()
    renderMemeEditor()
}

function biggerTxt(){
    console.log('im in biggerTxt()')

    gTexts[gPlaceText].size += 5
    drawCanvas()
    renderMemeEditor()
}

function smallerTxt(){
    console.log('im in smallerTxt()')

    gTexts[gPlaceText].size -= 5
    drawCanvas()
    renderMemeEditor()
}

function leftTxt(){
    console.log('im in leftTxt()')

    gTexts[gPlaceText].align = 'right' //לבדוק למה זה הפוך ימין ושמאל
    drawCanvas()
    renderMemeEditor()
}

function centerTxt(){
    console.log('im in centerTxt()')

    gTexts[gPlaceText].align = 'center'
    drawCanvas()
    renderMemeEditor()
}

function rightTxt(){
    console.log('im in rightTxt()')

    gTexts[gPlaceText].align = 'left' //לבדוק למה זה הפוך ימין ושמאל
    drawCanvas()
    renderMemeEditor()
}

function upTxt(){
    gTexts[gPlaceText].y -= 5

    drawCanvas()
    renderMemeEditor()
}

function downTxt(){
    gTexts[gPlaceText].y += 5

    drawCanvas()
    renderMemeEditor()
}

function addTxt(){ 
    gPlaceText++
    gMaxLine = gPlaceText
    gTexts.push(createText())

    drawCanvas()
    renderMemeEditor()
}

function changeLine(){ 
    console.log('gPlaceText ', gPlaceText)
    console.log('gMaxLine ', gMaxLine)
    if(gPlaceText < gMaxLine) gPlaceText++
    else if(gPlaceText === gMaxLine) gPlaceText = 0
    console.log('gPlaceText ', gPlaceText)
    console.log('gMaxLine ', gMaxLine)
}

