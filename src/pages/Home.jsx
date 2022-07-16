import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { SideComments } from '../components/SideComments';
import { useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import HomePosts from '../components/HomePosts';
import HomeTags from '../components/HomeTags';
import { tabs } from '../utils/consts';

export const Home = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams = Object.fromEntries([...searchParams]);
  useEffect(() => {
    if (!allSearchParams.length > 0) {
      setTabValue(0);
      setSearchParams('sort=all');
    }
  }, [pathname, setSearchParams, allSearchParams.length]);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        onChange={(e, newValue) => setTabValue(newValue)}
        value={tabValue}
        aria-label="basic tabs example">
        {tabs &&
          tabs.map((tab) => (
            <Tab
              onClick={() => navigate(`${pathname}?sort=${tab.value}`)}
              key={tab.value}
              label={tab.label}
            />
          ))}
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
