import React, { useState, useEffect } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import AddPayrollDialog from './AddHistoricalPayrollDialog';
import Tooltip from '@mui/material/Tooltip';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPayrollData, createPayrollEntry } from '../../../../redux/historicalpayroll/payrollSlice';

import FileUploadModal from './FileUploadModal';

// SVG Icons same as before...

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

const HistoricalPayroll = () => {
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [fileUploadDialog, setFileUploadDialog] = useState(false);
    const [addPayrollOpen, setAddPayrollOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {
        data: payrollData,
        total: totalCount = 0,
        page: reduxPage = 0,
        limit: rowsPerPage = 10
    } = useSelector(state => state.payroll);

    const [page, setPage] = useState(reduxPage);

    // Debounce search with 500ms delay
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(fetchPayrollData({ page, limit: rowsPerPage, search: search.trim() || undefined }));
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [dispatch, page, rowsPerPage, search]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleOpenFileDialog = () => setFileUploadDialog(true);
    const handleCloseFileDialog = () => setFileUploadDialog(false);

    return (
        <>
            <div className="p-6 max-w-full">
                <h1 className="text-[24px] font-semibold mb-4">Historical Payroll</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-4 flex justify-between items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(0); // Reset to first page when search changes
                                }}
                                className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4B5563]"
                            />
                        </div>
                        <div className='mb-4'>
                            <IconButton sx={{ mr: 3 }}>
                                <HelpIcon fontSize='large' sx={{ color: '#CDCDCD' }} />
                            </IconButton>
                            <Button
                                onClick={handleOpenFileDialog}
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                type="submit"
                                variant="contained"
                                fullWidth={false}
                                sx={{
                                    background: '#F3F4F6',
                                    color: 'black',
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    marginRight: 4,
                                    '&:hover': { background: '#F3F4F6' }
                                }}
                            >
                                Upload Excel
                            </Button>
                        </div>
                    </div>

                    <TableContainer
                        component={Paper}
                        sx={{
                            overflowX: 'auto',
                            borderRadius: 2,
                            '&::-webkit-scrollbar': { height: '8px' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' },
                            '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' }
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['S.No.', 'Employee Name', 'Employee ID', 'Custom Employee ID', 'Email', 'Phone Number', 'Income', 'Start Date', 'End Date', 'Action'].map(header => (
                                        <TableCell key={header} sx={{ fontSize: '14px', color: '#7E7E7E' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payrollData.map((employee, index) => {
                                    const payroll = employee.EmployeeHistoricalPayroll?.[0] || {};
                                    return (
                                        <TableRow key={employee.id}>
                                            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell>{employee.employeeName}</TableCell>
                                            <TableCell>{employee.employeeId}</TableCell>
                                            <TableCell>{employee.customEmployeeId}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.mobile}</TableCell>
                                            <TableCell>{payroll.income || 'N/A'}</TableCell>
                                            <TableCell>{payroll.startDate ? new Date(payroll.startDate).toLocaleDateString() : 'N/A'}</TableCell>
                                            <TableCell>{payroll.endDate ? new Date(payroll.endDate).toLocaleDateString() : 'N/A'}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        setSelectedEmployee(employee);
                                                        setAddPayrollOpen(true);
                                                    }}
                                                >
                                                    Add Payroll
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="px-6 py-4 flex justify-between items-center bg-white">
                        <div className="flex items-center text-gray-500">
                            <span className="mr-2 text-sm">Showing</span>
                            <div className="border border-gray-300 rounded px-2 py-1 flex items-center">
                                <span className="text-sm">{rowsPerPage}</span>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500">
                            Showing {page * rowsPerPage + 1} to{' '}
                            {Math.min((page + 1) * rowsPerPage, totalCount)} out of {totalCount} records
                        </div>

                        <div className="flex items-center space-x-2">
                            <Pagination
                                count={Math.ceil(totalCount / rowsPerPage)}
                                page={page + 1}
                                onChange={(e, v) => handleChangePage(v - 1)}
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
                                            color: item.selected ? '#4B5563' : 'black',
                                            borderColor: item.selected ? '#4B5563' : 'transparent',
                                            '&:hover': { borderColor: '#4B5563', backgroundColor: 'transparent' },
                                            fontWeight: item.selected ? 600 : 400,
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <FileUploadModal open={fileUploadDialog} onClose={handleCloseFileDialog} />
            <AddPayrollDialog
                open={addPayrollOpen}
                onClose={() => {
                    setAddPayrollOpen(false);
                    setSelectedEmployee(null);
                }}
                onSuccess={() => {
                    setAddPayrollOpen(false);
                    setSelectedEmployee(null);
                    dispatch(fetchPayrollData({ page, limit: rowsPerPage, search: search.trim() || undefined }));
                }}
                prefillData={{ customEmployeeId: selectedEmployee?.customEmployeeId }}
            />
        </>
    );
};

export default HistoricalPayroll;
