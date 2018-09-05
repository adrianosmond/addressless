import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import Hero from '../components/Hero'
import PostList from '../components/PostList'
import Map from '../components/Map'

export default ({ data }) => {
  return (
    <div>
      <Hero title={data.site.siteMetadata.title}
            img={withPrefix('/img/home.jpg')}
            type='home' />
      <div className='post-body container--padded-bottom'>
        <p>
          Hi there! We're Adrian and Dina. Two people who decided that the best way to get
          from London to Amsterdam was via New Zealand. On this site we documented more
          examples of our excellent sense of direction as we exchanged the Underground for
          a campervan, deadlines for path signs and bills for Bilbo.
        </p>
      </div>
      <div className='container container--padded'>
        <h2>What we thought</h2>
        <PostList posts={data.allMarkdownRemark.edges.map(post => post.node)} spaced={true} />
        <Link to={'/posts'}>View all of our posts</Link>
      </div>
      <div className='container container--padded-top'>
        <h2>Where we went</h2>
      </div>
      <Map type='homepage' route='/route/nz-trip.json' />
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 3) {
      totalCount
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
