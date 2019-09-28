import React from "react";
import Helmet from "react-helmet";
import Link, { withPrefix } from "gatsby-link";
import { graphql } from "gatsby";
import Hero from "../components/Hero";
import PostList from "../components/PostList";
import Map from "../components/Map";

import "../css/reset.css";
import "../css/base.css";
import "../css/global.css";
import "../templates/blog-post.css";

const NUM_POSTS_TO_SHOW = 3;

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const title = data.site.siteMetadata.title;
  const siteURL = data.site.siteMetadata.url;
  const siteDescription = data.site.siteMetadata.description;
  const imgURL = withPrefix("/img/home.jpg");
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteURL} />
        <meta property="og:image" content={`${siteURL}${imgURL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
      </Helmet>
      <Hero title={title} img={imgURL} type="home" />
      <div className="post-body container--padded-bottom">
        <p>{siteDescription}</p>
      </div>
      <div className="container container--padded">
        <h2>What we thought</h2>
        <PostList
          posts={posts
            .filter((post, idx) => idx < NUM_POSTS_TO_SHOW)
            .map(post => post.node)}
          spaced={true}
        />
        <Link to={"/posts"}>View all of our posts</Link>
      </div>
      <div className="container container--padded-top">
        <h2>Where we went</h2>
      </div>
      <Map type="homepage" route="/route/nz-trip.json" posts={posts} />
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        url
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            location
            thumb
            longitude
            latitude
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
