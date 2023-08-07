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
import { beautifulStringStyles } from "../styles/index";

const Page = () => {
  const { selectedContent } = useContext(FileContext);
  const [state, setState] = useState(['warning', "Undetectable state"])
  const data = selectedContent !== null ? selectedContent.listener : [];
  useEffect(() => {
    data.length !== 0 && data.forEach(each => {
      if (each.includes('successfully')) {
        setState(['success', "Successful state"]);
      } else if (each.includes("connection refused")) {
        setState(["error", "Connection refused"]);
      } else if (each.includes("no listener")) {
        setState(["error", "No listener"])
      } else {
        setState(['warning', "Undetectable state"]);
      }
    })
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
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Oracle Database LISTENER STATUS
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-around"
                style={beautifulStringStyles.trafficBackground}
              >
                <span style={{
                  backgroundColor: state[0] == "error" ? "crimson" : "#ffcccc",
                  ...beautifulStringStyles.trafficEach,
                  ...(state[0] == "error" ? beautifulStringStyles.trafficSelectedRed : {})
                }}></span>
                <span style={{
                  backgroundColor: state[0] == "warning" ? "darkorange" : "#ffffe6",
                  ...beautifulStringStyles.trafficEach,
                  ...(state[0] == "warning" ? beautifulStringStyles.trafficSelectedYellow : {})
                }}></span>
                <span style={{
                  backgroundColor: state[0] == "success" ? "limegreen" : "#ebfaeb",
                  ...beautifulStringStyles.trafficEach,
                  ...(state[0] == "success" ? beautifulStringStyles.trafficSelectedGreen : {})
                }}></span>
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
      </Box >
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
