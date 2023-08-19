import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { Table } from "./../components/AG-table";

const Page = () => {
  const property = [
    { field: "Datafile Name", filter: "agMultiColumnFilter" },
    { field: "TABLESPACE_NAME", filter: "agMultiColumnFilter" },
    { field: "ALLOCATED_MB", filter: "agNumberColumnFilter" },
    { field: "USED_MB", filter: "agNumberColumnFilter" },
    { field: "FREE_MB", filter: "agNumberColumnFilter" },
    { field: "AUT", filter: "agMultiColumnFilter" },
  ]

  const numberProperty = ["ALLOCATED_MB", "USED_MB", "FREE_MB"]
  const [total, setTotal] = useState({ "ALLOCATED_MB": 0, "USED_MB": 0, "FREE_MB": 0 });

  const { selectedContent } = useContext(FileContext);
  const data =selectedContent!==null?selectedContent.datafile.data:[];

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Table
        title={"Oracle Database Datafile SIZE"}
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
