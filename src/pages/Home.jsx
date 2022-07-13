import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { SideComments } from '../components/SideComments';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HomePosts from '../components/HomePosts';
import HomeTags from '../components/HomeTags';

export const Home = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        onChange={(e, newValue) => setTabValue(newValue)}
        value={tabValue}
        aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <HomePosts id={id} tabValue={tabValue} />
        </Grid>
        <Grid xs={4} item>
          <HomeTags />
          <SideComments />
        </Grid>
      </Grid>
    </>
  );
};
