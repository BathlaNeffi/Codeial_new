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
                let newPost=newPostDom(data.data.post,data.data.user);
                $('#posts-list-container>ul').prepend(newPost);
                deletPost($(` .delete-post-button`,newPost));

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
    let newPostDom= function(post,user){
       return $(`
        <li id="post-${post._id}">         
        <p>
            
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
              

                ${post.content}
            <small>
               Post created by : &nbsp; ${user.name}
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

    //  method  to delete  a post from DOM
    let deletPost = function (deleteLink){
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

    function convertPostToAjax(){
        $('#posts-list-container>ul').each(function(){
            let self=$(this);
            let deleteButton=$(` .delete-post-button`,self);
            deletPost(deleteButton);
        })
    };
    convertPostToAjax();
 
    createPost();
}