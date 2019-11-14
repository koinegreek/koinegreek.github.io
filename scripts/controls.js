
var cueFile = {
    "chapter": [
        {
            "testament" : "",
            "book"      : "",
            "chapter"   : "",
            "textSrc"   : "",
            "language"  : "",
            "verseNum"  : 0,
            "cueNdx"    : 0,
            "cueTime"   : 0,
            "cueText"   : ""
        }        
    ]};

var readerFile = {
    "readers": [
        {
            "firstName" : "",               
            "lastName"  : "",
            "briefName" : "",            
            "default"   : false,
            "file"      : ""
        }
    ]};

var fileLocation = {
    "ch": [
     {
        "reader"    : "",                
        "book"      : "",
        "chapter"   : 0,        
        "soundFile" : "",
        "cuesFile"  : ""
    }
]}
var fontTable = {
    "font": [
     {
        "family"            : "",                
        "txtWindowDefault"  : false,
        "consoleDefault"    : false 
    }
]}
var defaultSettings = {
    "settings": [   
     {
        "screenColour"      : "",              
        "scrTextColour"     : "",
        "screenImage"       : "",
        "consoleColour"     : "",
        "consoleTextColour" : "",
        "consoleFontFamily" : "",
        "pageColour"        : "",  
        "readerBookLabel"   : "",
        "gridLines"         : ""
    }    
]}

var startupFlag = true;
var accessKey = "";
var secretKey = "";
// var endPoint = "nyc3.digitaloceanspaces.com";   
var AWS;
var s3;

// ********** temp ****************

aS.addEventListener('change', function(event) {
  //if(event.request.url === './media/Rafael/05-Acts/Raf_Acts_12.mp3') {
    // event.respondWith(
    //     fetch(event.request.url, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer myBearerToken",
    //         },
    //         redirect: "follow"
    //     })
    // );    
  
    console.log('hit here')

  //}
});



// ********** end temp ****************



// ******************** load the reader file ******************
// This is a one-time initialization at startup
loadReadersFile ('./views/readers.json')

function loadReadersFile (fileToLoad){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //document.getElementById('placeholder').innerHTML = xhr.responseText;
            readerFile = JSON.parse(xhr.responseText);
        
            populateReaders();

            function populateReaders() {
                var defaultReader = 0;
                for (i in readerFile.readers) {
                    
                    var opt = document.createElement("OPTION");
                    opt.text = readerFile.readers[i].briefName;
                    opt.value = i;
                    document.getElementById('selectReader').options.add(opt);
                    if (readerFile.readers[i].default == true){
                         defaultReader = i;   
                    }                    
                }   // if no default is set in the file, it will default to the first reader
                    selectReader.selectedIndex = defaultReader;
                    if (startupFlag == true){
                        loadLocationsFile (readerFile.readers[defaultReader].file)                        
                        startupFlag = false;
                    }
            }            
        }
    }
    xhr.open('GET', fileToLoad);
    //XMLHttpRequest.setRequestHeader(header, value)
    xhr.send();  
}
// ******************** end load reader file *******************

// ******************** load the default settings ******************
// This is a one-time initialization at startup
loadDefaultSettings ('./views/settings.json')

function loadDefaultSettings (fileToLoad){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //document.getElementById('placeholder').innerHTML = xhr.responseText;
            settingsFile = JSON.parse(xhr.responseText);
        
            applySettings();

            function applySettings() {                
                // display screen fonts
                textSpace.style.backgroundColor = settingsFile.settings[0].screenColour;
                if ( settingsFile.settings[0].screenImage.length > 0 )  { 
                    textSpace.style.backgroundImage = "url(" + settingsFile.settings[0].screenImage + ")";
                } 

                textSpace.style.color = settingsFile.settings[0].scrTextColour;    
                
                // change background and text colours in the console
                var classCnt = document.getElementsByClassName("box").length;               
                
                for (i=0; i<classCnt; i++) {
                    if (document.getElementsByClassName("box")[i].id !== 'textSpace') {
                        
                        // consoleBackground
                        document.getElementsByClassName("box")[i].style.backgroundColor = 
                        settingsFile.settings[0].consoleColour;   
                        // consoleText
                        document.getElementsByClassName("box")[i].style.color = 
                        settingsFile.settings[0].consoleTextColour;
                        // console grid lines
                        wrapper.style.backgroundColor =  settingsFile.settings[0].gridLines;         
                        // consoleFontFamily
                        document.getElementsByClassName("box")[i].style.fontFamily = 
                        settingsFile.settings[0].consoleFontFamily;                          
                     }   
                }
                // label for Reader / Book                  
                readerBookLabel.innerHTML = settingsFile.settings[0].readerBookLabel + "<br>";
                // page colour
                bodyID.style.backgroundColor = settingsFile.settings[0].pageColour;
            }
                
        }
    }
    xhr.open('GET', fileToLoad);
    //XMLHttpRequest.setRequestHeader(header, value)
    xhr.send();  
}
// ******************** end load fonts file *******************

// ******************** load the font file ******************
// This is a one-time initialization at startup
loadFontsFile (' ./views/fonts.json')
                
function loadFontsFile (fileToLoad){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //document.getElementById('placeholder').innerHTML = xhr.responseText;
            fontFile = JSON.parse(xhr.responseText);
        
            populateFonts();

            function populateFonts() {
                var defaultWindowFont = 1;
                for (i in fontFile.font) {
                    
                    var opt = document.createElement("OPTION");
                    opt.text = fontFile.font[i].fontFamily;
                    opt.value = i;
                    document.getElementById('fontFamilies').options.add(opt);
                    if (fontFile.font[i].txtWindowDefault == true && i > 0){
                         defaultWindowFont = i;   
                    }                    
                }   // if no default is set in the file, it will default to the first reader
                    fontFamilies.selectedIndex = defaultWindowFont; 

                    var selectedFont = fontFamilies[defaultWindowFont].text
                    textSpace.style.fontFamily = selectedFont;                         

            }            
        }
    }
    xhr.open('GET', fileToLoad);
    //XMLHttpRequest.setRequestHeader(header, value)
    xhr.send();  
}
// ******************** end load fonts file *******************


// *************** load the file location file *****************

function loadLocationsFile (fileToLoad){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //document.getElementById('placeholder').innerHTML = xhr.responseText;
            fileLocation = JSON.parse(xhr.responseText);
        
            populateFileLocations();

            function populateFileLocations() { 
                var opt = document.createElement("OPTION");                     
                opt.text = 'Select Chapter';
                opt.value = 0; 
                document.getElementById('selectChapter').options.add(opt); 
                for (i in fileLocation.ch) {                    
                    var opt = document.createElement("OPTION");                     
                    opt.text = fileLocation.ch[i].book +" " + fileLocation.ch[i].chapter;
                    opt.value = i+1; 
                    document.getElementById('selectChapter').options.add(opt);                   
                }
            }
        }
    }
    xhr.open('GET', fileToLoad);
    //XMLHttpRequest.setRequestHeader(header, value)
    xhr.send();
}
// ****************** end load file location file **************


// ************** load the cues file - loaded every time a new chapter is selected ********************

function loadCueFile (fileToLoad){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //document.getElementById('placeholder').innerHTML = xhr.responseText;
            cueFile = JSON.parse(xhr.responseText);
        
            populateVerseList();

            function populateVerseList() {               
                for (i in cueFile.chapter) {
                    var opt = document.createElement("OPTION");
                    opt.text = 'vs ' + cueFile.chapter[i].verseNum;
                    opt.value = cueFile.chapter[i].cueNdx;
                    document.getElementById('startVerseList').options.add(opt);

                    var opt = document.createElement("OPTION")
                    opt.text = 'vs ' + cueFile.chapter[i].verseNum;
                    opt.value = cueFile.chapter[i].cueNdx;
                    document.getElementById('endVerseList').options.add(opt);
                }                
            }
            if (cueFile.chapter[0].language == "Hebrew"){

                textSpace.style.fontSize = '35px';
            } else {
                textSpace.style.fontSize = '32px';
            }
            displayCue(0);
            audioID.currentTime = 0;
            cueIndex = 0;
        }
    }
    xhr.open('GET', fileToLoad); 
        // xhr.setRequestHeader( "ACCESS_KEY_ID", accessKey)
        // xhr.setRequestHeader( "SECRET_ACCESS_KEY", secretKey)
        // xhr.setRequestHeader( "endpoint", endPoint)
        // xhr.setRequestHeader( "Access-Control-Allow-Origin",  "*")        
        // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

    xhr.send();
}
// ******************* end load cues file *********************


const audioID = document.getElementById('audioID');
// keep track of the current index - tres important! All will revolve around this
var cueIndex = 0;
// use the var to keep track of the next cue
var cueCount = 0;
// use this to indicate whether a cue file has been loaded
var cueFileAvailable = true;
// use this to keep track of the next cue in line

var totalTrackTime = 0;
var rangeStartVerse = 0;
var rangeEndVerse = 0;
var rangeStartTime = 0;
var rangeEndTime = 0;

//display initial cue if time of first cue < 5 seconds - this will get run at the beginning
if (cueFileAvailable == true && includeText.checked && cueFile.chapter[0].cueTime < 5) {
    displayCue(0);    
}

// clear the cue screen
function clearCueScreen() {
    document.getElementById('textSpace').innerHTML = "";
}

// use this function to put out text for new cue
function displayCue(nextCue) {
    
    if (cueFileAvailable && includeText.checked == true) {
        var x = cueFile.chapter[nextCue];
        var textOut = x.book + " " + x.chapter + ":" + x.verseNum + "  " + x.cueText;
        if (textOut.length > 5){
            document.getElementById('textSpace').innerHTML = textOut;
        }
    }
}


// a one-time call at the start
populatePlayMode();

function populatePlayMode() {
    var modeList = ['all', 'verse by verse', 'range of verses'];

    // Note that the value for "all" = 0; "verse by verse" = 1; and "range of verses" = 2
    for (i in modeList) {
        var opt = document.createElement("OPTION");
        opt.text = modeList[i];
        opt.value = i;
        document.getElementById('selectPlayMode').options.add(opt);
    }
}

function chgFontSize(amt, objId) {
        obj = document.getElementById(objId);
        //get current font size of obj
        //parseFloat gives you just the numerical value, i.e. strips the 'em' bit away
        currentSize = parseFloat(obj.style.fontSize);         
        obj.style.fontSize = (currentSize + amt).toString() + "px";
                
        return currentSize;
}

// button etc. events

// click on the helpText label (question mark at top right)
helpText.addEventListener('click', function() {
    
    var w = 480, h = 340;

      if (window.screen) {
        w = screen.availWidth;
        h = screen.availHeight;
      }

      var popW = 600, popH = 400;
      var leftPos = (w-popW)/2, topPos = (h-popH)/2;

      newW = window.open('./public/help.html','windowName','width=' + popW + ',height=' + popH + 
                            ',top=' + topPos + ',left=' + leftPos);
})

// volume control slider
var setVolume = function() { audioID.volume = this.value / 100; };
volCtrlSlider.addEventListener('change', setVolume);
volCtrlSlider.addEventListener('input', setVolume);
myControls.addEventListener('touchstart', function(){
    if(volCtrlSlider.visibility == hidden){
        volCtrlSlider.visibility == visible;
    } else{
        volCtrlSlider.visibility == hidden;
    }
});


// mute / unmute
volBtn.addEventListener('click', function(){
    if (audioID.muted == false) {      
      muteBtnImage.src = "./images/muteBtn.png" ;
      audioID.muted = true;
   }
   else {
      muteBtnImage.src = "./images/unMuteBtn.png";
      audioID.muted = false;
   }
})
// increase font size
fontDown.addEventListener('click', function() {    
    obj = document.getElementById('textSpace');
    currentSize = parseFloat(obj.style.fontSize);   
    
    if(currentSize >= 18){
        var cs = chgFontSize(-1, 'textSpace')          
    }    
}, false);

// decreasse font size
fontUp.addEventListener('click', function() {   
    obj = document.getElementById('textSpace');
    currentSize = parseFloat(obj.style.fontSize);   
    
    if(currentSize <= 42){
        var cs = chgFontSize(1, 'textSpace')           
    }    
}, false);

// select Font Family
fontFamilies.addEventListener('change', function() {

    var ndx = fontFamilies.selectedIndex;

    if (ndx > 0) {
        var selectedFont = fontFamilies[ndx].text
        textSpace.style.fontFamily = selectedFont;          
        
    }
    
    
}, false);

// select reader
selectReader.addEventListener('change', function() {   
   // when this selection is made, the correct file is loaded into
   // the 'select chapter' dropdown
   document.getElementById('selectChapter').innerText = null;
   loadLocationsFile (readerFile.readers[selectReader.selectedIndex].file)
}, false);

/*********************************
*
* listeners for changes in selectChapter dropdown menu. 
* three (two??) different event listeners are used to handle changes to the selectChapter dropdown
* this is to accomocate touch screens 
*
**************************************/

selectChapter.addEventListener('touchstart', function() {

    updateCurrentChapter();    
    
}, false);

selectChapter.addEventListener('change', function() {

    updateCurrentChapter();
    
    // audioID.onplaying = function() {
    //     totalTrackTime = millisToMinutesAndSeconds(audioID.duration * 1000);        
    //}
   

}, false);


/************************************************************
*
* end event listeners for changes in selectChapter
*
*************************************************************/



// response when a chapter is selected
function updateCurrentChapter(){
    // when this selection is made:
    //  1. the correct cue file is loaded
    //  2. the correct sound file is loaded .. 
    // remember there is an extra element in this box - so index starts at 1 in the box
    // but 0 in the file !!!!!!
    // clear out the select boxes
    if (selectChapter.selectedIndex > 0){
        document.getElementById('startVerseList').innerText = null;
        document.getElementById('endVerseList').innerText = null;
        
        loadCueFile(fileLocation.ch[selectChapter.selectedIndex-1].cuesFile)

        var audioSource = document.getElementById('mySrc')
        
        //aS.src = './BPK_Luke_01.mp3';
        aS.src = fileLocation.ch[selectChapter.selectedIndex-1].soundFile;
        audioID.load(); 
    }    
}

audioID.addEventListener('canplay', function(){
    playImage.src = "./images/playBtn.png";
})

// play/pause
playPauseBtn.addEventListener('click', function() {
        
        if (audioID.paused ) {                          //|| audioID.ended
          playPauseBtn.title = "pause";
          playImage.src = "./images/pauseBtn.png" ;
          audioID.play();
        }
        else if(audioID.currentTime >0 ){
          playPauseBtn.title = "play";
          playImage.src = "./images/playBtn.png";
          audioID.pause();
       }
   
})

// handle form input for screen colour
scrColBtn.addEventListener('click', function ()  {
       
    var newBkgrndColour = '';
    var newTextColour = '';
    var windowReference;
    var newW;   

    function promptForTwo() {
      var w = 480, h = 340;

      if (window.screen) {
        w = screen.availWidth;
        h = screen.availHeight;
      }

      var popW = 400, popH = 150;
      var leftPos = (w-popW)/2, topPos = (h-popH)/2;

      newW = window.open('./public/popup.html','windowName','width=' + popW + ',height=' + popH + 
                            ',top=' + topPos + ',left=' + leftPos);

      
    }

    function done() {
      //console.log('background = ' + newBkgrndColour + '\ntext = ' + newTextColour);
    }

    promptForTwo();

})

// if the audio ends - adjust the play-pause image
audioID.addEventListener('ended', function() {
    playImage.src = "./images/playBtn.png";
})

// select playmode
selectPlayMode.addEventListener('change', function() {
    audioID.pause();    
    var vsStr = '';
    vsStr = startVerseList.options[startVerseList.selectedIndex].text.slice(2);
    var startVerseValue = parseInt(vsStr, 10);
    vsStr = endVerseList.options[endVerseList.selectedIndex].text.slice(2);
    var endVerseValue = parseInt(vsStr, 10);
    var startTime = cueFile.chapter[startVerseList.selectedIndex].cueTime;
    var endTime = cueFile.chapter[endVerseList.selectedIndex + 1].cueTime;

    if (selectPlayMode.selectedIndex == 2 & startVerseValue <= endVerseValue) {        
        rangeStartVerse = startVerseValue;
        rangeEndVerse = endVerseValue;
        rangeStartTime = startTime;
        rangeEndTime = endTime;

        selectedVerse = startVerseList.options[startVerseList.selectedIndex].value;

        // reset the counter to the 1st verse in case user has changed end verse but not start verse
        set1stVerse(false);
        
        for (i in cueFile.chapter) {
            if ('vs ' + cueFile.chapter[i].verseNum == selectedVerse) {
                cueIndex = i;         
                displayCue(cueIndex);

                // reset current time          
                audioID.currentTime = cueFile.chapter[i].cueTime / 1000;                 

                break;
            }
        }
        
    } else if (selectPlayMode.selectedIndex == 1) {
        // do something 
        rangeEndTime = cueFile.chapter[cueIndex + 1].cueTime;      
    } else {
        selectPlayMode.selectedIndex = 0;
    } 
}, false);

// the user has selected a start verse. This could be a simple resetting of the timeer. 
// or the beginning of a range mode
startVerseList.addEventListener('change', function() {
    set1stVerse(true);
}, false);

// set the start verse
function set1stVerse(userInput){
    if (selectPlayMode.selectedIndex == 2 & userInput == true){
        selectPlayMode.selectedIndex = 0;
    }
    audioID.pause();
    
    selectedVerse = startVerseList.options[startVerseList.selectedIndex].text;

    for (i in cueFile.chapter) {
        if ('vs ' + cueFile.chapter[i].verseNum == selectedVerse) {
            cueIndex = i;         
            displayCue(cueIndex);

            // reset current time          
            audioID.currentTime = cueFile.chapter[i].cueTime / 1000;                       

           break;
        }
    }
}


// set the end verse in prep for reading a range of verses
endVerseList.addEventListener('change', function() {
    if (selectPlayMode.selectedIndex == 2){
        selectPlayMode.selectedIndex = 0;
    }

}, false);

// textDisplay checkbox - turn test display on or off
includeText.addEventListener('click', function() {
    if (includeText.checked) {
        //
        
    } else {       
        clearCueScreen();
    }
}, false);

// next verse
nextVerse.addEventListener('click', function() {
    
    // if play mode is 2 (range of verses) then cueIndex must be less than endverse index
    if (selectPlayMode.selectedIndex == 2 && cueIndex > endVerseList.selectedIndex){
        return;
    }
    
    if (cueIndex < cueFile.chapter.length) {

        audioID.currentTime = cueFile.chapter[cueIndex].cueTime/1000;
        displayCue(cueIndex);
        cueIndex++;
    } 

}, false);

// previous verse
previousVerse.addEventListener('click', function() {   
   
     // if play mode is 2 (range of verses) then cueIndex -2 must not be less than startverse index
    if (selectPlayMode.selectedIndex == 2 && cueIndex -2 < startVerseList.selectedIndex){
        return;
    }

    if (cueIndex > 1) {

        cueIndex = cueIndex-2;
        audioID.currentTime = cueFile.chapter[cueIndex].cueTime/1000;
        displayCue(cueIndex);
        cueIndex++;
    }

}, false);

// if user clicks on lastverse
lastVerse.addEventListener('click', function() {
        
    cueIndex = cueFile.chapter.length -1;   

    if (selectPlayMode.selectedIndex == 2){
            cueIndex = endVerseList.selectedIndex;
    } else {
        cueIndex = cueFile.chapter.length -1;
    }
    
    selectedVerse = cueFile.chapter[cueIndex].verseNum;
    audioID.currentTime = cueFile.chapter[cueIndex].cueTime / 1000;
    displayCue(cueIndex);
})

// repeat last passage button
repeatBtn.addEventListener('click', function() {

    switch (selectPlayMode.selectedIndex) {

        case 0: //"all"
           
            cueIndex = 0;
            audioID.currentTime = 0;
            displayCue(cueIndex);
            cueIndex++;
            break;
            
        case 1: // verse by verse            
                        
            if (cueIndex > 0) {
                
                cueIndex = cueIndex-2;
               
                audioID.currentTime = cueFile.chapter[cueIndex].cueTime/1000;
                rangeEndTime = cueFile.chapter[cueIndex + 1].cueTime;  
                displayCue(cueIndex); 
                
                break; 
            }
                break;
        case 2: //range of verses       
          
            // seek the start verse again
            selectedVerse = rangeStartVerse;
            for (i in cueFile.chapter) {
                if (cueFile.chapter[i].verseNum == selectedVerse) {
                    cueIndex = cueFile.chapter[i].verseNum - 1;
                    
                    displayCue(cueIndex);

                    // reset current time
                    audioID.currentTime = rangeStartTime / 1000;

                    break;
                }
            }
                    break;
    }

}, false);

// tmp 

//audioID.onloadedmetadata = function() {
audioID.oncanplaythrough = function() {
      totalTrackTime = audioID.duration 
      
      if (isFinite(totalTrackTime)){
        totalTrackTime =" / " + millisToMinutesAndSeconds(audioID.duration * 1000);
      } else {
        totalTrackTime = "";
      }  
};

// end tmp

/****************************** Grand Central *****************************
**
**  This is where the timer is monitored and managed
**
****************************************************************************/
audioID.addEventListener('timeupdate', function() {
    // Note that currentTime is returned by the built in controls in seconds - so I have to change it to 
    // milliseconds to compare with cues
    var timeNow = audioID.currentTime * 1000;
    // put out current time to display label
    document.getElementById('curTimeLabel').innerHTML = millisToMinutesAndSeconds(timeNow) + totalTrackTime;

    

    if (selectPlayMode.selectedIndex == 2 && timeNow >= rangeEndTime) {

        audioID.pause();
        return;
    } else if (selectPlayMode.selectedIndex == 1 && timeNow >= rangeEndTime) {

        audioID.pause();
        cueIndex++;
        if (cueIndex < cueFile.chapter.length){
            rangeEndTime = cueFile.chapter[cueIndex].cueTime;
            displayCue(cueIndex-1);

        }
        
        return;

    }

    if (cueFileAvailable == true && includeText.checked && cueIndex < cueFile.chapter.length) {

        // note that cue times from XML are in milliseconds
        
        if (cueFile.chapter[cueIndex].cueTime / 100 <= timeNow / 100) {
                    
            displayCue(cueIndex);
            cueIndex++;
        }
    }

}, false);

/*****************************************************
*
*   end Grand Central
*
*********************************************************/

//***************************************************************************
//
//                  - event 'seeked' -
//
// This event fires whenever the listener has moved the audio timer 
//  (ie. on the slider) --- OR --- whenever any other 'seek' action happens
//  like 1) moving to next verse or previous verse, 2) selecting a verse 
//  3) selecting 'range' in playmode, etc.
//
//****************************************************************************
// audioID.addEventListener('seeked', function() {
//     var timeNow = audioID.currentTime * 1000;

//       console.log("In the 'seeked' listener function: ")

    // reset  cueIndex  
    // for (var i in cueFile.chapter) {
    //     if (cueFile.chapter[i].cueTime > timeNow + 50) { // allow 50 msc's, so it doesn't get ahead of me

    //         // there needs to be error checking here
    //         cueIndex = cueFile.chapter[i].cueNdx - 1;
    //         break;
    //     }
    // }



// }, false);

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// function calculateCurrentValue(currentTime) {
//   var current_hour = parseInt(currentTime / 3600) % 24,
//     current_minute = parseInt(currentTime / 60) % 60,
//     current_seconds_long = currentTime % 60,
//     current_seconds = current_seconds_long.toFixed(),
//     current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + 
//         (current_seconds < 10 ? "0" + current_seconds : current_seconds);

//   return current_minute + ":" + current_seconds// current_time;
// }



/*************************************************************
**
**  Notes:
           .cueNdx is the index number of the verse - starting with 0
           .verseNum is the actual verse number

           In the select boxes for start verse and end verse, "value" is the same as 
           chapter[x].cueNdx. It is the index number of the verse. "text" is the actual name
           of the verse.
**
**
*************************************************************/


