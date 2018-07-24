import React from 'react'
import Link from 'gatsby-link'
import Metadata from './metadata'

import './post-preview.css'

const PostPreview = ({post}) =>
  <Link to={post.fields.slug} className="post-preview">
    <Metadata date={post.frontmatter.date} location={post.frontmatter.location} />
    <h2 className="h4 h2-small post-preview__title">{post.frontmatter.title}</h2>
    <p className="post-preview__teaser">{post.excerpt}</p>
  </Link>

export default PostPreview