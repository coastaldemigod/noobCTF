async function makeRequest(command, verb, bodyData) {
    let res;
    if (verb == 'POST') {
        res = await fetch(base_url + command, {
            method: verb,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bodyData)
        });
    }
    else if (verb == 'GET') {
        res = await fetch(base_url + command);
    }

    if (res.status == '200' || res.status == '201') {
        let data = await res.json();
        console.log(data);
        return { status: res.status, data };
    }
    else {
        let data = await res.json();
        return { status: res.status, data };
    }
}

export { makeRequest }