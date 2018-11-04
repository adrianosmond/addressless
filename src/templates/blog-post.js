import React from 'react'
import rehypeReact from 'rehype-react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby-link'
import Hero from '../components/Hero'
import Map from '../components/Map'
import Photo from '../components/Photo'

import '../css/reset.css';
import '../css/base.css';
import '../css/global.css';
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
  const { date, title, headerImg, location } = post.frontmatter;
  return (
    <article className='post'>
      <Helmet title={`${title} - ${data.site.siteMetadata.title}`} />
      <Hero title={title}
            img={withPrefix(headerImg)}
            links={true}
            date={date}
            location={location}
            isPost={true} />
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