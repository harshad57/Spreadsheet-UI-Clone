import React from 'react';
import { useTable } from 'react-table';

const baseData = [
  {
    job: 'Launch social media campaign for product',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aisha Patel',
    url: 'www.aishapatel.com',
    assigned: 'Sophie Choudhury',
    priority: 'Medium',
    due: '20-11-2024',
    value: '6,200,000',
  },
  {
    job: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhanpro.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    due: '30-10-2024',
    value: '3,500,000',
  },
  {
    job: 'Finalize user testing feedback for app',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.dev',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    due: '10-12-2024',
    value: '4,750,000',
  },
  {
    job: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.dev',
    assigned: 'Tom Wright',
    priority: 'Low',
    due: '15-01-2025',
    value: '5,900,000',
  },
  {
    job: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.io',
    assigned: 'Kevin Smith',
    priority: 'Low',
    due: '30-01-2025',
    value: '2,800,000',
  },
];

// Add 16 empty rows
const emptyRows = Array.from({ length: 16 }, () => ({
  job: '',
  submitted: '',
  status: '',
  submitter: '',
  url: '',
  assigned: '',
  priority: '',
  due: '',
  value: '',
}));

const data = [...baseData, ...emptyRows];

// Status badge style
const getStatusStyle = (status) => {
  const base = 'text-xs font-medium px-2 py-1 rounded-full';
  switch (status) {
    case 'In-process':
      return `${base} bg-yellow-100 text-yellow-700`;
    case 'Need to start':
      return `${base} bg-blue-100 text-blue-700`;
    case 'Complete':
      return `${base} bg-green-100 text-green-700`;
    case 'Blocked':
      return `${base} bg-red-100 text-red-700`;
    default:
      return '';
  }
};

// Priority badge style
const getPriorityStyle = (priority) => {
  const base = 'text-xs px-2 py-1 rounded-full';
  switch (priority) {
    case 'High':
      return `${base} text-red-600 bg-red-100`;
    case 'Medium':
      return `${base} text-yellow-600 bg-yellow-100`;
    case 'Low':
      return `${base} text-blue-600 bg-blue-100`;
    default:
      return '';
  }
};

const columns = [
  {
    Header: '#',
    id: 'row',
    accessor: (_row, i) => i + 1,
    Cell: ({ row }) => <span className="text-gray-400">{row.index + 1}</span>,
  },
  { Header: 'Job Request', accessor: 'job' },
  { Header: 'Submitted', accessor: 'submitted' },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (value ? <span className={getStatusStyle(value)}>{value}</span> : null),
  },
  { Header: 'Submitter', accessor: 'submitter' },
  {
    Header: 'URL',
    accessor: 'url',
    Cell: ({ value }) =>
      value ? (
        <a
          href={`https://${value}`}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) : null,
  },
  { Header: 'Assigned', accessor: 'assigned' },
  {
    Header: 'Priority',
    accessor: 'priority',
    Cell: ({ value }) => (value ? <span className={getPriorityStyle(value)}>{value}</span> : null),
  },
  { Header: 'Due Date', accessor: 'due' },
  { Header: 'Est. Value', accessor: 'value' },
];

export default function App() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-black">📁 Folder 2 ▸ Spreadsheet 3</h2>
          <button className="bg-gray-100 text-xs px-3 py-1 rounded hover:bg-gray-200">Toolbar</button>
          <span className="text-gray-300">|</span>
          {['Hide fields', 'Sort', 'Filter', 'Cell view'].map((btn) => (
            <button key={btn} className="hover:underline text-xs text-gray-600">
              {btn}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          {['Import', 'Export', 'Share'].map((btn) => (
            <button key={btn} className="text-xs text-gray-600 hover:underline">
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Tab */}
      <div className="inline-block px-4 py-2 border rounded-t-md text-sm font-semibold text-blue-700 bg-blue-50 mb-1">
        🔄 Q3 Financial Overview
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table {...getTableProps()} className="min-w-full text-sm text-gray-800 bg-white">
          <thead className="bg-gray-50 sticky top-0 shadow-sm z-10">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-600"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-4 py-3 max-w-xs truncate">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
