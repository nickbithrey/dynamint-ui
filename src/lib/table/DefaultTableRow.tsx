import * as React from 'react';
import { DetailsRow, IDetailsRowProps } from 'office-ui-fabric-react/lib/DetailsList';

export type IDefaultTableRow = IDetailsRowProps;

export const DefaultTableRow = (props: IDefaultTableRow) => <DetailsRow {...props} />;