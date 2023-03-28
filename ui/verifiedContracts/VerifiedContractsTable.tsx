import { Table, Tbody, Tr, Th, Link, Icon } from '@chakra-ui/react';
import React from 'react';

import type { VerifiedContract } from 'types/api/contracts';

import appConfig from 'configs/app/config';
import arrowIcon from 'icons/arrows/east.svg';
import { default as Thead } from 'ui/shared/TheadSticky';

import type { Sort, SortField } from './utils';
import VerifiedContractsTableItem from './VerifiedContractsTableItem';

interface Props {
  data: Array<VerifiedContract>;
  sort: Sort | undefined;
  onSortToggle: (field: SortField) => () => void;
}

const VerifiedContractsTable = ({ data, sort, onSortToggle }: Props) => {
  const sortIconTransform = sort?.includes('asc') ? 'rotate(-90deg)' : 'rotate(90deg)';

  return (
    <Table variant="simple" size="sm">
      <Thead top={ 80 }>
        <Tr>
          <Th width="50%">Contract</Th>
          <Th width="130px" isNumeric>
            <Link display="flex" alignItems="center" justifyContent="flex-end" onClick={ onSortToggle('balance') } columnGap={ 1 }>
              { sort?.includes('balance') && <Icon as={ arrowIcon } boxSize={ 4 } transform={ sortIconTransform }/> }
                Balance { appConfig.network.currency.symbol }
            </Link>
          </Th>
          <Th width="130px" isNumeric>
            <Link display="flex" alignItems="center" justifyContent="flex-end" onClick={ onSortToggle('txs') } columnGap={ 1 }>
              { sort?.includes('txs') && <Icon as={ arrowIcon } boxSize={ 4 } transform={ sortIconTransform }/> }
                Txs
            </Link>
          </Th>
          <Th width="50%">Compiler / version</Th>
          <Th width="80px">Settings</Th>
          <Th width="150px">Verified</Th>
          { /* <Th width="120px">Market cap</Th> */ }
        </Tr>
      </Thead>
      <Tbody>
        { data.map((item) => <VerifiedContractsTableItem key={ item.address.hash } data={ item }/>) }
      </Tbody>
    </Table>
  );
};

export default React.memo(VerifiedContractsTable);
