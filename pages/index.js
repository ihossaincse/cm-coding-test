import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NewsBlock from "../components/NewsBlock";
import client from "../lib/algoliaService";
import { fetchEntries } from "../lib/contentfulService";

const Home = ({ contentServiceData }) => {
  const [contentService, setContentService] = useState(contentServiceData[0]);
  const [algoliaSearch, setAlgoliaSearch] = useState();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setSearch(input);
  };

  useEffect(() => {
    async function getAlgolia() {
      const resAlgolia = await client.initIndex("news");
      const dataAlgolia = await resAlgolia.search();

      if (!search) {
        setAlgoliaSearch(dataAlgolia.hits);
      } else {
        const result = dataAlgolia.hits.filter(
          (item) => item.topics[0].title == search
        );
        console.log(result);
        setAlgoliaSearch(result);
      }
    }
    getAlgolia();
  }, [search]);

  return (
    <div>
      <Header contentServiceData={contentService} />

      <div className="main">
        <Container maxWidth="lg">
          <div className="main__header">
            <h2 className="main__header_title">{contentService.ttile}</h2>
          </div>
        </Container>
        <div className="mainNewsBox">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {algoliaSearch
                ?.slice(0, 3)
                ?.map(
                  ({
                    objectID,
                    imageUrl,
                    topics,
                    name,
                    slug,
                    description,
                    publicationDate,
                    organization,
                  }) => (
                    <Grid item xs={4} key={objectID}>
                      <NewsBlock
                        imageUrl={imageUrl}
                        title={topics[0].title}
                        slug={slug}
                        name={name}
                        description={description}
                        date={publicationDate}
                        organization={organization[0].fields.name}
                        type="box"
                      />
                    </Grid>
                  )
                )}
            </Grid>
          </Container>
        </div>
        <Container maxWidth="lg">
          <Grid container spacing={3} className="searchContainer">
            <Grid item xs={3}>
              <div className="searchBox">
                <div className="searchBox__label">
                  {contentService.searchLabel}
                  <div className="searchBox__inputbox">
                    <input
                      type="text"
                      className="searchBox__input"
                      placeholder="Search"
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <SearchIcon onClick={() => handleSearch()} />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={9} className="searchContainer__right">
              <div className="searchContainer__right_heading">
                {algoliaSearch?.length} Resources Found
              </div>
              {algoliaSearch?.map(
                ({
                  objectID,
                  imageUrl,
                  topics,
                  name,
                  slug,
                  description,
                  publicationDate,
                  organization,
                }) => (
                  <NewsBlock
                    key={objectID}
                    imageUrl={imageUrl}
                    title={topics[0].title}
                    name={name}
                    slug={slug}
                    description={description}
                    date={publicationDate}
                    organization={organization[0].fields.name}
                  />
                )
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const entries = await fetchEntries();

  return {
    props: {
      contentServiceData: entries,
    },
  };
}
