import type { FC, MouseEvent } from 'react';
import type { CoreLinkTabOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { MdClose } from 'react-icons/md';
import { IconWrapper } from '@components/IconWrapper';

interface Props extends CoreLinkTabOption {
    /**
     * 확장 여부
     */
    isExpand?: boolean;
    /**
     * 클릭 이벤트
     */
    onClick?: (tabId: string) => void;
    /**
     * 클릭 이벤트
     */
    onClose?: (tabId: string) => void;
}

export const LinkTab: FC<Props> = ({
    id,
    label = 'label props were not passed',
    to,
    isExpand,
    onClick,
    onClose,
}) => {
    const router = useRouter();

    const isActive = router.pathname === to;

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (isActive) {
            return;
        }

        onClick?.(id);

        router.push(to);
    };

    const handleClose = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        onClose?.(id);
    };

    return (
        <li className="nav-item wr-tab">
            <a
                className={`nav-link onlyLink ${
                    router.pathname === to ? 'active' : ''
                } ${isExpand ? '' : 'single'}`}
                aria-current="page"
                href={to}
                onClick={handleClick}
                // aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
            >
                {label}
            </a>
            {isExpand && (
                <div className="wr-tab__icon">
                    <IconWrapper onClick={handleClose}>
                        <MdClose size={15} color="black" />
                    </IconWrapper>
                </div>
            )}
        </li>
    );
};
