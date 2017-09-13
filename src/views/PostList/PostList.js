import React from 'react';
import { Link } from 'react-router-dom';
import LoadingPost from '../LoadingPost/LoadingPost';
import PostPreview from '../PostPreview/PostPreview';

const PostList = (props) => {
  if (props.posts && props.posts.length > 0) {
    const filteredPosts = props.posts.filter((post) => {
      return !post.data || post.data.published === true
    });

    if (filteredPosts.length === 0) {
      return (
        <ul className={props.spaced ? 'post-list post-list--spaced' : 'post-list'}>
          <li className='post-list__item'>
            We don't have any posts yet. But we will soon! So please check back in with us in a day or two.
          </li>
        </ul>
      )
    }

    return (
      <ul className={props.spaced ? 'post-list post-list--spaced' : 'post-list'}>
        {filteredPosts.map((post, idx) => {
          if (props.limit && idx === props.limit) {
            return (
              <li key={idx} className='post-list__item'>
                <Link to={'/posts/'}>View all of our posts</Link>
              </li>
            )
          } else if (props.limit && idx > props.limit) {
            return null;
          }
          return (
            <li key={idx} className='post-list__item'>
              { post.data? <PostPreview data={post.data} date={post.date} /> : <PostPreview /> }
            </li>
          );
        })}
      </ul>
    )
  }
  return <LoadingPost />;
};

export default PostList;
