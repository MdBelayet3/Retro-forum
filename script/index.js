// function for load query data
const loadQueryData = async(inputValue) =>{
    const url = ` https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    displayData(posts);
}

// function for load all post data
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts`
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts
    // console.log(data);
    displayData(posts);
}

// function for display all post data
const displayData = async (posts) => {
    // console.log(posts);
    const allEventsDiv = document.getElementById('all-events');
    allEventsDiv.textContent = '';
    for (const post of posts) {
        console.log(post);
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="flex lg:flex-row flex-col gap-6 bg-gray-200  p-10 rounded-2xl m-6 ">
                        <div class="relative">
                            <img class="w-20 h-20 rounded-2xl" src="${post.image}" alt="">
                            <div class="rounded-full h-4 w-4 bg-green-700 absolute -top-[7px] lg:-right-1 right-[233px]"></div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex gap-5 flex-wrap">
                                <p># ${post.category}</p>
                                <p>Author : <span id="author">${post.author.name}</span></p>
                            </div>
                            <h3 class="text-2xl font-bold">${post.title}</h3>
                            <p>${post.description}</p>
                            <hr>
                            <div class="flex relative flex-wrap gap-6">
                                <div class="flex gap-10 flex-wrap">
                                    <p><i class="fa-solid fa-message"></i>&nbsp;&nbsp;&nbsp;<span>${post.comment_count}</span></p>
                                    <p><i class="fa-regular fa-eye"></i>&nbsp;&nbsp;&nbsp;<span>${post.view_count}</span></p>
                                    <p><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;&nbsp;<span>${post.posted_time} min</span></p>
                                </div>
                                <div class="pr-36 lg:absolute lg:left-[500px] "><button onclick="envelopeBtnHandle('${post.title},${post.view_count}')" class="btn bg-green-700 rounded-full"><i
                                            class="fa-solid fa-envelope text-white"></i></button></div>
                            </div>
                        </div>
                    </div>
        `
        allEventsDiv.appendChild(card);
    }
}

// function for load latest post data
const loadLatestData = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayLatestData(data)
}

// function for display latest post data
const displayLatestData = async (posts) => {
    const latestPost = document.getElementById('latest-post');
    for (const post of posts) {
        console.log(post);
        const latestPostDiv = document.createElement('div');
        latestPostDiv.innerHTML = `
            
            <div class="card bg-base-100 lg:w-[400px] shadow-xl items-stretch h-[90%]">
                <figure class="px-10 pt-10">
                    <img src="${post.cover_image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body ">
                    <p><i class="fa-solid fa-calendar-week"></i>&nbsp;&nbsp;&nbsp; ${post.author?.posted_date || 'No publish date'}</p>
                    <h2 class="card-title">${post.title}</h2>
                    <p>${post.description}</p>
                    <div class=" flex gap-6">
                        <img src="${post.profile_image}" alt="" class="h-12 w-12 rounded-full">
                        <div>
                            <p class="font-bold">${post?.author?.name || 'Unknown'}</p>
                            <p>${post?.author?.designation || 'Unknown'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        latestPost.appendChild(latestPostDiv);
    }
}

loadData();
loadLatestData();

const searchBtn = () => {
    console.log('Hi I am Belayet')
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    const lowerCaseText = searchFieldText.toLowerCase().trim();
    const comedy = 'comedy';
    const coding = 'coding';
    const music = 'music';
    console.log(lowerCaseText);
    if(lowerCaseText === comedy || coding || music){
    loadQueryData(lowerCaseText);
    console.log('if condition true')
    }
    else{
        loadData();
        console.log('else condition true');
    }
}

const readCount = document.getElementById('read-count');
let readCountText = readCount.innerText;
const envelopeBtnHandle = (title,viewCount) =>{
    console.log('envelope click');
    readCountText ++;
    readCount.innerText = readCountText;
    if(readCountText > 10){
        
    }
    const markReadDiv = document.getElementById('mark-read');
    const readDiv = document.createElement('div');
    readDiv.innerHTML = `
        <div class="flex mt-10 justify-between bg-white p-10 rounded-2xl">
            <p>${title}</p>
            <p><i class="fa-regular fa-eye"></i>&nbsp;&nbsp;&nbsp;${viewCount}</p>
        </div>
    `
    markReadDiv.appendChild(readDiv);
}