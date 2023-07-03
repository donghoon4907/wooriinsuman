import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UploadSelect } from '@components/select/Upload';
import { MyTable } from '@components/table';
import { readAndConvert } from '@utils/xlsx';
import { convertForSelectUpload } from '@utils/converter';
import { MyPagination } from '@components/pagination';
import { useLoading } from '@hooks/use-loading';

// const selectOptions = {
//     long: [
//         {
//             label: '계약번호',
//             value: 'cnum',
//             isFixed: false,
//             keys: true,
//         },
//         {
//             label: '실적보험료',
//             value: 'payment',
//             isFixed: false,
//             keys: [],
//         },
//         {
//             label: '납입기간',
//             value: 'du',
//             isFixed: false,
//         },
//     ],
// };

const SelectUpload: NextPage = () => {
    // const dispatch = useDispatch();

    const loading = useLoading();

    // const [file, setFile] = useState<string>('');

    const [excelFields, setExcelFields] = useState<any[]>([]);

    const [excelData, setExcelData] = useState<any[]>([]);

    const handleChangeFile = async (evt: ChangeEvent<any>) => {
        const file = evt.target.files[0];

        loading.on();

        try {
            const { fields, data } = await readAndConvert(
                file,
                convertForSelectUpload,
            );

            setExcelFields(fields);

            setExcelData(data);
        } catch (error) {
            console.error(error);
        } finally {
            loading.off();
        }
    };

    const handleVerification = () => {
        // dispatch(loadingOn());
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () =>
            excelFields.map(({ label, value }) => {
                return {
                    columns: [
                        {
                            header: (info: any) => {
                                return <strong>{label}</strong>;
                            },
                            accessorKey: value,
                            cell: (info: any) => {
                                let className = '';
                                let cellValue = info.getValue();

                                return (
                                    <span className={className}>
                                        {cellValue}
                                    </span>
                                );
                            },
                        },
                    ],
                    header: (info: any) => {
                        let cellValue = info.column.id;

                        return (
                            <div style={{ minWidth: 110 }}>
                                <UploadSelect
                                    options={excelFields}
                                    placeholder={'선택하세요'}
                                    placeHolderFontSize={16}
                                    defaultValue={
                                        value === cellValue
                                            ? excelFields[+cellValue]
                                            : null
                                    }
                                    height="30px"
                                />
                            </div>
                        );
                    },
                    accessorKey: value,
                };
            }),
        [excelFields],
    );

    return (
        <>
            <Head>
                <title>선택업로드</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <div className="wr-pages-create-post">
                {/* <Breadcrumb /> */}
                <div>
                    <h2></h2>
                </div>
                <div>
                    <input type="file" onChange={handleChangeFile} />
                </div>
                <div className="mt-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleVerification}
                    >
                        검증
                    </button>
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-warning">
                        업로드
                    </button>
                </div>
                {excelData.length > 0 && (
                    <>
                        <MyTable
                            columns={columns}
                            data={excelData}
                            pageSize={10}
                        />
                        <MyPagination />
                    </>
                )}
            </div>
        </>
    );
};

export default SelectUpload;
