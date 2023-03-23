import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`

const Card = styled.div`
  margin: 0.75rem 0;
  max-width: 300px;
  border: 1px solid #8F8F8F;
  border-radius: 2px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0px 2px 2px #8F8F8F4F;
  transition: all 200ms;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`

const CardImage = styled.img`
  max-width: 240px;
  max-height: 240px;
`

const CardTitle = styled.h4`
  font-style: italic;
  margin: 0;
  margin-top: 1rem;
`

const CardAuthor = styled.h4`
  white-space: pre-line;
  margin: 0;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes.sort(function(a,b){
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <CardContainer>
        {posts.map((post) => (
          <Link key={post.fields.slug} href={`${post.fields.slug}`}>
            <Card>
              <CardImage src={post.frontmatter.img} />
              <CardTitle>{post.frontmatter.title || post.fields.slug}</CardTitle>
              <CardAuthor>{"by\n" + (post.frontmatter.author || 'Anonymous')}</CardAuthor>
            </Card>
          </Link>
        ))}
      </CardContainer>

    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          img
          author
        }
      }
    }
  }
`
