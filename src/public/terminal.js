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

const allCommandsHelp=`
help : to show all commands and their usage
cls or clear : clear terminal
login : login using stored credentials
login -e <email> : login using email
register -u <username> -e <email> : register using username and email
ls : show all contests when you haven't entered a contest and show all questions in a contest when you've entered a contest
cd : exit from contest
cd <contest_id> : enter a contest with the given contest_id
cat <question_id> : show the question on the terminal
hack <question_id> <solution/flag> : submit the solution/flag to the question
`

// cut-copy-paste is still enabled on the page
// this might be needed when copying the IDs from terminal
// shit happens when someone cuts/accidently cuts from the terminal
// cause it's still a textarea, things get cut which is a bug.