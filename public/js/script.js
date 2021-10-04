async function queryUser(username){
    
    let url = 'https://api.github.com/users/' + username
    let data = await fetch(url).then(response => response.json()).then(res=> {
        return res
    })

    console.log(data.name);
    console.log(Date.parse(data.created_at));
    console.log(data.login);
    console.log(data.bio);

    console.log(data.repos);
    console.log(data.followers);
    console.log(data.following);

    console.log(data.twitter);
    console.log(data.blog);
    console.log(data.location);
    console.log(data.company)
}

document.getElementById('search-btn').addEventListener('click',function(){
    let username = document.getElementById('username').value
    if(username != '' && username != null) queryUser(username)
})

queryUser('octocat')