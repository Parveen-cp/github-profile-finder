
async function githubprofile() {
    try {
    const response=await fetch("https://api.github.com/users");
    if(!response.ok){
        throw new error("data is not present");
    }
    const data=await response.json();
    

    const search = document.getElementById("search");
    const find = document.getElementById("find");
    const output=document.getElementById("output");

    
    find.addEventListener('click', handleSearch);

    search.addEventListener('keydown', (e) => {
        if (e.key === "Enter")
            e.preventDefault()
            handleSearch();
    });

    function handleSearch(){
        const val = search.value;

        const pos=data.findIndex(user => user.login===val);

        if(pos !== -1){
            output.innerHTML = "";

            const image = document.createElement('img');
            image.src=data[pos].avatar_url;
            image.style.borderRadius="50%";

            const username=document.createElement('h2');
            username.textContent=data[pos].login;

            const profile=document.createElement('a');
            profile.id="anchor";
            profile.href=data[pos].html_url;
            profile.textContent="visite github profile";

            const fulldetails = document.createElement("button");
            fulldetails.id="details";
            fulldetails.textContent="Know More";

            fulldetails.addEventListener('click' , details);

            //Know More
            async function details(){
                const detail = await fetch(data[pos].url);
                const details = await detail.json();

                output.style.height="700px";
                const username = document.createElement('h2');
                username.textContent=`Username : ${details.name}`;

                const  comapny= document.createElement('h2');
                comapny.textContent=`Company : ${details.company}`;

                const blog = document.createElement('a');
                blog.href=details.blog;
                blog.textContent="Blogs";
                blog.id="anchor2";

                const location = document.createElement('h2');
                location.textContent=`Location : ${details.location}`;

                const email = document.createElement('h2');
                email.textContent=`Email : ${details.email}`;

                const twitter_username = document.createElement('h2');
                twitter_username.textContent=`Twitter username : ${details.twitter_username}`;

                const publicrepos = document.createElement('h2');
                publicrepos.textContent=`Public Repos : ${details.public_repos}`;

                const publicgits = document.createElement('h2');
                publicgits.textContent=`Public Gits : ${details.public_gits}`;

                const followers = document.createElement('h2');
                followers.textContent=`Followers : ${details.followers}`;

                const following = document.createElement('h2');
                following.textContent=`Following : ${details.following}`;

                fulldetails.style.display="none";

                const card= document.getElementById("container");
                card.style.height="1200px";
                card.style.marginTop="50px";
                card.style.marginBottom="50px";
                output.append(username,comapny,blog,location,email,twitter_username,publicrepos,publicgits,followers,following);
            }

            output.append(image,username,profile,fulldetails);
        } else {
            output.textContent = "User not found";
        }
    };
    }catch(error){
        console.log(error.message);
    }
    
    
}

githubprofile();

