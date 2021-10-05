async function queryUser(username){
    
    let apiReq = 'https://api.github.com/users/' + username

    // let data = 
    let {
            avatar_url:avatar, name, login, html_url:url,
            created_at, bio, public_repos: repos, 
            followers, following, twitter_username: twitter, 
            blog, location, company
        } =
    await fetch(apiReq).then(response => response.json()).then(res=> {
        return res
    });

    //remove classes that decreas the text opacity for previous results that were not available
    document.querySelectorAll('.unavailable').forEach(e=>{
        e.classList.remove('unavailable')
    })
    
    // avatar
    document.querySelector('#avatar').src = (avatar)? avatar : '';

    //name, login, join-date, and bio
    updateElementAttr('#name','innerText',(name)? name : 'Unknown');
    updateElementAttr('#login','innerText',(login)? '@'+login : 'Unknown');
    updateElementAttr('#login','href',(url)? url : 'Unknown'); //hide the link
    
    updateElementAttr('#join-date','innerText',(created_at)? getJoinDate(created_at) : 'Unknown');
    updateElementAttr('#bio','innerText',(bio)? bio : 'This profile has no bio');

    // repos, following, and followers
    updateElementAttr('#repos-number','innerText',(repos)? repos : '');
    updateElementAttr('#followers-number','innerText',(followers)? followers : '');
    updateElementAttr('#following-number','innerText',(following)? following : '');

    // location, twitter, blog, and company
    updateElementAttr('#location','innerText',(location)? location : updateClass('.location-container','add'));

    updateElementAttr('#twitter','href',(twitter)? 'https://twitter.com/'+ twitter : '');
    updateElementAttr('#twitter','innerText',(twitter)? twitter : updateClass('.twitter-container','add'));

    updateElementAttr('#blog','href',(blog)? blog : '');
    updateElementAttr('#blog','innerText',(blog)? blog : updateClass('.blog-container','add'));

    updateElementAttr('#company','innerText',(company)? company : updateClass('.company-container','add'));
}

document.getElementById('search-btn').addEventListener('click',function(){
    let username = document.getElementById('username').value
    if(username != '' && username != null) queryUser(username)
})

function getJoinDate(created_at){
    var fullDate = new Date(created_at)
    return `${fullDate.getDate()} ${fullDate.toLocaleDateString('default',{month:'short'})} ${fullDate.getFullYear()}`;
}

function updateElementAttr(querySelector, attribute, value){
    document.querySelector(querySelector)[attribute] = value
}

function updateClass(querySelector,action){
    document.querySelector(querySelector).classList[action]('unavailable'); //adding this class will toggle the visibility of the a tag and the span tag containing the error message
    return "Not available";
}

queryUser('octocat')