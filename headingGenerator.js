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
    cssString=cssString+propertyName+":"+styleObject[propertyName]+";\n"
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
    'Montserrat':'https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&amp;subset=latin-ext'
  }
inportFont.setAttribute('href',gFontsURLsArr[selectFontFamily.value]);
styleNaglowkaArr['font-family']=selectFontFamily.value+", sans-serif";
stylePrzypisuArr['font-family']=selectFontFamily.value+", sans-serif";
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
  if (document.getElementById('chceckboxBold').checked){
    styleNaglowkaArr['font-weight']='bold';
  }else{
    styleNaglowkaArr['font-weight']='normal';
  }
  //przypisu
  stylePrzypisuArr['font-size']=document.getElementById('inputPrzypisFontSize').value+'em';
  stylePrzypisuArr['color']=document.getElementById('inputPzypisFontColor').value;




  if (document.getElementById('przypisChceckbox').checked){
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



  var ramkaChceckbox = document.getElementById("ramkaChceckbox");
  var tloChceckbox = document.getElementById('tloChceckbox');

  if (tloChceckbox.checked){
    styleRamkiArr['background']=document.getElementById("inputBorderBackground").value;
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
  document.getElementById('codeArea').innerHTML = document.getElementById('previewBox').innerHTML;
  document.getElementById('sajanParallaxHeadingH1').innerHTML=document.getElementById('inputH1Content').value;//wrzucenie testu w nagłówek
  document.getElementById('sajanParallaxHeadingP').innerHTML=document.getElementById('inputPContent').value;
}
