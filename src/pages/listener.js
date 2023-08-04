import { use, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import Badge from '@mui/material/Badge';

const Page = () => {
  const { selectedContent } = useContext(FileContext);
  const [state, setState]=useState(['warning', "Undetectable state"])
  const data = selectedContent !== null ? selectedContent.listener : [];
  useEffect(() => {
    data.length!==0 && data.forEach(each=>{
      if(each.includes('successfully')){
        setState(['success', "Successful state"]);
      } else if(each.includes("connection refused")){
        setState(["error","Connection refused"]);
      } else if(each.includes("no listener")){
        setState(["error", "No listener"])
      } else{
        setState(['warning', "Undetectable state"]);
      }
    })
  },[]);
  
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
            >
              <Stack spacing={1}>
                <Badge badgeContent={state[1]} color={state[0]}>
                  <Typography variant="h4">
                    Oracle Database LISTENER STATUS
                  </Typography>
                </Badge>
              </Stack>
            </Stack>
            <Grid
              container
            >
              {data.map((file) => (
                <Grid
                  xs={12}
                  key={file}
                >
                  {file}
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
