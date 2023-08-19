import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { beautifulStringStyles } from "../styles/index";
import { Table } from "./../components/AG-table";



const Page = () => {
  const property = [
    { field: "'TOPLOGICALI/OPROCESS'", filter: "agMultiColumnFilter" },
    { field: "SID", filter: "agNumberColumnFilter" },
    { field: "USERNAME", filter: "agMultiColumnFilter" },
    { field: "AMT_USED", filter: "agNumberColumnFilter" },
    { field: "PCT_USED", filter: "agNumberColumnFilter" },
  ]
  
  const numberProperty = ["SID", "AMT_USED", "PCT_USED"]
  const [total, setTotal]=useState({"SID":0,"AMT_USED":0, "PCT_USED":0});

  const { selectedContent } = useContext(FileContext);
  const data = selectedContent !== null ? selectedContent.used_cpu_1.data : [];
  const titles = selectedContent !== null ? selectedContent.used_cpu_1.titles : [];

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
                  Oracle Database CPU USED BY AMH
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography
                  variant="h6"
                  style={beautifulStringStyles.container}>
                  Total : {data.length}
                </Typography>
              </Stack>
            </Stack>
            <Table
              property={property}
              numberProperty={numberProperty}
              data={data}
              total={total}
              setTotal={setTotal}
              height="50vh"
            />
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

{/* <CustomersTable
              count={data.length}
              items={customers}
              title={titles}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            /> */}