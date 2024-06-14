# Social Media Use case for DynamoDB Single Table Design

## Use Cases
1. Get user information for a given userID - `getUserInfoByUserID`
2. Get follower list for a given userID - `getFollowerListByUserID`
3. Get following list for a given userID - `getFollowingListByUserID`
4. Get post list for a given userID - `getPostListByUserID`
5. Get user list who likes the post for a given postID - `getUserLikesByPostID`
6. Get the like count for a given postID - `getLikeCountByPostID`
7. Get the timeline for a given userID - `getTimelineByUserID`

## Entities
1. User (Core)
2. Follower
3. Following
4. Timeline
5. Post
6. Post Like List
7. Post Like Count

## User Entity Design
Partition key format `u#12345`

<b>Sort Keys:</b>

count: follower, following and posts

info: name, content, imageUrl and etc

## User Follower Entity
Partition key format `u#12345#follower`
<b>Sort Keys:</b> will contain the `user id`

## User Following Entity
Partition key format `u#12345#following`
<b>Sort Keys:</b> will contain the `user id`

## User Post Entity
Partition key format `u#12345#post`

<b>Sort Key:</b> `p#1`

## Post Like Entity
Partition key format `p#1#likelist`

<b>Sort Keys:</b> will contain the `user id`