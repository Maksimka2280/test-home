import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import s from './container.module.scss';

type Props = {
  className?: string;
};

export const Container: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx(className, s.container)}>{children}</div>;
};
