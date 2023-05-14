import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'text',
    width: 130,
  },
  {
    field: 'role',
    headerName: 'Role',
    type: 'text',
    width: 130,
  },
  {
    field: 'change role',
    headerName: 'Change Role',
    type: 'text',
    width: 130,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 130,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys'},
  { id: 6, lastName: 'Melisandre', firstName: null },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara'},
  { id: 8, lastName: 'Frances', firstName: 'Rossini' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey' },
];

export default function UserTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}