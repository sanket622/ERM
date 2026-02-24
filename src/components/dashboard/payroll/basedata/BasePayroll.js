import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import HelpIcon from '@mui/icons-material/Help';
import AddPayrollDialog from './AddBasePayrollDialog';
import Tooltip from '@mui/material/Tooltip';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
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

const BasePayroll = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [fileUploadDialog, setFileUploadDialog] = useState(false);
    const [addPayrollOpen, setAddPayrollOpen] = useState(false);

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

    const days = [1, 2, 3, 4];

    return (
        <>
            <div className="p-6 max-w-full">
                <h1 className="text-[24px] font-semibold mb-4">Base Payroll</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-4 flex justify-between items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4B5563]"
                            />
                        </div>
                        <div className='mb-4'>
                            <IconButton sx={{ mr: 3 }}> <HelpIcon fontSize='large' sx={{ color: '#CDCDCD' }} /> </IconButton>
                            <Button onClick={handleOpenFileDialog} startIcon={<AddCircleOutlineOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#F3F4F6', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', marginRight: 4, '&:hover': { background: '#F3F4F6' } }}>Upload Excel</Button>
                            <Button onClick={() => setAddPayrollOpen(true)} startIcon={<AddCircleOutlineOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#4B5563', color: 'white', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', marginRight: 4, '&:hover': { background: '#4B5563' } }}>Add Payroll</Button>
                            {/* <Button onClick={handleOpenFilterDialog} startIcon={<TuneOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#fff', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#fff' } }}>Filter</Button> */}
                        </div>
                    </div>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' } }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sno.</TableCell>
                                    <TableCell>Employee ID</TableCell>
                                    <TableCell>Employee Name</TableCell>
                                    {days.map(day => (
                                        <TableCell key={day} colSpan={2} align="center">
                                            DAY {day}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    {days.map(day => (
                                        <>
                                            <TableCell key={`status-${day}`} className="!border-r border-gray-300 text-sm font-medium">Status</TableCell>
                                            <TableCell key={`income-${day}`} className="text-sm font-medium">Daily Income</TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {Array(10)
                                    .fill()
                                    .map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>01</TableCell>
                                            <TableCell>AA372</TableCell>
                                            <TableCell>Rishab Thakur</TableCell>
                                            {days.map(day => {
                                                const isAbsent = day === 2;
                                                return (
                                                    <>
                                                        <TableCell key={`status-val-${day}-${idx}`} className="!border-r border-gray-300"><span className={`text-white text-xs font-medium px-2 py-1 rounded-full ${isAbsent ? 'bg-red-400' : 'bg-green-500'}`}>{isAbsent ? 'Absent' : 'Present'}</span></TableCell>
                                                        <TableCell key={`income-val-${day}-${idx}`}>{isAbsent ? '₹0' : '₹1000'}</TableCell>
                                                    </>
                                                );
                                            })}
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
                        <div className="text-sm text-gray-500"> Showing 1 to 10 out of 60 records</div>
                        <div className="flex items-center space-x-2">
                            <Pagination count={15} page={page + 1} onChange={(e, v) => handleChangePage(v - 1)} size="small" shape="rounded" variant="outlined"
                                renderItem={(item) => (
                                    <PaginationItem components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }} {...item} sx={{ minWidth: 32, height: 32, borderRadius: '8px', fontSize: '0.75rem', px: 0, color: item.selected ? '#4B5563' : 'black', borderColor: item.selected ? '#4B5563' : 'transparent', '&:hover': { borderColor: '#4B5563', backgroundColor: 'transparent' }, fontWeight: item.selected ? 600 : 400 }} />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FileUploadModal open={fileUploadDialog} onClose={handleCloseFileDialog} />
            <AddPayrollDialog open={addPayrollOpen} onClose={() => setAddPayrollOpen(false)} />

        </>

    );
};

export default BasePayroll;