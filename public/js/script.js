async function queryUser(){
    let username = document.getElementById('username').value
    let url = 'https://api.github.com/users/' + username

    let data = await fetch(url).then(response => response.json()).then(res=> {
        return res
    })

    console.log(data);
}

// queryUser('nlukic97');

document.getElementById('search-btn').addEventListener('click',queryUser)