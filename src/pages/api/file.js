import fs from 'fs';
import cheerio from 'cheerio';



export default function handler(req, res) {
  if (req.method === 'GET') {
    let result = {};
    const files = fs.readFileSync('public/files/' + req.query.fileName, 'utf8');
    const $ = cheerio.load(files);

    const normalTableExtract = (number) => {
      const tableRows = $('table').eq(number).find('tr');
      let titles = [];
      let columnWiseData = [];
      tableRows.each((index, row) => {
        if (index === 0) {
          $(row).children('th').each((i, cell) => {
            titles.push($(cell).text().replace(/\n/g, ""));
          });
        } else {
          let resultRow = [];
          const rowData = $(row).children('td');
          rowData.each((i, cell) => {
            const cellData = $(cell).text().replace(/\n/g, "");
            resultRow.push(cellData);
          });
          columnWiseData.push(resultRow);
        }
      });
      return { titles: titles, data: columnWiseData };
    }

    const firstTable = $('table').first();
    let tableRows = firstTable.find('tr');
    const secondRow = tableRows.eq(1);
    const firstTdContent = secondRow.find('td').first().text().replace(/\n/g, "");
    result['overview'] = firstTdContent;
    // console.log('overview:', firstTdContent);

    const secondTable = $('table').eq(1);
    tableRows = secondTable.find('tr');
    const columnCount = tableRows.eq(0).find('th').length;
    let columnWiseData = [];
    for (let i = 0; i < columnCount; i++) { columnWiseData.push([]) };
    tableRows.each((index, row) => {
      const rowData = $(row).children(index === 0 ? 'th' : 'td');
      rowData.each((i, cell) => {
        const cellData = $(cell).text().replace(/\n/g, "");
        columnWiseData[i].push(cellData);
      });
    });
    result['hostInfo'] = columnWiseData;
    // console.log('hostInfo:', columnWiseData);

    const thirdTable = $('table').eq(2);
    tableRows = thirdTable.find('tr');
    columnWiseData = [];
    tableRows.each((index, row) => {
      if (index != 0) {
        let resultRow = [];
        const rowData = $(row).children('td');
        rowData.each((i, cell) => {
          const cellData = $(cell).text().replace(/\n/g, "");
          resultRow.push(cellData);
        });
        columnWiseData.push(resultRow);
      }
    });
    result['parameter'] = columnWiseData;
    // console.log('parameter:', columnWiseData);

    result['userAccount'] = normalTableExtract(3);
    // console.log('userAccount:', result['userAccount']);

    const fifthTable = $('table').eq(4);
    tableRows = fifthTable.find('tr');
    let users = [];
    let values = [];
    tableRows.each((index, row) => {
      if (index !== 0) {
        $(row).children('td').each((i, cell) => {
          if (i == 0) users.push($(cell).text().replace(/\n/g, ""))
          if (i == 1) values.push($(cell).text().replace(/\n/g, ""))
        });
      }
    });
    result['userSize'] = { users: users, values: values };
    // console.log('userSize:', result['userSize']);

    result['tableSpace'] = normalTableExtract(5);
    // console.log('tableSpace:', result['tableSpace']);

    result['sizeGrowth'] = normalTableExtract(6);
    // console.log('sizeGrowth:', result['sizeGrowth']);

    result['datafile'] = normalTableExtract(7);
    // console.log('datafile:', result['datafile']);

    result['DB_parameter'] = normalTableExtract(8);
    // console.log('DB_parameter:', result['DB_parameter']);

    result['used_cpu'] = normalTableExtract(9);
    // console.log('used_cpu:', result['used_cpu']);

    tableRows = $('table').eq(10).find('tr');
    columnWiseData = [];
    tableRows.each((index, row) => {
      if (index !== 0) {
        $(row).children('td').each((i, cell) => {
          if (i == 0) columnWiseData.push($(cell).text().replace(/\n/g, ""))
        });
      }
    });
    result['listener'] = columnWiseData;
    // console.log('listener:', result['listener']);

    result['partition'] = normalTableExtract(11);
    result['incomplete'] = normalTableExtract(12);
    // console.log('partition:', result['partition']);

    return res.status(200).json({ result })
  } else {
    // Handle any other HTTP method
  }
}
