import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';

const MdxPageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;

  const { title: pageTitle } = data.mdx.frontmatter;

  const { body: pageBody } = data.mdx.code;

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} description={siteSubtitle}>
      <Sidebar />
      <Page title={pageTitle}>
        <MDXRenderer>{pageBody}</MDXRenderer>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query MdxPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

export default MdxPageTemplate;
