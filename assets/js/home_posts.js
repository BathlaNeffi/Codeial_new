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
                deletePost($(` .delete-post-button`,newPost));
                 // call the create comment class
                 new PostComments(data.data.post._id);

                 // CHANGE :: enable the functionality of the toggle like button on the new post
                 new ToggleLike($(' .toggle-like-button', newPost));

                new Noty({
                    theme:'relax',
                    text: "Post Publisted!!",
                    type:"success",
                    layout: 'topRight',
                    timeout: 1500

                }).show();
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
               Post created by : &nbsp; ${post.user.name}
            </small>
            <br>
          
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post"> 
                    0 Likes
                </a>
            </small>
               
        </p>

        <div class="post-comments">
           
            <form action="/comments/create" method="post" id="post-${post._id}-comments-form" >
                <input type="text" name="content"  placeholder="Please leave your comment.." required>
                <input type="hidden" name="post" value="${post._id }">
                <input type="submit" value=" Add Comment">
            </form>
        
        </div>
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
        </li>
        `)
    }

    //  method  to delete  a post from DOM
    let deletePost = function (deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme:'relax',
                        text: "Post Deleted!!",
                        type:"success",
                        layout: 'topRight',
                        timeout: 1500
    
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    // converting post to ajax

    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
            
        });
    }
    convertPostsToAjax();
 
    createPost();
}