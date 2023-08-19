import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { Table } from "./../components/AG-table";

const Page = () => {
  const property = [
    { field: "USERNAME", filter: "agMultiColumnFilter" },
    { field: "STATUS", filter: "agMultiColumnFilter" },
    { field: "CREATED", filter: "agMultiColumnFilter" },
    { field: "PROFILE", filter: "agMultiColumnFilter" },
    { field: "DEFAULT_TS#", filter: "agMultiColumnFilter" },
    { field: "TEMP_TS#", filter: "agMultiColumnFilter" },
  ]

  const numberProperty = []
  const [total, setTotal] = useState({  });
  const { selectedContent } = useContext(FileContext);

  const data =selectedContent!==null?selectedContent.tableSpace.data:[];

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Table
        title={"AMH TABLESPACE INFO DATA AND INDEX"}
        property={property}
        numberProperty={numberProperty}
        data={data}
        total={total}
        setTotal={setTotal}
        height="100vh"
      />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
