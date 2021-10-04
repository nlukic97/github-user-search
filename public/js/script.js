async function queryUser(username){
    
    let url = 'https://api.github.com/users/' + username

    // let data = 
    let {
            avatar_url:avatar, name, login, 
            created_at, bio, public_repos: repos, 
            followers, following, twitter, 
            blog, location, company
        } =
    await fetch(url).then(response => response.json()).then(res=> {
        return res
    });

    // console.log(created_at);
    var fullDate = new Date(created_at)
    let stringDate = `${fullDate.getDate()} ${fullDate.toLocaleDateString('default',{month:'short'})} ${fullDate.getFullYear()}`;
    console.log(stringDate);
    updateElement('#join-date',(stringDate)? stringDate : 'Unknown');
    

    document.querySelector('#avatar').src = (avatar)? avatar : '';
    
    updateElement('#name',(name)? name : 'Unknown');
    updateElement('#login',(name)? '@'+login : 'Unknown');
    updateElement('#bio',(bio)? bio : 'This profile has no bio');

    updateElement('#repos-number',(repos)? repos : '');
    updateElement('#followers-number',(followers)? followers : '');
    updateElement('#following-number',(following)? following : '');
    
    updateElement('#location',(location)? location : 'Not available');
    updateElement('#twitter',(twitter)? twitter : 'Not Available');
    updateElement('#blog',(blog)? blog : 'Not Available');
    updateElement('#company',(company)? company : 'Not Available');





}

document.getElementById('search-btn').addEventListener('click',function(){
    let username = document.getElementById('username').value
    if(username != '' && username != null) queryUser(username)
})

function updateElement(querySelector, value){
    document.querySelector(querySelector).innerText = value
}

queryUser('octocat')