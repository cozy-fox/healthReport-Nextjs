import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { Table } from "./../components/AG-table";

const Page = () => {

  const property = [
    { field: "USERNAME", filter: "agMultiColumnFilter" },
    { field: "DEFAULT_TABLESPACE", filter: "agMultiColumnFilter" },
    { field: "ACCOUNT_STATUS", filter: "agMultiColumnFilter" },
    { field: "LAST_LOGIN", filter: "agMultiColumnFilter" },
    { field: "CHANGE ON", filter: "agMultiColumnFilter" },
    { field: "EXPIRE ON", filter: "agMultiColumnFilter" },
  ]

  const numberProperty = []
  const [total, setTotal] = useState({ });

  const { selectedContent } = useContext(FileContext);
  const data = selectedContent !== null ? selectedContent.userAccount.data : [];


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
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Table
              title={"AMH USERS LOGIN AND PASSWORD INFO"}
              property={property}
              numberProperty={numberProperty}
              data={data}
              total={total}
              setTotal={setTotal}
              height="30vh"
            />
            <OverviewSales
              title="AMH USER SIZE"
              users={selectedContent !== null ? selectedContent.userSize.users : []}
              chartSeries={[
                {
                  name: 'SIZE in GB',
                  data: selectedContent !== null ? selectedContent.userSize.values : []
                }
              ]}
              sx={{ height: '100%' }}
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
