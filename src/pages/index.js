import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TitleBar from "../components/titlebar"
import ArticleCard from "../components/article-card"
import UIkit from "uikit"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <div>
      <TitleBar />
      <div className="uk-container uk-margin-top">
        <div className="uk-flex uk-flex-around uk-flex-wrap uk-flex-center uk-text-center">
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
          
            return (
              <ArticleCard title={ title } to={ post.fields.slug }/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// UIkit.sticky(document.getElementById("nav-bg"), [])
export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
