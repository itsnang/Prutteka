import { useState } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Button } from './Button';

interface Data {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  age: number;
  date_of_birth: string;
}

const defaultData = [
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Hum',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Humfrey',
    last_name: 'Pinfold',
    email: 'sklaiser1@constantcontact.com',
    gender: 'male',
    age: 22,
    date_of_birth: '06 June 2001',
  },
  {
    first_name: 'Felizio',
    last_name: 'Fenty',
    email: 'tschust1@google.com',
    gender: 'female',
    age: 23,
    date_of_birth: '14 May 1999',
  },
  {
    first_name: 'Shane',
    last_name: 'Kezor',
    email: 'oscranney2@icq.com',
    gender: 'male',
    age: 20,
    date_of_birth: '22 April 2003',
  },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor('last_name', {
    cell: (info) => info.getValue(),
    header: 'Last Name',
  }),
  columnHelper.accessor('first_name', {
    cell: (info) => info.getValue(),
    header: 'First Name',
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: 'Email',
  }),
  columnHelper.accessor('gender', {
    cell: (info) => info.getValue(),
    header: 'Gender',
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.getValue(),
    header: 'Age',
  }),
  columnHelper.accessor('date_of_birth', {
    cell: (info) => info.getValue(),
    header: 'Date Of Birth',
  }),
];

export const Table = () => {
  const [data, setData] = useState(defaultData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-y-auto rounded-xl border border-gray-200 text-left">
        <table className="w-full">
          <thead className="text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="whitespace-nowrap border-b border-gray-200 px-4 py-2 font-medium text-gray-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-none hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-4">
        <Button
          variant="secondary"
          className="px-4 disabled:bg-gray-200"
          disabled={table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Prev
        </Button>
        <div className="">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button
          variant="secondary"
          className="px-4 disabled:bg-gray-200"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
