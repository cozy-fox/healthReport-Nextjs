import Head from 'next/head';
import { Box, Typography, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';

import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';

import { FileContext } from '../utils/FileContext';
import { useContext, useEffect } from 'react';

import config from "./../../global.config";
const now = new Date();

const Page = () => {
  const { setLatest, setSelectedFile, selectedContent, setSelectedContent } = useContext(FileContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.url + '/latestFile');
        if (response.ok) {
          const data = await response.json();
          setLatest(data.result);
          setSelectedFile(data.result);
          const response1 = await fetch(config.url + '/file?fileName=' + data.result);
          if (response1.ok) {
            const data1 = await response1.json();
            setSelectedContent(data1.result);
          } else {
            console.error('Error fetching file:', response1.status);
          }
        }
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
            >

              <OverviewBudget
                sx={{ height: '100%' }}
                title="VERSION AND RELEASE"
                value={selectedContent !== null ? selectedContent.overview : ''}
              />
            </Grid>
            <Grid
              xs={12}
              lg={6}
            >
              <OverviewTotalCustomers
                title="HOST INFO"
                data={selectedContent !== null ? selectedContent.hostInfo : []}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              lg={6}
            >
              <OverviewTasksProgress
                title="INSTANCE AND PARAMETERS"
                sx={{ height: '100%' }}
                data={selectedContent !== null ? selectedContent.parameter : []}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
