import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { Table } from "./../components/AG-table";

const Page = () => {
  const property = [
    { field: "Create Ti", filter: "agMultiColumnFilter" },
    { field: "Database Name", filter: "agMultiColumnFilter" },
    { field: "Database Size", filter: "agMultiColumnFilter" },
    { field: "Used Space", filter: "agMultiColumnFilter" },
    { field: "Used in %", filter: "agMultiColumnFilter" },
    { field: "Free Space", filter: "agMultiColumnFilter" },
    { field: "Free in %", filter: "agMultiColumnFilter" },
    { field: "Growth DAY	", filter: "agMultiColumnFilter" },
    { field: "Growth DAY in %", filter: "agMultiColumnFilter" },
    { field: "Growth WEEK", filter: "agMultiColumnFilter" },
    { field: "Growth WEEK in %", filter: "agMultiColumnFilter" },
  ]

  const numberProperty = []
  const [total, setTotal] = useState({  });
  const { selectedContent } = useContext(FileContext);

  const data =selectedContent!==null?selectedContent.sizeGrowth.data:[];

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Table
        title={"AMH DATABASE SIZE GROWTH DETAIL"}
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
