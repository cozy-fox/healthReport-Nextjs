import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { Table } from "./../components/AG-table";

const Page = () => {
  const property = [
    { field: "PARAMETER", filter: "agMultiColumnFilter" },
    { field: "OPER_TYPE", filter: "agMultiColumnFilter" },
    { field: "INITIALIZED", filter: "agNumberColumnFilter" },
    { field: "TARGET", filter: "agNumberColumnFilter" },
    { field: "FINAL", filter: "agNumberColumnFilter" },
    { field: "STATUS", filter: "agMultiColumnFilter" },
  ]

  const numberProperty = ["INITIALIZED", "TARGET", "FINAL"]
  const [total, setTotal] = useState({ "INITIALIZED": 0, "TARGET": 0, "FINAL": 0 });
  const { selectedContent } = useContext(FileContext);
  const data =selectedContent!==null?selectedContent.DB_parameter.data:[];

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Table
        title={"Oracle Database Parameters Utilization Min And Max"}
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
