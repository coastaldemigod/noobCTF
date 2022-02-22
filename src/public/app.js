import { makeRequest } from "./request.js";
import { login, register, doLoginRegister, ls, cd, cat, hack } from "./routes.js";

function sanitize(command) {
    let arr = command.split(/ +/);
    arr = arr.filter((ele) => {
        if (ele != '')
            return ele;
    })
    console.log(arr);
    return arr;
}

async function processCommand(command) {
    let com = sanitize(command);

    if (com.length == 0) {
        write('Invalid Input');
        nextLine();
    }
    else if (com[0] == 'login') {
        login(com);
    }
    else if (com[0] == 'register') {
        register(com);
    }
    else if (com[0] == 'ls') {
        ls(com);
    }
    else if (com[0] == 'cd') {
        cd(com);
    }
    else if (com[0] == 'cat') {
        cat(com);
    }
    else if (com[0] == 'hack') {
        hack(com);
    }
    else if(com[0]=='cls' || com[0]=='clear'){
        currentText=bash;
        terminal.value=currentText;
        cursorPos = terminal.selectionStart;
    }
    else {
        let {status,data}=await makeRequest(com[0],'GET',{});
        
        write(data);
        // write('Invalid command');
        nextLine();
    }
}

async function input(event) {

    if (passwordMode) {
        let v = terminal.value.slice(cursorPos);
        tmpPass += v;
        terminal.value = currentText;
    }

    if (event.key == "Enter") {
        if (passwordMode) {
            event.preventDefault();
            // pass = terminal.value.slice(cursorPos);
            let pass = tmpPass;
            tmpPass = '';
            tmp['password'] = pass;
            await doLoginRegister();
            tmp = {};
            passwordMode = false;
            nextLine();
        }
        else {
            event.preventDefault();
            command = terminal.value.slice(cursorPos);
            console.log(command);
            history.push(command);
            await processCommand(command);
            historyBrowse = history.length;
        }
    }
    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        event.preventDefault();
        if (!passwordMode) {
            command = terminal.value.slice(cursorPos);
            history.push(command);
            if (event.key == "ArrowUp") {
                if (historyBrowse > 0)
                    historyBrowse--;
                if (history.length > 0)
                    terminal.value = currentText + history[historyBrowse];
            }
            if (event.key == "ArrowDown") {
                if (historyBrowse < history.length - 1)
                    historyBrowse++;
                if (history.length > 0 && historyBrowse < history.length - 1)
                    terminal.value = currentText + history[historyBrowse];
            }
            history.pop();
        }
    }

    if (terminal.selectionStart <= cursorPos) {
        terminal.selectionStart = cursorPos;
    }
    // console.log(terminal.selectionStart,cursorPos);
    if (terminal.value <= currentText) {
        terminal.value = currentText;
        // console.log("backspace");
    }
    // console.log(history,historyBrowse);
}

terminal.addEventListener("keydown", input)

async function autoLogin(){
    let { status, data } = await makeRequest('login', 'POST', {})
    if (status == 200 || status == 201) {
        user=data.username;
        bash = '('+user+'): \$ ';
        currentText = bash;
        terminal.value = currentText;
        cursorPos = terminal.selectionStart;
    }
    else 
    {
        console.log('It\'s ok buddy! We understand that either you hate cookies or you haven\'nt used this application before');
    }
}

window.onload=autoLogin();