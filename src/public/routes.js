import { makeRequest } from "./request.js"

async function lazyLogin() {
    let { status, data } = await makeRequest('login', 'POST', {})
    if (status == 200 || status == 201) {
        user = data.username;
        bash = '(' + user + '): \$ ';
        write('auto-login successful');
    }
    else {
        bash = '$ ';
        write(data);
    }
    nextLine();
}

async function doLoginRegister() {
    let bodyData = tmp
    let req = "";
    if (Object.keys(tmp).length == 2)
        req = 'login';
    else
        req = 'register';
    let { status, data } = await makeRequest(req, 'POST', bodyData)
    if (status == 200 || status == 201) {
        user = data.username;
        bash = '(' + user + '): \$ ';
    }
    else {
        bash = '$ ';
        write(data);
    }
}

async function login(com) {
    if (com.length == 1) {
        write('attempting auto-login');
        await lazyLogin();
        // write('add flags');
    }
    else if (com[1] == '-e') {
        if (com.length == 2) {
            write('No email found');
        }
        else {
            write('Enter Password: ')
            passwordMode = true;
            tmp['email'] = com[2];
        }
    }
    else {
        write('Invalid flag');
    }
}

function register(com) {
    if (com.length == 1) {
        write('add flags');
    }
    else if (com[1] == '-u') {
        if (com.length == 2) {
            write('No username found');
        }
        else {
            tmp['username'] = com[2];
            if (com.length == 3) {
                write('add flags');
            }
            else if (com[3] == '-e') {
                if (com.length == 4) {
                    write('No email found');
                }
                else {
                    write('Enter Password: ')
                    passwordMode = true;
                    tmp['email'] = com[4];
                }
            }
            else {
                write('Invalid flag');
            }
        }
    }
    else {
        write('Invalid flag');
    }
}

async function ls(com) {
    if (contest == '' || contestID == '') {
        // to be implemented.
        // filtering of contests on the basic of regex provided in flags/parameter
        // formating date to a more readable format

        let { status, data } = await makeRequest('api/contests', 'GET');
        if (data.length == 0) {
            write('No contests available')
        }
        else {
            let writeData = 'List of all available contests\n';
            let counter = 1;
            data.map((dt) => {
                writeData += counter + '. ' + dt.contest_ID + ' ' + dt.contest_name + ' ' + dt.start_time + '\n';
                counter++;
            })
            write(writeData)
        }
        nextLine();
    }
    else {

        let { status, data } = await makeRequest(`api/contest/${contestID}/questions`, 'GET');
        if (data.length == 0) {
            write('No questions available')
        }
        else {
            let writeData = 'The list of questions\n';
            let counter = 1;
            data.map((dt) => {
                writeData += counter + '. ' + dt.question_ID + ' ' + dt.question_cat + ' ' + dt.question_name + '\n';
                counter++;
            })
            write(writeData)
        }
        nextLine();
    }
}

async function cd(com) {
    if (com.length == 1) {
        contest = '';
        contestID = '';
        bash = '(' + user + '): \$ ';
        nextLine();
    }
    else if (com.length == 2) {
        const idd = com[1];
        let { status, data } = await makeRequest(`api/contest/${idd}`, 'GET');

        // start time and end time checks to be put .

        if (status == 200) {
            contest = data.contest_name;
            contestID = data.contest_ID;
            bash = '(' + user + '): /' + contestID + '\$ ';
            write(`welcome to contest ${contest}`)
            nextLine();
        }
        else {
            write('Invalid contest ID');
            nextLine();
        }
    }
    else {
        write('Invalid command');
        nextLine();
    }
}

async function cat(com) {
    if (contest == '') {
        write('please enter a contest');
        nextLine();
    }
    else if (com.length == 1) {
        write('please enter a question ID');
        nextLine();
    }
    else if (com.length == 2) {
        const idd = com[1];
        let { status, data } = await makeRequest(`api/contest/${contestID}/question/${idd}`, 'GET');
        console.log(data);
        let writeData = data.question_ID + ' (' + data.question_cat + ')\n ' 
        + data.question_name + '\n' + data.question + '\n';
        write(writeData)
        nextLine();
    }
    else {
        write('Invalid command');
        nextLine();
    }
}

async function hack(com) {
    if(com.length==3)
    {
        const bodyData={
            'contest_ID':contestID,
            'question_ID':com[1],
            'solution':com[2]
        }
        let {status,data}=await makeRequest('api/submit','POST',bodyData)
        if(status==200)
        {
            write('You\'ve already submitted this solution. It\'s Correct');
        }
        else if(status==201)
        {
            write('Congrats!!! That\'s the correct solution.')
        }
        else
        {
            write('Incorrect solution submitted');
        }
        nextLine();
    }
    else{
        write('Flags missing');
        nextLine();
    }
}

export { login, register, doLoginRegister, ls, cd, cat, hack };