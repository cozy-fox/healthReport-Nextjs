import Head from 'next/head';
import { Box, Typography, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Divider from '@mui/material/Divider';
import { FileContext } from '../utils/FileContext';
import { useContext, useEffect, useState } from 'react';
import { beautifulStringStyles } from "../styles/index";
import config from "./../../global.config";
import axios from "axios";

const Page = () => {
  const { setLatest, setSelectedFile, selectedContent, setSelectedContent } = useContext(FileContext);
  const [success, setSuccess] = useState("false");
  const [state, setState] = useState(['warning', "Undetectable state"])
  const data = selectedContent !== null ? selectedContent.listener : [];

  const data2show = [
    {
      title: "Version and Release",
      value: selectedContent !== null ? selectedContent.overview : ' '
    }, {
      title: "Instance",
      value: selectedContent !== null ? selectedContent.hostInfo[0] : ' '
    }, {
      title: "Host Name",
      value: selectedContent !== null ? selectedContent.hostInfo[1] : ' '
    }, {
      title: "Host Address",
      value: selectedContent !== null ? selectedContent.hostInfo[2] : ' '
    }, {
      title: "DB up Time",
      value: selectedContent !== null ? selectedContent.hostInfo[5] : ' '
    }
  ]

  useEffect(() => {
    const setTrafficLight=(data)=>{
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
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(config.url + '/latestFile');
        const data = response.data;
        setLatest(data.result);
        setSelectedFile(data.result);
      
        const response1 = await axios.get(config.url + '/file?fileName=' + data.result);
        const data1 = response1.data;
        setSelectedContent(data1.result);
        setTrafficLight(data1.result.listener);
        setSuccess(true);
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    if (selectedContent === null) {
      fetchData();
    }

    setTrafficLight(data);

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
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
            sx={{
              '@media (max-width:900px)': {
                height: "100%",
              }
            }}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                >
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

                <Typography align='center' variant='h3' mb="30px">Overview</Typography>
                {data2show.map(each => {
                  return <>
                    <Box sx={{ my: 2, mx: 2 }} key={each.title}>
                      <Grid container alignItems="center" item xs>
                        <Typography gutterBottom variant="h6" component="div">
                          {each.value}
                        </Typography>
                      </Grid>
                      <Typography color="text.secondary" variant="body2">
                        {each.title}
                      </Typography>
                    </Box>
                    <Divider variant="middle" />
                  </>
                })}

              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <img
                  alt="Go to pro"
                  src={`/assets/overview-${success ? "normal" : "error"}.jpg`}
                  width="100%"
                />
              </Grid>
            </Grid>
          </Box>

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
