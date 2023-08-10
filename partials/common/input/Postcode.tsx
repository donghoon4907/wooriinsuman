import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { UseInputOutput } from '@hooks/use-input';

interface Props {
    isMt?: boolean;
    idPrefix?: string;
    disabled?: boolean;
    labelType: 'active' | 'disable';
    size: TypeAttributes.Size;
    postcodeHooks: UseInputOutput;
    address1Hooks: UseInputOutput;
    address2Hooks: UseInputOutput;
    address3Hooks: UseInputOutput;
    onClickPostcode: () => void;
}

export const PostcodeInput: FC<Props> = ({
    isMt = false,
    idPrefix = '',
    disabled = false,
    labelType,
    size,
    postcodeHooks,
    address1Hooks,
    address2Hooks,
    address3Hooks,
    onClickPostcode,
}) => {
    const id = idPrefix + 'addr3';

    return (
        <>
            <div className={`row ${isMt ? 'wr-mt' : ''}`}>
                <div className="col-6">
                    <WithLabel label="주소" type={labelType}>
                        <MyInput
                            type="text"
                            placeholder="우편번호"
                            disabled
                            onClick={onClickPostcode}
                            {...postcodeHooks}
                            button={{
                                type: 'button',
                                className: `btn-primary btn-${size}`,
                                disabled,
                                onClick: onClickPostcode,
                                children: (
                                    <>
                                        <span>찾기</span>
                                    </>
                                ),
                            }}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <MyInput
                            type="text"
                            placeholder="주소1"
                            disabled
                            {...address1Hooks}
                        />
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <WithLabel id={id} label="상세주소" type={labelType}>
                        <MyInput
                            type="text"
                            id={id}
                            placeholder="상세주소"
                            disabled={disabled}
                            {...address3Hooks}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <MyInput
                            type="text"
                            placeholder="주소2"
                            disabled
                            {...address2Hooks}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
