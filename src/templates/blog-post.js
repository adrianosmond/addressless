import React from "react";
import rehypeReact from "rehype-react";
import Helmet from "react-helmet";
import { withPrefix } from "gatsby-link";
import { graphql } from "gatsby";
import Hero from "../components/Hero";
import Map from "../components/Map";
import Photo from "../components/Photo";

import "../css/reset.css";
import "../css/base.css";
import "../css/global.css";
import "./blog-post.css";

const postBody = C => <div className="post-body">{C.props.children}</div>;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    map: Map,
    photo: Photo
  }
}).Compiler;

export default ({ data }) => {
  const post = data.markdownRemark;
  const { date, title, headerImg, location } = post.frontmatter;
  const postTitle = `${title} - ${data.site.siteMetadata.title}`;
  const imgURL = withPrefix(headerImg);
  const siteURL = data.site.siteMetadata.url;
  return (
    <article className="post">
      <Helmet>
        <title>{postTitle}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`${siteURL}${imgURL}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      </Helmet>
      <Hero
        title={title}
        img={imgURL}
        links={true}
        date={date}
        location={location}
        isPost={true}
      />
      {postBody(renderAst(post.htmlAst))}
    </article>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
        url
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
      excerpt
    }
  }
`;
