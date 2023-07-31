import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';
import { useEffect, useState } from 'react';

const Page = () =>{
  const { selectedFile, setSelectedFile,selectedContent, setSelectedContent } = useContext(FileContext);

  const [files, setFiles]=useState([]);
  useEffect(() => {
    console.log(selectedFile);
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.41.136.181:3000/api/filelist');
        if (response.ok) {
          const data = await response.json();
          console.log(data.files);
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
          Companies | Devias Kit
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
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Sort
                </Button>
              </div> */}
            </Stack>
            {/* <CompaniesSearch /> */}
            <Grid
              container
              spacing={3}
            >
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
} ;

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
