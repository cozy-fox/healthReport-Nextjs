import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
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
  const [total, setTotal] = useState({ "SID": 0, "AMT_USED": 0, "PCT_USED": 0 });

  const { selectedContent } = useContext(FileContext);
  const data = selectedContent !== null ? selectedContent.used_cpu_1.data : [];

  const property1 = [
    { field: "AMH", filter: "agMultiColumnFilter" },
    { field: "USE_BY_AMH", filter: "agNumberColumnFilter" },
  ]

  const numberProperty1 = ["USE_BY_AMH"]
  const [total1, setTotal1] = useState({ "USE_BY_AMH": 0 });
  const data1 = selectedContent !== null ? selectedContent.used_cpu_2.data : [];

  const property2 = [
    { field: "USAGE_MESSAGE", filter: "agMultiColumnFilter" }
  ]

  const numberProperty2 = []
  const [total2, setTotal2] = useState({});
  const data2 = selectedContent !== null ? selectedContent.used_cpu_3.data : [];

  return (
    <>
      <Head>
        <title>
          Health Care Reports
        </title>
      </Head>
      <Table
        title={"Oracle Database CPU USED BY AMH"}
        property={property}
        numberProperty={numberProperty}
        data={data}
        total={total}
        setTotal={setTotal}
        height="50vh"
      />
      <Table
        title={"Oracle Database CPU USED BY AMH"}
        property={property1}
        numberProperty={numberProperty1}
        data={data1}
        total={total1}
        setTotal={setTotal1}
        height="25vh"
      />
      <Table
        title={"Oracle Database CPU USED BY AMH"}
        property={property2}
        numberProperty={numberProperty2}
        data={data2}
        total={total2}
        setTotal={setTotal2}
        height="25vh"
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