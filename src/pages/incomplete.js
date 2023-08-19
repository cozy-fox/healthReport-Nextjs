import { useState} from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { Table } from "./../components/AG-table";

const Page = () => {
  const property = [
    { field: "CREATION_DATE", filter: "agMultiColumnFilter" },
    { field: "PARTITION", filter: "agMultiColumnFilter" },
    { field: "PHASE", filter: "agMultiColumnFilter" },
    { field: "ACTION", filter: "agMultiColumnFilter" },
    { field: "REASON", filter: "agMultiColumnFilter" },
    { field: "TOTAL", filter: "agNumberColumnFilter" },
  ]

  const numberProperty = ["TOTAL"]
  const [total, setTotal] = useState({ "TOTAL": 0 });

  const { selectedContent } = useContext(FileContext);
  const data = selectedContent !== null ? selectedContent.incomplete.data : [];

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Table
        title={"Incomplete AMH Transactions"}
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
