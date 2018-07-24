import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PostList from '../components/post-list'

export default ({ data }) => {
  return (
    <div className='container container--padded'>
      <Helmet title={`All posts - ${data.site.siteMetadata.title}`} />
      <h1 className="u-screen-reader">All Posts</h1>
      <Link to={'/'}>Home</Link> &gt; All Posts
      <PostList posts={data.allMarkdownRemark.edges.map(post => post.node)} />
    </div>
  );
};

export const query = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            location
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
