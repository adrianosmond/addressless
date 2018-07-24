import React from 'react'
import Link from 'gatsby-link'
import { formatDate } from '../utils/date'

const PostPreview = ({post}) =>
  <Link to={post.fields.slug} className="post-preview">
    <p className="metadata">{formatDate(post.frontmatter.date)} - {post.frontmatter.location}</p>
    <h2 className="h4 h2-small post-preview__title">{post.frontmatter.title}</h2>
    <p className="post-preview__teaser">{post.excerpt}</p>
  </Link>

export default PostPreview