import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';

const CustomPageTemplate = ({ data, children }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;

  const { title: pageTitle, description: pageDescription } = data.markdownRemark.frontmatter;

  const { html: pageBody } = data.markdownRemark;

  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription}>
      <Sidebar />
      <Page title={pageTitle}>
        {children}
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  );
};

export default CustomPageTemplate;
