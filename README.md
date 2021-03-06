# crawler
# 功能

1. 主页
   * 获取推荐的文章
   * 获取全部文章
   * 文章详情
   * 点赞
   * 评论
   * 获取全部评论
   * 查看回复
2. 评论区
   * 获取讨论列表
   * 发言
   * 评论发言
   * 获取评论列表
   * 点赞
3. 我的
   * 获取头像
   * 查看消息列表
   * 我喜欢的文章
   * 标签管理：全部标签、我关注的标签
   * 编辑资料
4. 公共
   * 获取用户资料
   * 发布的文章
   * 喜欢的文章
   * 关注的标签
   * 关注标签
   * 关注用户
   * 获取关注的人
   * 获取粉丝









## 主页

1. 获取推荐文章

   * url： /article/recommend_articles

   * method： get

   * params： 

     * size: 10 //可选
     * last_date: date //如果为空那么就是第一次加载，第二次加载要将这个数据传回去 

   * response： 

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true, //是否有更多的记录
         last_date: date, //查询的最后一条记录的时间
         article_list: [
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
     }
     ```


2.   获取全部文章

   * url: '/article/all_article'

   * method: get

   * params: 

     * last_date: date, //查询的最后一条记录的时间
     * size: 10

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true, //是否有更多的记录
         last_date: date, //查询的最后一条记录的时间
         article_list: [
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
     }
     ```


3.   文章详情

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

   * method: get

   * params: 

     * id //文章id

   * response:

     ```json
     {
       ret: 0, //0表示点赞成功，1表示点赞失败
       message: '',
     }
     ```

5.  取消点赞

   - url:  /article/dislike

   - method: get

   - params: 

     - id //文章id

   - response:

     ```json
     {
       ret: 0, //0表示取消点赞成功，1表示取消点赞失败
       message: '',
     }
     ```

     ​

6.  评论

   * url: '/article/write_comment'

   * method: post

   * params:

     * id //文章id
     * content: '' //评论内容
     * uid: ? //用户_id
     * type: 0 //0代表自己发布（即评论文章的），1代表评论别人的评论
     * toCommentId: 515 //如果是1的话，表明评论谁的

   * response: 

     ```json
     {
       ret: 0,
       message: '',
       data: 
     }
     ```

7.   获取全部评论

   * url: /article/all_comment

   * method: get

   * params: 

     * id //文章id
     * last_date: date 
     * size: 10

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true, //是否有更多的记录
         last_date: date, //查询的最后一条记录的时间
         comment_list: [
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
     }
     ```

8. 查看回复**

   * url：/comment/reply_comment

   * method: get

   * params:

     * more: true, //是否有更多的记录
     * last_date: date, //查询的最后一条记录的时间
     * size: 10

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         current_page: 1,
         total_page: 10,
         reply_comment: [
           comment
         ]
       }
     }
     ```



## 讨论区

1. 获取讨论列表

   * url: /discussion/all_discussion

   * method: get

   * params: 

     * last_date: date
     * size: 10

   * response:

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true,
         last_date: date, //查询的最后一条记录的时间
         discussion_list: [
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
     }
     ```

2.  发言

   * url：/discussion/write_discussion

   * method: post

   * params:

     * content: ''

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: ''
     }
     ```

3. 评论发言

   * url：/discussion/write_comment

   * method: post

   * params: 

     * discussionId: 1512,
     * content: ''
     * type: 0 //0代表自己发布，1代表评论别人的
     * toDiscussionId: //如果是1的话就需要这个字段

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: ''
     }
     ```

4.  获取讨论的评论列表

   * url: /discussion/all_discussion_comment

   * method: get

   * params:

     * discussionId: 1512
     * last_date:  date
     * size: 8

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true,
         last_date: date,
         discussion_comment_list: [
           {
             discussionId: '',
             pubTime: '',
             author: {

             },
             content: '',
             type: 1,
             toDiscussionId: '1512',
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
     }
     ```

5. 点赞

   * url: /discussion/like

   * method: post

   * params:

     * discussionId

   * resonse

     ```json
     {
       ret: 0
       message: ''
       data: ''
     }
     ```



## 我的

1. 获取头像

   * url: /my/avatar

   * method: get

   * params

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         avatar: ''
       }
     }
     ```

2. 查看消息列表

   * url: /my/all_message

   * method: get

   * params

     * last_date: date,
     * size: 10

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true,
         last_date: date,
         message_list: [
           {
             messageId: '',
             buildTime: '',
             fromUser: {},
             toUser: {},
             type: 1, //1点赞，2评论
             article: {},
             discussion: {},
             comment: {},
             read: false //是否已读
           }
         ]
       }
     }
     ```

3. 我喜欢的文章

   * url: /my/like_article

   * method: get

   * params

     * last_date: date
     * size: 10

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true,
         last_date: date,
         article_list: [
         	article
       	]
       }
     }
     ```

4. 全部标签

   * url: /common/all_tags

   * method: get

   * params

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         'vue',
         'angular'
       ]
     }
     ```

5. 我关注的标签

   * url: /my/interest

   * method: get

   * params

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         'vue',
         'angular'
       ]
     }
     ```

6. 编辑资料

   * url: /my/modify_description

   * method: post

   * params

     * username
     * intro
     * company

   * response

     ```json
     {
       ret: 0,
       message: '',
       
     }
     ```



## 公共

1. 获取用户资料

   * url: /common/get_user

   * method: get

   * params:

     * uid

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         user
       }
     }
     ```

2. 获取发布的文章

   * url: /common/user_articles

   * method: get

   * params: 

     * uid
     * last_date: date,
     * size: 10

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true,
         last_date: date,
         article_list: [
         	articles
      	]
       }
     }
     ```

3. 喜欢的文章

   * url: /common/like_articles

   * method: get

   * params

     * uid
     * last_date: date,
     * size: 10

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: {
         more: true,
         last_date: date,
         article_list: [
         	articles
       	]
       }
     }
     ```

4.  关注的标签

   * url: /common/user_interest

   * method: get

   * prams

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         'vue'
       ]
     }
     ```

5. 关注标签

   * url: /common/add_interest

   * method: post

   * params: 

     * interstName: 'vue'

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: ''
     }
     ```

6.  关注用户

   * url: /common/add_follow_user

   * method: post

   * params:

     * uid

   * response

     ```json
     {
       ret: 0,
       message: '',
       data
     }
     ```

7. 查看关注的人

   * url: /common/followee

   * method: get

   * params: 

     * uid

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         users
       ]
     }
     ```

8.  查看粉丝

   * url: /common/follower

   * method: get

   * prams

     * uid

   * response

     ```json
     {
       ret: 0,
       message: '',
       data: [
         users
       ]
     }
     ```

     ​