
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

import { beautifulStringStyles } from "../styles/index";

export const Table = (props) => {

    const gridRef = useRef();
    const gridStyle = useMemo(() => ({ width: '100%', height: props.height }), []);
    const [rowData, setRowData] = useState([]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            filtre: true,
            minWidth: 100,
            resizable: true,
            sortable: true
        };
    }, []);
    const icons = useMemo(() => {
        return {
            'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>',
        };
    }, []);

    const EE = () => {
        const totalStyle = { paddingBottom: '15px' };
        return (
            <div style={{ textAlign: 'center' }}>
                <span>
                    <h2>
                        <b>Custom Stats</b>
                    </h2>
                    <dl style={{ fontSize: 'large', padding: '30px 40px 10px 30px' }}>
                        {props.total.length !== 0 && Object.entries(props.total).map(([key, value]) => {
                            return (
                                <dt
                                    style={totalStyle}
                                    key={key}>
                                    Total {key}: <b>{value}</b>
                                </dt>)
                        })}
                    </dl>
                </span>
            </div>
        )
    }

    const sideBar = useMemo(() => {
        return {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                },
                {
                    id: 'customStats',
                    labelDefault: 'Custom Stats',
                    labelKey: 'customStats',
                    iconKey: 'custom-stats',
                    toolPanel: EE
                }
            ],
            defaultToolPanel: 'customStats',
        };
    }, []);


    useEffect(() => {
        let result = []
        let total = props.total;
        for (const each of props.data) {
            let row = {}
            for (let i = 0; i < each.length; i++) {
                const key = props.property[i].field;
                if (props.numberProperty.includes(key)) {
                    row[key] = parseFloat(each[i]);
                    total[key] += parseFloat(each[i]);
                } else {
                    row[key] = each[i];
                }
            }
            result.push(row);
        }
        setRowData(result);
        props.setTotal(total);
    }, []);

    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
    }, []);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <div style={gridStyle} className="ag-theme-alpine">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                            style={{ marginBottom: "10px" }}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h5">
                                    {props.title}
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h6"
                                    style={beautifulStringStyles.container}>
                                    Total : {rowData.length}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={onBtExport}
                                >
                                    Export to Excel
                                </Button>

                            </Stack>
                        </Stack>

                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={props.property}
                            defaultColDef={defaultColDef}
                            sideBar={sideBar}
                            icons={icons}
                            enableCharts={true}
                            enableRangeSelection={true}
                            pagination={true}
                        />
                    </div>
                </Stack>
            </Container>
        </Box>
    );
};
