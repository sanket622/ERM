import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import FileUploadModal from './FileUploadModal';
import AddPayrollDialog from './AddPayrollDialog';
import { enqueueSnackbar } from 'notistack';


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


const CurrentPayroll = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userData, setUserData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fileUploadDialog, setFileUploadDialog] = useState(false);
    const [addPayrollOpen, setAddPayrollOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [search, setSearch] = useState('');


    const token = localStorage.getItem('accessToken');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.earnplus.net/api/v1/employee/payroll/getCurrentPayrolls', {
                params: { page: page + 1, limit: rowsPerPage, search: search.trim() || undefined, },
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response?.data?.success) {
                const apiData = response.data.data;
                const rows = apiData.data.map((emp) => {
                    const payroll = emp.EmployeeCurrentPayroll?.[0] || {};
                    return {
                        id: emp.id,
                        employeeId: emp.employeeId,
                        customEmployeeId: emp.customEmployeeId,
                        employeeName: emp.employeeName,
                        email: emp.email,
                        phoneNumber: emp.mobile,
                        income: payroll.income || '',
                        payrollDate: payroll.date || '',
                    };
                });

                setUserData(rows);
                setTotalCount(apiData.total);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, rowsPerPage, search]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleOpenFileDialog = () => {
        setFileUploadDialog(true);
    };

    const handleCloseFileDialog = () => {
        setFileUploadDialog(false);
    };

    // Open AddPayrollDialog with prefilled data for that employee
    const handleOpenPayrollDialog = (employee) => {
        setSelectedEmployee(employee);
        setAddPayrollOpen(true);
    };

    const handlePayrollSubmit = async () => {
        if (!selectedEmployee?.customEmployeeId || !selectedEmployee?.income || !selectedEmployee?.date) {
            enqueueSnackbar('Please fill out all required fields.', { variant: 'warning' });
            return;
        }

        const payload = {
            customEmployeeId: selectedEmployee.customEmployeeId,
            income: Number(selectedEmployee.income),
            date: new Date(selectedEmployee.date).toISOString(),
        };

        try {
            await axios.post(
                'https://api.earnplus.net/api/v1/employee/payroll/createEmployeeCurrentPayroll',
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            enqueueSnackbar('Payroll added successfully!', { variant: 'success' });

            setAddPayrollOpen(false);
            fetchUsers();
        } catch (error) {
            console.error('Error submitting payroll:', error);
            enqueueSnackbar('Failed to submit payroll. Please try again.', { variant: 'error' });
        }
    };


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, page, rowsPerPage]);


    return (
        <>
            <div className="p-6 max-w-full">
                <h1 className="text-[24px] font-semibold mb-4">Current Payroll</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-4 flex justify-between items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, ID, etc."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(0); // Reset to first page on new search
                                }}
                                className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                            />

                        </div>
                        <div className="mb-4 flex items-center space-x-2">
                            <IconButton sx={{ mr: 3 }}>
                                <HelpIcon fontSize="large" sx={{ color: '#CDCDCD' }} />
                            </IconButton>
                            <Button
                                onClick={handleOpenFileDialog}
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                variant="contained"
                                sx={{
                                    background: '#BDF4FA',
                                    color: 'black',
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': { background: '#BDF4FA' },
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
                            '&::-webkit-scrollbar-thumb': { backgroundColor: '#0000FF', borderRadius: '4px' },
                            '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' },
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {[
                                        'Sno.',
                                        'Employee ID',        // 🔹 New
                                        'Custom Emp ID',      // 🔹 New
                                        'Name',
                                        'Email',
                                        'Phone Number',
                                        'Income',
                                        'Payroll Date',
                                        'Actions',
                                    ].map((header) => (
                                        <TableCell key={header} sx={{ fontSize: '14px', color: '#7E7E7E' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {userData.map((user, index) => (
                                    <TableRow key={user.id || index}>
                                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                        <TableCell>{user.employeeId}</TableCell> {/* 🔹 New */}
                                        <TableCell>{user.customEmployeeId}</TableCell> {/* 🔹 New */}
                                        <TableCell>
                                            <div className="flex items-center space-x-1">
                                                <Tooltip
                                                    title="There seems to be an issue with the details provided—please contact Customer Associate for help."
                                                    arrow
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                backgroundColor: '#FF7C7C',
                                                                color: 'white',
                                                                fontSize: '14px',
                                                                '& .MuiTooltip-arrow': { color: '#FF7C7C' },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <IconButton size="small" sx={{ p: 0.5 }}>
                                                        <ReportOutlinedIcon sx={{ fontSize: 20, color: '#FF0000' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <span>{user.employeeName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>{user.income}</TableCell>
                                        <TableCell>{user.payrollDate ? new Date(user.payrollDate).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    background: '#0000FF',
                                                    color: 'white',
                                                    px: 2,
                                                    borderRadius: 2,
                                                    fontSize: '16px',
                                                    fontWeight: 500,
                                                    textTransform: 'none',
                                                    '&:hover': { background: '#0000FF' },
                                                }}
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleOpenPayrollDialog(user)}
                                            >
                                                Add Payroll
                                            </Button>
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
                                            color: item.selected ? '#0000FF' : 'black',
                                            borderColor: item.selected ? '#0000FF' : 'transparent',
                                            '&:hover': { borderColor: '#0000FF', backgroundColor: 'transparent' },
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

            {/* Pass selectedEmployee to AddPayrollDialog to prefill */}
            <AddPayrollDialog
                open={addPayrollOpen}
                onClose={() => setAddPayrollOpen(false)}
                formData={selectedEmployee || {}}
                onChange={(field) => (e) =>
                    setSelectedEmployee((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                    }))
                }
                onSubmit={handlePayrollSubmit}
            />

        </>
    );
};

export default CurrentPayroll;
