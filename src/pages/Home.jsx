import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { SideComments } from '../components/SideComments';
import { useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import HomePosts from '../components/HomePosts';
import HomeTags from '../components/HomeTags';
import { tabs } from '../utils/consts';
import { Button } from '@mui/material';
import { useMemo } from 'react';
import SearchParamsNavigate from '../hoc/SearchParamsNavigate';

export const Home = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [limit, setLimit] = useState(5);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  useEffect(() => {
    if (!allSearchParams.length > 0) {
      setTabValue(0);
      setSearchParams(`sort=all&limit=${limit}`);
    }
  }, [pathname, setSearchParams, allSearchParams.length, limit]);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        onChange={(e, newValue) => setTabValue(newValue)}
        value={tabValue}
        aria-label="basic tabs example">
        {tabs &&
          tabs.map((tab) => (
            <SearchParamsNavigate>
              <Tab key={tab.value} label={tab.label} />
            </SearchParamsNavigate>
          ))}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <HomePosts id={id} tabValue={tabValue} limit={limit} setLimit={setLimit} />
        </Grid>
        <Grid xs={4} item>
          <HomeTags />
          <SideComments />
        </Grid>
      </Grid>
    </>
  );
};
