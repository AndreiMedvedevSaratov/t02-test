import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';

import { useServerData } from '../../server/useServerData';
import { fetchRequests, selectAll, requestItemUpdated } from '../../store/tableWithRequestsSlice';
import { fetchDestinations } from '../../store/destinationsSlice';
import { changeInAddress } from '../../store/mapComponentSlice';
import { ChangableRow, ChangableCell } from './ChangableInfo';

import { defaultColumns } from './utils/defaultColumns';

import 'antd/dist/antd.min.css';

const TableWithRequests = () => {

    const [selected, setSelected] = useState(null);
    const { request } = useServerData();
    const dispatch = useDispatch();
    const destinations = useSelector((state) => state.destinations.destinations);
    const requests = useSelector(selectAll);

    useEffect(() => {
        dispatch(fetchRequests());
        dispatch(fetchDestinations());
    }, []);

    const components = {
        body: {
            row: ChangableRow,
            cell: ChangableCell
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const handleSave = (row, changes) => {
        const addressType = changes ? Object.keys(changes)[0] : null;
        if (!addressType || row[addressType] === changes[addressType]) {
            return;
        }

        const selectedAddress = changes[addressType];
        const selectedLocation = destinations.filter((item) => item.address === selectedAddress);

        request(`http://localhost:3002/requests/${row.id}`, 'PUT', JSON.stringify({ ...row, ...changes }))
            .then(dispatch(requestItemUpdated({ id: row.id, changes: changes })))
            .catch((err) => console.log(err))

        if (selected) {
            dispatch(changeInAddress({ [addressType]: selectedLocation[0].coordinates }))
        }
    };

    const onChange = (selectedRowKey, selectedRows) => {
        if (selectedRows.length > 0) {
            const record = selectedRows[0];
            const startPoint = destinations.filter((item) => item.address === record.startPoint);
            const destinationPoint = destinations.filter((item) => item.address === record.destinationPoint);

            dispatch(changeInAddress({
                startPoint: startPoint.length > 0 ? startPoint[0].coordinates : [],
                destinationPoint: destinationPoint.length > 0 ? destinationPoint[0].coordinates : []
            }));

            setSelected(selectedRowKey);
        }
    }

    return (
        <>
            {requests && requests.length > 0 ?
                <Table
                    components={components}
                    dataSource={requests}
                    columns={columns}
                    rowSelection={{
                        type: "radio",
                        onChange: onChange
                    }}
                />
                : null}
        </>
    );
}

export default TableWithRequests;