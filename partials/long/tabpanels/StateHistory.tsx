import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_STATE_HISTORY } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';

interface Props extends MyTabpanelProps {
    data: any[];
    editable: boolean;
}

export const StateHistoryTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    data,
    editable,
}) => {
    const columns = useColumn(LONG_STATE_HISTORY);

    const handleShowSettingModal = () => {};

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-table--normal">
                        <MyTable
                            columns={columns}
                            data={data}
                            showExtension={editable}
                            onClickRow={handleShowSettingModal}
                        />
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
