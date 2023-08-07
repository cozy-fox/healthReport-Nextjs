import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';
import { useEffect, useState } from 'react';
import config from "./../../global.config";

const badgeStyle = {
  position: 'absolute',
  top: '15px',
  right: '0px',
  transform: 'rotate(30deg)',
  background: 'green',
  color: 'white',
  padding: '5px',
};

const Page = () => {
  const { latest } = useContext(FileContext);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.url + '/filelist');
        if (response.ok) {
          const data = await response.json();
          setFiles(data.files);
        } else {
          console.error('Request failed with status:', response.status);
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Select File
                </Typography>
              </Stack>
            </Stack>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                key={latest}
                style={{ position: 'relative' }}
              >
                <CompanyCard company={latest} />
                <div style={badgeStyle}>Latest Version</div>
              </Grid>
              {files.map((file) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={file}
                >
                  <CompanyCard company={file} />
                </Grid>
              ))}
            </Grid>
          </Stack>
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
