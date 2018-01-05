# crawler
## 主页

1. 获取推荐文章

   * url： /article/recommend_articles

   * method： get

   * params： null

   * response： 

     ```json
     {
       ret: 0,
       message: '',
       data: [
         {
           id: "5a46669c51882512ae12fa9a",
           author:{
             
           },
           imageCache: [],
           title: "教你用NodeJs+express玩跳一跳",
           meta: {
             likeCount: 0
           },
           tag: [
             "Express"
           ],
           comment: [
             
           ],
           shortContent: "2017年12月28日下午，微信发布了 6.6.1 版本，加入了「小游戏」功能，并提供了官方 demo「跳一跳」。",
           content: 'asdfas',
           buildTime: "1514894893.4997"
         }
       ]
     }
     ```

2.  获取全部文章

   * url: '/article/all_article'

   * method: get

   * params: ''

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: [
         {
           id: "5a46669c51882512ae12fa9a",
           author:{
             
           },
           imageCache: [],
           title: "教你用NodeJs+express玩跳一跳",
           meta: {
             likeCount: 0
           },
           tag: [
             "Express"
           ],
           comment: [
             
           ],
           shortContent: "2017年12月28日下午，微信发布了 6.6.1 版本，加入了「小游戏」功能，并提供了官方 demo「跳一跳」。",
           content: 'asdfas',
           buildTime: "1514894893.4997" 
         }
       ]
     }
     ```

3.  文章详情

   * url: '/article/article_detail'

   * method: get

   * params:

     * id: 文章id

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: {
        id: "5a46669c51882512ae12fa9a",
           author:{
             
           },
           imageCache: [],
           title: "教你用NodeJs+express玩跳一跳",
           meta: {
             likeCount: 0
           },
           tag: [
             "Express"
           ],
           comment: [
             
           ],
           shortContent: "2017年12月28日下午，微信发布了 6.6.1 版本，加入了「小游戏」功能，并提供了官方 demo「跳一跳」。",
           content: 'asdfas',
           buildTime: "1514894893.4997" 
         }   
       }
     }
     ```

4.  点赞

   * url:  /article/like

   * method: post

   * params: 

     * id //文章id

   * response:

     ```json
     {
       ret: 0, //0表示点赞成功，1表示点赞失败
       message: '',
     }
     ```

5.  评论

   * url: '/article/write_comment'

   * method: post

   * params:

     * id //文章id
     * content: '' //评论内容
     * uid: ? //用户id

   * response: 

     ```json
     {
       ret: 0,
       message: '',
       data: 
     }
     ```

6.  获取全部评论

   * url: /article/all_comment

   * method: get

   * params: 

     * id //文章id

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: [
         {
           commentId: '',
           author:{
             
           },
           pubTime: '',
           type: 1,
           toCommentId: '',
           content: '',
           replyComment: [{
             Comment
           }],
           meta: {
             likeCount: 0,
             likeUser: [
               user
             ]
           }
         }
       ]
     }
     ```

7. 查看回复**

   * url：/comment/reply_comment

   * method: get

   * params:

     * commentId //评论的id

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         Comment
       ]
     }
     ```



## 讨论区

1. 获取讨论列表

   * url: /discussion/all_discussion

   * method: get

   * params: ''

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: [
         {
           discussionId: '',
           pubTime: '',
           author: {
             
           },
           content: '',
           type: 0,
           toDiscussionId: '',
           replyDiscussion:[
             
           ],
           meta: {
             likeCount: 0,
             likeUser: [
               user
             ]
           }
         }
       ]
     }
     ```

2.  评论

   * url

   * method

   * params

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         {
           
         }
       ]
     }
     ```

     ​