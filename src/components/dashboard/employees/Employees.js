import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import FilterDialog from './FilterDialog';
import FileUploadModal from './FileUploadModal';

// Define SVG icons as React components
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);


// Add these styles for animations to the component
const styles = `
  @keyframes scale-in {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes fade-in-up {
    0% { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  .animate-scale-in {
    animation: scale-in 0.2s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.3s ease-out forwards;
  }
`;

const Employees = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [fileUploadDialog, setFileUploadDialog] = useState(false);


    const navigate = useNavigate();
    const userData = Array(10).fill().map((_, index) => ({
        sno: '01',
        name: 'Abhiraj Shrivastava',
        roleType: 'Developer',
        email: 'abcd@gmail.com',
        phoneNumber: '9876543210',
        roleAccess: index === 2 ? 'Repayment' :
            index === 3 ? 'Payroll, Repayment' :
                index === 4 ? 'Employee Management' : 'Payroll Management',
        timestamp: '14/04/24 at 18:13',
        status: 'Activate'
    }));


    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleOpenFilterDialog = () => {
        setFilterDialogOpen(true);
    };

    const handleCloseFilterDialog = () => {
        setFilterDialogOpen(false);
    };  
    const handleOpenFileDialog = () => {
        setFileUploadDialog(true);
    };

    const handleCloseFileDialog = () => {
        setFileUploadDialog(false);
    };  

    return (
        <>
            <div className="p-6 max-w-full">
                <style>{styles}</style>
                <h1 className="text-[24px] font-semibold mb-4">Employees Management</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-4 flex justify-between items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                            />
                        </div>
                        <div className='mb-4'>
                            <Button onClick={handleOpenFileDialog} startIcon={<AddCircleOutlineOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#BDF4FA', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', marginRight: 4, '&:hover': { background: '#BDF4FA' } }}>Upload Excel</Button>
                            <Button
                            //  onClick={() => navigate('/addemployees')}
                             startIcon={<AddCircleOutlineOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#0000FF', color: 'white', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', marginRight: 4, '&:hover': { background: '#0000FF' } }}>Add New Employee</Button>
                            <Button onClick={handleOpenFilterDialog} startIcon={<TuneOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#fff', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#fff' } }}>Filter</Button>
                        </div>
                    </div>
                    
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#0000FF', borderRadius: '4px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' } }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['Sno.', 'Name', 'Role Type', 'Email', 'Phone Number', 'Role Access', 'Timestamps', 'Status', 'View'].map(header => (
                                        <TableCell key={header} sx={{ fontSize: '14px', color: '#7E7E7E', }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.sno}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.roleType}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>{user.roleAccess}</TableCell>
                                        <TableCell>{user.timestamp}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <IconButton style={{ color: '#5577FD', padding: '6px' }}>
                                                    <VisibilityOutlinedIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="px-6 py-4 flex justify-between items-center bg-white">
                        <div className="flex items-center text-gray-500">
                            <span className="mr-2 text-sm">Showing</span>
                            <div className="border border-gray-300 rounded px-2 py-1 flex items-center">
                                <span className="text-sm">10</span>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500">
                            Showing 1 to 10 out of 60 records
                        </div>

                        <div className="flex items-center space-x-2">
                            <Pagination
                                count={15}
                                page={page + 1}
                                onChange={(event, value) => handleChangePage(value - 1)}
                                size="small"
                                shape="rounded"
                                variant="outlined"
                                renderItem={(item) => (
                                    <PaginationItem
                                        components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
                                        {...item}
                                        sx={{
                                            minWidth: 32,
                                            height: 32,
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            px: 0,
                                            color: item.selected ? '#0000FF' : 'black',
                                            borderColor: item.selected ? '#0000FF' : 'transparent',
                                            '&:hover': {
                                                borderColor: '#0000FF',
                                                backgroundColor: 'transparent',
                                            },
                                            fontWeight: item.selected ? 600 : 400,
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <FilterDialog open={filterDialogOpen} onClose={handleCloseFilterDialog} />
            <FileUploadModal open={fileUploadDialog} onClose={handleCloseFileDialog}  />
        </>

    );
};

export default Employees;