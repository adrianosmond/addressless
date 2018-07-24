import React from 'react'
import PostPreview from './post-preview'

import './post-list.css'

const PostList = ({posts, spaced}) => 
  <ul className={`post-list${ spaced ? ' post-list--spaced' : '' }`}>
  {posts.map(post => (
    <li key={post.id} className='post-list__item'>
      <PostPreview post={post} />
    </li>
  ))}
  </ul>

export default PostList