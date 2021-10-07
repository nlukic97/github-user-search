// bootstraping event listeners
document.getElementById('search-btn').addEventListener('click',function(){
    let username = document.getElementById('username').value
    queryUser(username)
})

document.getElementById('username').addEventListener('keypress',e=>{
    let username = document.getElementById('username').value
    if(e.key === 'Enter') queryUser(username);
})

// initialization
queryUser('octocat')




/** ----- METHODS -----  */
async function queryUser(username){
    if(username == '' || username == null){
        return; //if the input has no text, method stops executing
    } 

    let data = await fetch('https://api.github.com/users/' + username)
        .then(response => (response.status != 200) ? false : response.json())

    if(data === false) {
        //  If the api does not return a status of 200, show the error message in search bar and end code execution from this line
        updateClass('.search-container','add');
        return 
    }
    
    let {
        avatar_url:avatar, 
        name, 
        login, 
        html_url:url,
        created_at, 
        bio, 
        public_repos: repos, 
        followers, 
        following, 
        twitter_username: twitter, 
        blog, 
        location, 
        company
    } 
    = data;

    //remove classes that decreas the text opacity for previous results that were not available and hides the search bar error message
    document.querySelectorAll('.unavailable').forEach(e=>{
        e.classList.remove('unavailable')
    })
    
    // avatar
    document.querySelector('#avatar').src = (avatar)? avatar : '';

    //name, login, join-date, and bio
    updateElementAttr('#name','innerText',(name)? name : 'Unknown');
    updateElementAttr('#login','href',(url)? url : ''); //hide the link
    updateElementAttr('#login','innerText',(login)? '@'+login : updateClass('.login-container','add','Not available'));
    
    updateElementAttr('#join-date','innerText',(created_at)? 'Joined ' + getJoinDate(created_at) : 'Unknown');
    // updateElementAttr('#bio','innerText',(bio)? bio : 'This profile has no bio');
    updateElementAttr('#bio','innerText',(bio)? bio : updateClass('#bio','add','This profile has no bio'));


    // repos, following, and followers
    /** differing conditional statement due to the fact that a user having 
     * 0 repos, 0 followers, or 0 following causes the condition 
     * statement to return to false, which is inaccurate 
     * */
    updateElementAttr('#repos-number','innerText',(repos !== null && followers != undefined)? repos : ''); 
    updateElementAttr('#followers-number','innerText',(followers !== null && followers != undefined)? followers : '');
    updateElementAttr('#following-number','innerText',(following !== null && followers != undefined)? following : '');

    // location, twitter, blog, and company
    updateElementAttr('#location','innerText',(location)? location : updateClass('.location-container','add','Not available'));

    updateElementAttr('#twitter','href',(twitter)? 'https://twitter.com/'+ twitter : '');
    updateElementAttr('#twitter','innerText',(twitter)? twitter : updateClass('.twitter-container','add','Not available'));

    updateElementAttr('#blog','href',(blog)? createWebAddress(blog) : '');
    updateElementAttr('#blog','innerText',(blog)? blog : updateClass('.blog-container','add','Not available'));

    updateElementAttr('#company','innerText',(company)? company : updateClass('.company-container','add','Not available'));
}

function getJoinDate(created_at){
    var fullDate = new Date(created_at)
    return `${fullDate.getDate()} ${fullDate.toLocaleDateString('default',{month:'short'})} ${fullDate.getFullYear()}`;
}

function updateElementAttr(querySelector, attribute, value){
    document.querySelector(querySelector)[attribute] = value //example: item.href=value or item.innerText = value
}

// action - 'add' or 'remove' the 'unavailable' class (that causes its children elements to change opacity and visibility)
function updateClass(querySelector,action, returnMessage){
    document.querySelector(querySelector).classList[action]('unavailable');
    return returnMessage;
}


/** 
 * Some users add 'https://' with their blog url (github.com/daniel), and some don't (github.com/bradtraversy)
 * (which would change the anchor tag href to '/public/[their_blog_url])' 
 * causing an error - this method solves this problem.*/
function createWebAddress(data){
    console.log(data);
    if(data.includes('https://') || data.includes('http://')){
        return data
    } else {
        return `https://${data}`
    }
}





