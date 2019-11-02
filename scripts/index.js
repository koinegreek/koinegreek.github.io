
function addCell(tr, val) {
    var td = document.createElement('td');

    td.innerHTML = val;
    tr.appendChild(td);    
    return td;
    }
      
// this function (below) is to accommodate older machines which cannot handle css grid
function tableDisplay() { 

    tbl = document.getElementById('table1');
    var ptr;
    var tr;
    var td;
    // row 1 - top  row
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box ai' id='box ai'><label id='testStuff'></label> " +
          "<label id='testStuff2'></label><label id='helpText'>?</label> </div>" );    
            
      td.setAttribute('id', 'row1_Cell1') 
      td.setAttribute('colspan', '4') 
    
  // row 2
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box a' id='box a'><br>" +
      "<label id=readerBookLabel>Reader / Book </label>" +
      "<select id='selectReader'></select> </div>" );      
      td.setAttribute('id', 'row2_Cell1') 
      td.setAttribute('colspan', '2') 
    // cell 2
    td = addCell (tr, "" );      
      td.setAttribute('id', 'textSpace') 
      td.setAttribute('colspan', '2')
      td.setAttribute('rowspan', '5')

     
  // row 3
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box c' selectChapterSpace>Chapter <br>" +
              "<select id='selectChapter'> </select> </div>" );      
      td.setAttribute('id', 'row3_Cell1') 
      td.setAttribute('colspan', '2') 
    
  // row 4
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box d' id='selectPlayModeSpace'> Play Mode <br>" +
              "<select id='selectPlayMode' name='myDropDn3'></select></div>" );      
      td.setAttribute('id', 'row4_Cell1') 
      td.setAttribute('colspan', '2')   

     // row 5
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box e' id='startVerseSpace'>Start<br>" +
                  "<select id='startVerseList' name='myDropDn1'> </select> </div>");      
      td.setAttribute('id', 'row5_Cell1')          
    // cell 2
    td = addCell (tr, "<div class='box f' id='endVerseSpace'>End<br>" +
                  "<select id='endVerseList' name='myDropDn2'></select></div>");      
      td.setAttribute('id', 'row5_Cell2')   

    // row 6
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box g' id='includeTextSpace'>" +
          "<input id='includeText' type='checkbox' name='text?' checked>Display Text?</div>");      
      td.setAttribute('id', 'row6_Cell1')          
    // cell 2      
    td = addCell (tr, "<div class='box k' d='box k'></div>" +
            "<label id='fontLabel'>font<br></label>" +
            "<select id='fontFamilies' name='myDropDn3'></select>" +
            "<button id='fontUp'><img src='./images/fontSzUp.png'  width='17px'></button>" +
            "<button id='fontDown'><img src='./images/fontSzDn.png' width='17px'></button>");  
    td.setAttribute('id', 'row6_Cell2') 

    // row 7
    tr = document.createElement('tr');
    tbl.appendChild(tr)
    // cell 1
    td = addCell (tr, "<div class='box i' id='box i'>" +                       
                       "<button id='scrColBtn' type='submit'>screen colours</button> <br>" +
                       "<span id='myLogo'>by TLD</span></div></div>");      
      td.setAttribute('id', 'row7_Cell1')
      td.setAttribute('colspan', '2')          
    // cell 2
        
     
    // cell 3
    td = addCell (tr, "<div class='box j' id='myControls'>" +
              "<button id='repeatBtn'><img id='repeatPassageImage' src='./images/repeatBtn.png'></img></button>" +
              "<button id='previousVerse'><img id='previousVerseImage' src='./images/previousVerse.png'></button>" +
              
              "<audio id='audioID' controls controlslist='nodownload'><source id='aS' src='' type='audio/mpeg'></audio>" +
              
              "<button id='playPauseBtn' ><img id='playImage' src='./images/playBtn.png'></img> </button>"  +
              "<button id='nextVerse'><img id='nextVerseImage' src='./images/nextVerse.png'></button>" +
              "<button id='lastVerse'><img id='lastVerseImage' src='./images/lastVerseBtn.png'></img></button>" +
              "<label id='curTimeLabel' >0.0 / 0.0</label>" +
              "<button id='volBtn'><img id='muteBtnImage' src='./images/unMuteBtn.png'></button>" +
              "<input id='volCtrlSlider' type='range' min='0' max='100' value='40' step='1'></input>");

      td.setAttribute('id', 'audioCtrlsCell') 
      td.setAttribute('colspan', '2')

      // end of table        
     
      // turn off audio controls
      audioID.controls = false;

    // Load the controls.js file after the page is all loaded
    var tag = document.createElement("script");
    tag.src = "./scripts/controls.js";
    document.getElementsByTagName("head")[0].appendChild(tag);

  }
  // end of the table display, which is to accoomdate older machines which cannot handle css grid

function gridDisplay(){

  function addElement(elem, parent, attr1, attr2, attr3) {
    
    //console.log(arguments.length)

    var newElem = document.createElement(elem);
    parent.appendChild(newElem);

    switch(arguments.length) {
      
          case 2:            
            break;
          case 3:
            //console.log(arguments[2][0] + ' / ' + arguments[2][1])
            newElem.setAttribute(arguments[2][0], arguments[2][1])
            break;
          case 4:
            newElem.setAttribute(arguments[2][0], arguments[2][1])
            newElem.setAttribute(arguments[3][0], arguments[3][1])
            break;
          case 5:            
            newElem.setAttribute(arguments[2][0], arguments[2][1])
            newElem.setAttribute(arguments[3][0], arguments[3][1])
            newElem.setAttribute(arguments[4][0], arguments[4][1])
            break;
          case 6:
            newElem.setAttribute(arguments[2][0], arguments[2][1])
            newElem.setAttribute(arguments[3][0], arguments[3][1])
            newElem.setAttribute(arguments[4][0], arguments[4][1])
            newElem.setAttribute(arguments[5][0], arguments[5][1])            
            break;
          case 7:
            newElem.setAttribute(arguments[2][0], arguments[2][1])
            newElem.setAttribute(arguments[3][0], arguments[3][1])
            newElem.setAttribute(arguments[4][0], arguments[4][1])
            newElem.setAttribute(arguments[5][0], arguments[5][1])
            newElem.setAttribute(arguments[6][0], arguments[6][1])
            break;
          case 8:            
            newElem.setAttribute(arguments[2][0], arguments[2][1])
            newElem.setAttribute(arguments[3][0], arguments[3][1])
            newElem.setAttribute(arguments[4][0], arguments[4][1])
            newElem.setAttribute(arguments[5][0], arguments[5][1])
            newElem.setAttribute(arguments[6][0], arguments[6][1])
            newElem.setAttribute(arguments[7][0], arguments[7][1])
            break;
          default:            
    }     
  }
  
  var arr1 = ['class', 'wrapper'];
  var arr2 = ['id', 'wrapper'];
  addElement('div', document.getElementById('bodyID'), arr1, arr2);  
  addElement('div', document.getElementById('wrapper'), ['class', 'box ai'], ['id', 'box ai']);    

  // row 1 - box aii
  addElement('div', document.getElementById('wrapper'), ['class', 'box aii'], ['id', 'box aii']);     
  addElement('label', document.getElementById('box aii'), ['id', 'textStuff']);  
  addElement('label', document.getElementById('box aii'), ['id', 'textStuff2']);  
  addElement('label', document.getElementById('box aii'), ['id', 'helpText']);  
  helpText.innerHTML = "?"

  // row 2 - first cell (span=2) - box a - Select Reader
  addElement('div', document.getElementById('wrapper'), ['class', 'box a'], ['id', 'box a']);
  addElement('label', document.getElementById('box a'), ['id', 'readerBookLabel']);   
    document.getElementById('readerBookLabel').innerHTML = "Reader / Book<br>";
  addElement('select', document.getElementById('box a'), ['id', 'selectReader']);
  
  // row 2 - row b - textSpace (span 2 across; span 5 down)
  addElement('div', document.getElementById('wrapper'), ['class', 'box b'], ['id', 'textSpace']);
  
  // row 3 - first cell (span=2) - box c - Select Chapter
  addElement('div', document.getElementById('wrapper'), ['class', 'box c'], ['id', 'selectChapterSpace']);
  document.getElementById('selectChapterSpace').innerHTML = "Chapter<br>";
  addElement('select', document.getElementById('selectChapterSpace'), ['id', 'selectChapter']);  
  
  // row 4 - first cell (span 2) - box d - Play Mode
  addElement('div', document.getElementById('wrapper'), ['class', 'box d'], ['id', 'selectPlayModeSpace']);
  document.getElementById('selectPlayModeSpace').innerHTML = "Play Mode<br>";
  addElement('select', document.getElementById('selectPlayModeSpace'), ['id', 'selectPlayMode'], 
          ['name', 'myDropDn3'], ["title", "Select start and end verses BEFORE selecting 'range of verses' mode!"]);
  
  // row 5 - cell 1 - box e - start verse
  addElement('div', document.getElementById('wrapper'), ['class', 'box e'], ['id', 'startVerseSpace'], 
      ['title', "Go to a verse, or choose the beginning of a 'range of verses'"]);
  document.getElementById('startVerseSpace').innerHTML = "Start<br>";
  addElement('select', document.getElementById('startVerseSpace'), ['id', 'startVerseList'], 
          ['name', 'myDropDn1']);
  
  // row 5 - cell 2 - box f - end verse
  addElement('div', document.getElementById('wrapper'), ['class', 'box f'], ['id', 'endVerseSpace'], 
      ['title', "Select the last verse of a 'range of verses'."]);
  document.getElementById('endVerseSpace').innerHTML = "End<br>";  
  addElement('select', document.getElementById('endVerseSpace'), ['id', 'endVerseList'], 
          ['name', 'myDropDn2']);
  
  // row 6 - cell 1 - box g - display text?
  addElement('div', document.getElementById('wrapper'), ['class', 'box g'], ['id', 'includeTextSpace']);
  addElement('label', document.getElementById('includeTextSpace'), ['id', 'displayTextLabel'], 
      ['title', "Uncheck the box if you do not wish the verse text to be displayed."]);  
  document.getElementById('displayTextLabel').innerHTML = "Display Text?<br>";
  addElement('input', document.getElementById('includeTextSpace'), ['id', 'includeText'], 
      ['name', 'text?'], ["type", "checkbox"]);
  document.getElementById('includeText').setAttribute('checked', true);
  document.getElementById('includeText').innerHTML = "Display Text?";

  // row 6 - cell 2 - box h - fonts
      // font label
  addElement('div', document.getElementById('wrapper'), ['class', 'box h'], ['id', 'box h']);  
  addElement('label', document.getElementById('box h'), ['id', 'fontLabel']);
  document.getElementById('fontLabel').innerHTML = "Font<br>";
    // font families
  addElement('select', document.getElementById('box h'), ['id', 'fontFamilies'], 
          ['name', 'myDropdn4'], ["title", "Select desired font for text window."]); 
  addElement('br', document.getElementById('box h'), ['id', 'nextLine1'])   


    //font size increase
  addElement('button', document.getElementById('box h'), ['id', 'fontUp']);
  addElement('img', document.getElementById('fontUp'), ['id', 'fontUpImage'], 
        ['src', './images/fontSzUp.png'], ["title", "Increase size of font."]);
    // font size decrease
  addElement('div', document.getElementById('wrapper'));
  addElement('button', document.getElementById('box h'), ['id', 'fontDown']);
  addElement('img', document.getElementById('fontDown'), ['id', 'fontDownImage'], 
        ['src', './images/fontSzDn.png'], ["title", "Reduce size of font."]);
  
  // row 7 - cell 1 - box i - colours + logo 
  addElement('div', document.getElementById('wrapper'), ['class', 'box i'], ['id', 'box i']);    
    
    
    // submit button (colours)
  addElement('button', document.getElementById('box i'), ['id', 'scrColBtn'], ['type', 'submit'], 
      ['title', 'Colour format: correct name (eg "blue") or HTML format (eg. "#2E57AE") - without the quotes']);
  document.getElementById('scrColBtn').innerHTML = 'screen colours';  
 
    // logo
  addElement('div', document.getElementById('box i'), ['class', 'logoDiv'], ['id', 'logoDiv']);
  addElement('span', document.getElementById('logoDiv'), ['id', 'myLogo']);  
  document.getElementById('myLogo').innerHTML = "<p>by TLD</p>";

  
  //row 7 cell 3 - box j - audio controls
  addElement('div', document.getElementById('wrapper'), ['class', 'box j'], ['id', 'box j']);
  addElement('div', document.getElementById('box j'),['id', 'myControls']);
  
    // repeat btn
  addElement('button', document.getElementById('myControls'), ['id', 'repeatBtn']);
  addElement('img', document.getElementById('repeatBtn'), ['id', 'repeatPassageImage'], 
        ['src', './images/repeatBtn.png'], ["title", "Repeat: 'all' or 'verse' or 'range of verses' => whichever 'mode' you're in."]);
  
    // previous verse btn
  addElement('button', document.getElementById('myControls'), ['id', 'previousVerse']);
  addElement('img', document.getElementById('previousVerse'), ['id', 'previousVerseImage'], 
        ['src', './images/previousVerse.png'], ["title", "Go to previous verse."]);
  
    //html controls (this is must be defined - but turned off below)
  addElement('audio', document.getElementById('myControls'), ['id', 'audioID'], ['controls', 'true'], 
          ["controlslist", "nodownload"]);
  addElement('source', document.getElementById('audioID'), ['id', 'aS'], ['src', ''], ["type", "audio/mpeg"]);
      
    // play/pause btn
  addElement('button', document.getElementById('myControls'), ['id', 'playPauseBtn']);
   addElement('img', document.getElementById('playPauseBtn'), ['id', 'playImage'], 
        ['src', './images/playBtn.png'], ["title", "Play or pause audio."]);

    // next verse btn
  addElement('button', document.getElementById('myControls'), ['id', 'nextVerse']);
  addElement('img', document.getElementById('nextVerse'), ['id', 'nextVerseImage'], 
        ['src', './images/nextVerse.png'], ["title", "Go to next verse."]);
  
    // last verse btn
  addElement('button', document.getElementById('myControls'), ['id', 'lastVerse']);
  addElement('img', document.getElementById('lastVerse'), ['id', 'lastVerseImage'], 
        ['src', './images/lastVerseBtn.png'], ["title", "Go to last verse."]);

    // current time label
  addElement('label', document.getElementById('myControls'), ['id', 'curTimeLabel']);
  document.getElementById('curTimeLabel').innerHTML = '0.0';
  
    // volume stuff  
  addElement('button', document.getElementById('myControls'), ['id', 'volBtn']);
  addElement('img', document.getElementById('volBtn'), ['id', 'muteBtnImage'], 
        ['src', './images/unMuteBtn.png'], ["title", "Mute."]);
  
  addElement('input', document.getElementById('myControls'), ['id', 'volCtrlSlider'], ['type', 'range'], ['min', '0'],
        ['max', '100'], ['value', '30'], ['step', '1']);
  
    
  

  //<input id="seekslider" type="range" min="0" max="100" value="0" step="1">

  // turn off audio controls
  audioID.controls = false;

  // Load the controls.js file after this page is all loaded
    var tag = document.createElement("script");
    tag.src = "./scripts/controls.js";
    document.getElementsByTagName("head")[0].appendChild(tag);

}              
                  