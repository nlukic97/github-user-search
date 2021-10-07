// bootstraping event listeners
let themeBtn = document.getElementById('theme-btn')
themeBtn.addEventListener('click',function(){
    let savedThemePref = JSON.parse(localStorage.getItem('dark-theme'))

    /*  set theme and localstorage to be opposite 
        of current state (from false to true, true to false)*/
    changeTheme(!savedThemePref)
    localStorage.setItem('dark-theme',!savedThemePref) 
})

// initialization
init()

/** ----- METHODS -----  */

// First function to execute (checks and applies previously set localStorage theme preference...)
function init(){
    let savedThemePref = localStorage.getItem('dark-theme')
    if(savedThemePref){
        changeTheme(JSON.parse(savedThemePref))
    } else {
        getSystemThemePreference() // ... or defaults to system's theme preference
    }
}


// If no local storage is found with the theme preference, it is set based on the system preference
function getSystemThemePreference(){
    let darkModeStatus = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;
    
    //setting local storage and applying CSS
    if (darkModeStatus === true){
        localStorage.setItem('dark-theme',true)
        addDarkTheme()
    } else {
        localStorage.setItem('dark-theme',false) 
        removeDarkTheme()
    }
}


//toggle dark theme (didn't use .toggle in this project to be specific)
function changeTheme(val){
    if(val === true) addDarkTheme()
    else if(val === false) removeDarkTheme()
    else console.error('There is an error - dark-theme can only have values of \'true\' or \'false\'');
}


// adding 'dark' class to the body
function addDarkTheme(){
    document.body.classList.add('dark')
    themeBtn.classList.add('dark')
}

// removing 'dark' class from the body
function removeDarkTheme(){
    document.body.classList.remove('dark')
    themeBtn.classList.remove('dark')
}

