import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography  } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { applyPagination } from 'src/utils/apply-pagination';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import {beautifulStringStyles} from "../styles/index";
const Page = () => {
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer, key) => key);
      },
      [customers]
    );
  };
  const { selectedContent } = useContext(FileContext);
  const data = selectedContent !== null ? selectedContent.incomplete.data : [];
  const titles = selectedContent !== null ? selectedContent.incomplete.titles : [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

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
              <Stack direction="row">
                <Typography variant="h4">
                Incomplete AMH Transactions
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="h6" style={beautifulStringStyles.container}>
                  Patitions : {data.length}
                </Typography>
                <Typography variant="h6" style={beautifulStringStyles.container}>
                  Sum : {data.reduce((acc, curr)=> acc + parseInt(curr[5].replace(/\s/g,'')),0)}
                </Typography>
              </Stack>
            </Stack>
            <CustomersTable
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
