import React from 'react'
import rehypeReact from 'rehype-react'
import Helmet from 'react-helmet'
import Link, { withPrefix } from 'gatsby-link'
import Map from '../components/map'
import Photo from '../components/photo'
import Metadata from '../components/metadata'
import { formatDate } from '../utils/date'

import './blog-post.css'

const postBody = C => <div className='post-body'>{C.props.children}</div>

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    "map": Map,
    "photo": Photo
  },
}).Compiler

export default ({ data }) => {
  const post = data.markdownRemark
  const { date } = post.frontmatter;
  return (
    <article className='post'>
      <Helmet title={`${post.frontmatter.title} - ${data.site.siteMetadata.title}`} />
      <div className='post-title-holder' style={{backgroundImage: `url(${ withPrefix(post.frontmatter.headerImg) })`}}>
        <div className='post-top-wrapper'>
          <div className='container container--padded-top'>
            <Link to={'/'}>Home</Link> &gt; <Link to={'/posts'}>Posts</Link>
          </div>
          <div className='post-title-and-date'>
            <div className='container'>
              <Metadata date={date} location={post.frontmatter.location} isPost={true} />
              <h1>{post.frontmatter.title}</h1>
            </div>
          </div>
        </div>
      </div>
      {
        postBody(renderAst(post.htmlAst))
      }
    </article>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        date
        location
        headerImg
      }
    }
  }
`;