import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';
import { useEffect, useState } from 'react';
import config from "./../../global.config";
import { TopNav } from './../layouts/dashboard/top-nav';

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
  const [showFiles, setShowFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [range, setRange] = useState([null, null])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.url + '/filelist');
        let maxDate=new Date(1970,0,1);
        let minDate=new Date(2100,0,1);
        if (response.ok) {
          const data = await response.json();
          setFiles(data.files.map(each => {
            const currentdate=new Date(parseInt(each.slice(7, 11)), parseInt(each.slice(5, 7))-1, parseInt(each.slice(3, 5)), parseInt(each.slice(12, 14)), parseInt(each.slice(14, 16)));
            if (currentdate>maxDate) maxDate=currentdate;
            if (currentdate<minDate) minDate=currentdate;
            return {
              name: each,
              date: currentdate
            }
          }));
          setRange([minDate, maxDate]);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    let searchWords = search.split(" ");
    let filteredFiles = files.filter(file => {
      return searchWords.every(word => {
        return file.name.toLowerCase().includes(word.toLowerCase());
      });
    })
    if (sort === "recent") {
      filteredFiles.sort((a, b) => b.date - a.date); // Sort by date (recent)
    } else if (sort === "late") {
      filteredFiles.sort((a, b) => a.date - b.date); // Sort by date (late)
    }

    filteredFiles = filteredFiles.filter(file => {
      return file.date >= range[0] && file.date <= range[1];
    });

    setShowFiles(filteredFiles);

  }, [search, sort, range, files])
  return (
    <>
      <TopNav
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        range={range}
        setRange={setRange}
      />
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          py: 8, transform: 'translateZ(0px)', flexGrow: 1
        }}
      >

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Grid
              container
              spacing={3}
            >
              {latest && <Grid
                xs={12}
                key={latest}
                style={{ position: 'relative' }}
              >
                <CompanyCard company={latest} />
                <div style={badgeStyle}>Latest Version</div>
              </Grid>}

              {showFiles.map((file) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={file.name}
                >
                  <CompanyCard company={file.name} />
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
