{
    // method to submit the new post form using AJAX
    function createPost (){
        let newPostForm =$('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
             $.ajax({
            url:'/posts/create',
            type:'post',
            data:newPostForm.serialize(),
            success: function(data){
                // console.log(data);
                let newPost=newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
            },
            error: function(error){
                console.log(error.responseText);
            }
           })
        })
    };

    // method to create DOM
    let newPostDom= function(post){
       return $(`
        <li id="post-${post._id}">         
        <p>
            
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
              

                ${post.content}
            <small>
               Post created by : &nbsp; ${post.user}
            </small>
        </p>

        <div class="post-comments">
           
            <form action="/comments/create" method="post">
                <input type="text" name="content"  placeholder="Please leave your comment.." required>
                <input type="hidden" name="post" value="${post._id }">
                <input type="submit" value=" Add Comment">
            </form>
        
        </div>
        <div class="post-comments-list">
            <ul id="post-comments-<${post._id}">
            </ul>
        </div>
        </li>
        `)
    }

    createPost();
}