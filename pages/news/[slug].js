import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import Header from "../../components/Header";
import NewsBlock from "../../components/NewsBlock";
import client from "../../lib/algoliaService";
import { fetchEntries } from "../../lib/contentfulService";

const News = ({ contentServiceData, newsData }) => {
  const [contentService, setContentService] = useState(contentServiceData[0]);
  const [news, setNews] = useState(newsData[0]);

  return (
    <div>
      <Header contentServiceData={contentService} />

      <div className="main">
        <Container maxWidth="lg">
          <div className="searchContainer">
            {news && (
                <NewsBlock
                    key={news.objectID}
                    imageUrl={news.imageUrl}
                    title={news.topics[0].title}
                    name={news.name}
                    slug={news.slug}
                    description={news.description}
                    date={news.publicationDate}
                    organization={news.organization[0].fields.name}
                    type="detail"
                />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default News;

export async function getStaticPaths() {
    const resAlgolia = await client.initIndex("news");
    const dataAlgolia = await resAlgolia.search();
    const paths = dataAlgolia.hits.map((news) => ({
        params: { slug: news.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const entries = await fetchEntries();

    const resAlgolia = await client.initIndex("news");
    const dataAlgolia = await resAlgolia.search(params.slug);

  return {
    props: {
      contentServiceData: entries,
      newsData: dataAlgolia.hits
    },
  };
}
