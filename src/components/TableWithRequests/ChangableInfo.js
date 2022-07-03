import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Select } from 'antd';

const { Option } = Select;

const ChangableContext = React.createContext(null);

export const ChangableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <ChangableContext.Provider value={form}>
                <tr {...props} />
            </ChangableContext.Provider>
        </Form>
    );
};

export const ChangableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(ChangableContext);

    const destinations = useSelector((state) => state.destinations.destinations);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record }, { ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    const selectOptions = destinations.map((item) => {
        const { address, id } = item;

        return (
            <Option key={id} value={address}>
                {address}
            </Option>
        );
    })

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Select ref={inputRef} onPressEnter={save} onBlur={save}>
                    {selectOptions}
                </Select>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};