

//h1 element
var sajanParallaxHeadingH1 = document.getElementById('sajanParallaxHeadingH1');
//style getElementById
var sajanParallaxHeadingDynamicStyle = document.getElementById('sajanParallaxHeadingDynamicStyle');
//button
var wygenerujBtn = document.getElementById('wygenerujBtn');
//listner
wygenerujBtn.addEventListener('click', wygenerujFunct);

// dla wszystkich pól input przypiujemy funkcje wygeneruj on change
var inputy = document.getElementsByTagName('input');
for (var i=0; i<inputy.length;i++){
  inputy[i].addEventListener("change", wygenerujFunct);
}
document.getElementById('selectFontFamily').addEventListener("change", wygenerujFunct);

//CodeMirror podmienia mi textarea na edytor z koloryzacją kodu

  var codeArea =   document.getElementById('codeArea');
  codeArea.innerHTML = document.getElementById('previewBox').innerHTML;
var myCodeMirror = CodeMirror(function(elt) {
  codeArea.parentNode.replaceChild(elt, codeArea);
}, {value: codeArea.value, mode:"htmlmixed", theme:"icecoder"});



//definiuje pseudo tablice asocjacyjne z predefiniowanymi stylami
var styleNaglowkaArr={};
styleNaglowkaArr['font-family']='\'Roboto Condensed\', sans-serif';
styleNaglowkaArr['font-weight']='400';
styleNaglowkaArr['font-size']='1em';
styleNaglowkaArr['color']='#FFF';
styleNaglowkaArr['text-shadow']='-1px 1px 16px #000000';
styleNaglowkaArr['line-height']='1.2em';
var styleRamkiArr={};
styleRamkiArr['display']='inline-block';
styleRamkiArr['background']='#000000b5';
styleRamkiArr['padding']='20px';
styleRamkiArr['-moz-border-radius']='21px';
styleRamkiArr['-webkit-border-radius']='21px';
styleRamkiArr['border-radius:']='21px';
styleRamkiArr['border-style']='solid';
styleRamkiArr['border-color']='#FFF';
var stylePrzypisuArr={};
stylePrzypisuArr['font-size']='0.4em';
stylePrzypisuArr['color']='#fff';



/*funkcja robiąca skrawek css z regułami dla selektora id elementu
na podstawie obiektu pseudo-tablicy asocjacyjnej ze zbiorem par styl wartość*/
function generujCSSString(domElementId,styleObject){
var cssString = "#"+ domElementId+"{\n";
  for(var propertyName in styleObject) {
    cssString=cssString+propertyName+":"+styleObject[propertyName]+"!important;\n"
  }
  cssString = cssString+"}"
  return cssString;
}

/*podpinam wygenerowanie do eventu onload okna.
by wygenerowało się już na starcie */
window.onload = function(){
  wygenerujFunct();
}

function changeFont(){
  var selectFontFamily = document.getElementById('selectFontFamily');
  var inportFont = document.getElementById('importFont');
  var gFontsURLsArr = {
    'Lato':'https://fonts.googleapis.com/css?family=Lato:400,700,700i&amp;subset=latin-ext',
    'Lobster':'https://fonts.googleapis.com/css?family=Lobster&amp;subset=latin-ext',
    'Roboto':'https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&amp;subset=latin-ext',
    'Roboto Condensed':'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i&amp;subset=latin-ext',
    'Oswald':'https://fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=latin-ext',
    'Montserrat':'https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&amp;subset=latin-ext',
    'Open Sans':'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext',
    'Ubuntu':'https://fonts.googleapis.com/css?family=Ubuntu&amp;subset=latin-ext'
  }
inportFont.setAttribute('href',gFontsURLsArr[selectFontFamily.value]);
styleNaglowkaArr['font-family']=selectFontFamily.value+", sans-serif";
stylePrzypisuArr['font-family']=selectFontFamily.value+", sans-serif";
}
//na sktuty zwraca true jesli chceckbox o podanym id jest odchaczony
function checkedBox(id){
  var returnVal = false;
   var checkbox = document.getElementById(id);
   if (checkbox.checked){
     returnVal = true;
   }
   return returnVal;
}


// aktualizuje tablice ze stylami na podstawie wartości pól input
function aktualizujStyle(){
  changeFont();
  //style nagłówka
  //styleNaglowkaArr['font-family']=document.getElementById("inputFontFamily").value;
  styleNaglowkaArr['font-weight']='400';
  styleNaglowkaArr['font-size']=document.getElementById("inputFontSize").value+'em';
  styleNaglowkaArr['color']=document.getElementById("inputFontColor").value;
  styleNaglowkaArr['text-shadow']='-1px 1px 16px #000000';
  styleNaglowkaArr['line-height']=document.getElementById("inputLineHeight").value+'em';

  if (checkedBox('chceckboxBold')){
    styleNaglowkaArr['font-weight']='bold';
  }else{
    styleNaglowkaArr['font-weight']='normal';
  }

  if (checkedBox('chceckboxUnderline')){
    styleNaglowkaArr['text-decoration']='underline';
  }else{
    styleNaglowkaArr['text-decoration']='none';
  }

  if (checkedBox('chceckboxItalic')){
    styleNaglowkaArr['font-style']='italic';
  }else{
    styleNaglowkaArr['font-style']='normal';
  }

  if (checkedBox('chceckboxUppercase')){
    styleNaglowkaArr['text-transform']='uppercase';
  }else{
    styleNaglowkaArr['text-transform']='none';
  }

  //przypisu
  stylePrzypisuArr['font-size']=document.getElementById('inputPrzypisFontSize').value+'em';
  stylePrzypisuArr['color']=document.getElementById('inputPzypisFontColor').value;

  if (checkedBox('przypisChceckboxBold')){
    stylePrzypisuArr['font-weight']='bold';
  }else{
    stylePrzypisuArr['font-weight']='normal';
  }

  if (checkedBox('przypisChceckboxUnderline')){
    stylePrzypisuArr['text-decoration']='underline';
  }else{
    stylePrzypisuArr['text-decoration']='none';
  }

  if (checkedBox('przypisChceckboxItalic')){
    stylePrzypisuArr['font-style']='italic';
  }else{
    stylePrzypisuArr['font-style']='normal';
  }

  if (checkedBox('przypisChceckboxUppercase')){
    stylePrzypisuArr['text-transform']='uppercase';
  }else{
    stylePrzypisuArr['text-transform']='none';
  }




  if (checkedBox('przypisChceckbox')){
    stylePrzypisuArr['display']='inline';
  }else{
    stylePrzypisuArr['display']='none';
  }
  //Ramka
  styleRamkiArr['display']='inline-block';
  styleRamkiArr['padding']=document.getElementById("inputBorderPadding").value+'em';
  styleRamkiArr['-moz-border-radius']=document.getElementById("inputBorderRadius").value+'em';
  styleRamkiArr['-webkit-border-radius']=document.getElementById("inputBorderRadius").value+'em';
  styleRamkiArr['border-radius']=document.getElementById("inputBorderRadius").value+'em';
  styleRamkiArr['font-size'] = document.getElementById('inputGlobalFontSize').value+'px';
  styleRamkiArr['border-color']=document.getElementById("inputBorderColor").value;
  styleRamkiArr['border-width']=document.getElementById("inputBorderWidth").value+'em';




  if (checkedBox('tloChceckbox')){
    styleRamkiArr['background']=document.getElementById("inputBorderBackground").value;
  }else{
    styleRamkiArr['background']='none';
  }

  if (checkedBox('ramkaChceckbox')){
    styleRamkiArr['border-style']='solid';
  }else{
    styleRamkiArr['border-style']='none';
  }


}



/* głowna operacja
1. akualizuje style generuje reguły css dla obiektów
2. skleja to do kupy i wypełnia element style
3. uzupełnia content nagłówka i paragrafu.
 */

function wygenerujFunct(){
  aktualizujStyle();
  var cssStringH1 = generujCSSString('sajanParallaxHeadingH1',styleNaglowkaArr);
  var cssStringPrzypis = generujCSSString('sajanParallaxHeadingP',stylePrzypisuArr);
  var cssStringRamka = generujCSSString('sajanParallaxHeadingContainer',styleRamkiArr);
  sajanParallaxHeadingDynamicStyle.innerHTML='\n'+cssStringH1+'\n'+cssStringPrzypis+'\n'+cssStringRamka+'\n';
  var baseFontSize = styleRamkiArr['font-size'].split('px')[0];
  var fontSizeStep1 = baseFontSize/100*90;
  var fontSizeStep2 = baseFontSize/100*70;
  var fontSizeStep3 = baseFontSize/100*50;
  var fontSizeStep4 = baseFontSize/100*30;


  sajanParralaxResponsivStyle.innerHTML='\n@media (max-width: 900px){\n#sajanParallaxHeadingContainer{font-size:'+fontSizeStep1+'px!important;}\n}\n@media (max-width: 700px){\n#sajanParallaxHeadingContainer{font-size:'+fontSizeStep2+'px!important;}\n}\n@media (max-width: 500px){\n#sajanParallaxHeadingContainer{font-size:'+fontSizeStep3+'px!important;}\n}\n@media (max-width: 300px){\n#sajanParallaxHeadingContainer{font-size:'+fontSizeStep4+'px!important;}\n}';



  myCodeMirror.getDoc().setValue(document.getElementById('previewBox').innerHTML);


  document.getElementById('sajanParallaxHeadingH1').innerHTML=document.getElementById('inputH1Content').value;//wrzucenie testu w nagłówek
  document.getElementById('sajanParallaxHeadingP').innerHTML=document.getElementById('inputPContent').value;
}
