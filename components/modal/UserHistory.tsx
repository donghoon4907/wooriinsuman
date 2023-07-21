import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyTable } from '@components/table';
import { hideUserHistoryModal } from '@actions/modal/user-history.action';
import { useColumn } from '@hooks/use-column';
import { LONG_USER_HISTORY } from '@constants/column';

interface Props {
    user_his: Array<any>;
}

export const UserHistoryModal: FC<Props> = ({ user_his }) => {
    const dispatch = useDispatch();

    const { isShowUserHistoryModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const columns = useColumn(LONG_USER_HISTORY);

    const handleClose = () => {
        dispatch(hideUserHistoryModal());
    };

    return (
        <Modal isOpen={isShowUserHistoryModal} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>담당변경이력</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <div className="wr-table--normal">
                            <MyTable columns={columns} data={user_his} />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </ModalFooter>
        </Modal>
    );
};