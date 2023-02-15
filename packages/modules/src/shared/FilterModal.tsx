import { DatePicker, Modal } from 'ui';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { AutoCompleteInput, Button, Typography } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { FILTERDATE } from '../constants';
import { useState } from 'react';
import { SelectField } from 'ui/src/SelectField';
import { getToday } from '../event/form/helper';

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ show, onClose }) => {
  const { t, i18n } = useTypeSafeTranslation();

  const filterDates = FILTERDATE.map((value, idx) => ({
    name: t(value),
    value: value as string,
    id: idx,
  }));
  const [selected, setSelected] = useState(filterDates[0]);

  const [searchData, setSearchData] = useState({
    startDate: '',
    endDate: '',
    sort: 'follower',
  });

  const isCustomDate = selected.id === filterDates?.at(-1)?.id;

  return (
    <Modal title="Filter" onClose={onClose} show={show}>
      <div>
        <div className="mt-6">
          <Typography variant="h6">Date</Typography>
          <AutoCompleteInput
            items={filterDates}
            selected={
              filterDates.find((v) => v.id === selected.id) || filterDates[0]
            }
            setSelected={(event) => {
              setSelected(event);
              return event;
            }}
            leftIcon={<CalendarDaysIcon />}
            leftIconClassName="text-primary"
          />
        </div>
        <div className="mt-2 flex space-x-2">
          {isCustomDate && (
            <>
              <DatePicker
                name="Start Date"
                label="Start Date"
                containerClassName="flex-1"
                className="w-full"
                type="date"
                value={getToday()}
              />
              <DatePicker
                name="Start Date"
                label="Start Date"
                containerClassName="flex-1"
                className="w-full"
                type="date"
                value={getToday()}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
