// This script contains all the variables used and state-maintained throughout the application.

const terminal = document.getElementById("terminal")
let bash = '$ ';
terminal.value = bash;
let currentText = terminal.value;
let cursorPos = bash.length;
let command = "";
let history = [];
let historyBrowse = history.length;
let passwordMode = false;
let commandMode = true;
let base_url = "http://localhost:5501/"
let tmp = {};
let tmpPass = '';
let contestID='';
let contest='';
let user='';

function write(op) {
    currentText = terminal.value + '\n' + op;
    terminal.value = currentText;
    cursorPos = terminal.selectionStart;
}

function nextLine() {
    currentText = terminal.value + '\n' + bash;
    terminal.value = currentText;
    cursorPos = terminal.selectionStart;
}

// cut-copy-paste is still enabled on the page
// this might be needed when copying the IDs from terminal
// shit happens when someone cuts/accidently cuts from the terminal
// cause it's still a textarea, things get cut which is a bug.