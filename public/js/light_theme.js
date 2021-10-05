// localStorage.setItem('dark-theme',false)

let mode = localStorage.getItem('dark-theme')
console.log(mode);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('dark mode');
} else {
    console.log('light mode');
}