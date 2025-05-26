import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem } from '@mui/material';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import FilterDialog from './FilterDialog';
import FileUploadModal from './FileUploadModal';

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const ChevronLeftIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const Employees = () => {
    const [page, setPage] = useState(1); // start at 1 to match API
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [fileUploadDialog, setFileUploadDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(
                '/api/v1/employer/auth/getEmployeesByEmployer',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        limit: rowsPerPage,
                        search,
                    },
                }
            );

            if (response?.data?.success) {
                const apiData = response.data.data;
                setEmployees(apiData.data || []);
                setTotalCount(apiData.total || 0);
            } else {
                setError('Failed to fetch employees');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [page, rowsPerPage, search]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on search change
    };

    const handleOpenFilterDialog = () => setFilterDialogOpen(true);
    const handleCloseFilterDialog = () => setFilterDialogOpen(false);
    const handleOpenFileDialog = () => setFileUploadDialog(true);
    const handleCloseFileDialog = () => setFileUploadDialog(false);

    const totalPages = Math.ceil(totalCount / rowsPerPage);

    return (
        <>
            <div className="p-6 max-w-full">
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
                                value={search}
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                            />
                        </div>
                        <div className="mb-4 flex gap-4">
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
                            <Button
                                onClick={() => navigate('/addemployees')}
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                variant="contained"
                                sx={{
                                    background: '#0000FF',
                                    color: 'white',
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': { background: '#0000FF' },
                                }}
                            >
                                Add New Employee
                            </Button>
                            <Button
                                onClick={handleOpenFilterDialog}
                                startIcon={<TuneOutlinedIcon />}
                                variant="contained"
                                sx={{
                                    background: '#fff',
                                    color: 'black',
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': { background: '#fff' },
                                }}
                            >
                                Filter
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
                                        'Name',
                                        'Employee ID',
                                        'Email',
                                        'Phone Number',
                                        'Department',
                                        'Job Title',
                                        'Date Joined',
                                        'View',
                                    ].map((header) => (
                                        <TableCell key={header} sx={{ fontSize: '14px', color: '#7E7E7E' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" sx={{ color: 'red' }}>
                                            {error}
                                        </TableCell>
                                    </TableRow>
                                ) : employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            No employees found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((emp, index) => (
                                        <TableRow key={emp.id}>
                                            <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{emp.employeeName}</TableCell>
                                            <TableCell>{emp.employeeId}</TableCell>
                                            <TableCell>{emp.email}</TableCell>
                                            <TableCell>{emp.mobile}</TableCell>
                                            <TableCell>{emp.EmploymentDetails?.department || '-'}</TableCell>
                                            <TableCell>{emp.EmploymentDetails?.jobTitle || '-'}</TableCell>
                                            <TableCell>
                                                {emp.EmploymentDetails?.dateJoined
                                                    ? new Date(emp.EmploymentDetails.dateJoined).toLocaleDateString()
                                                    : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    style={{ color: '#5577FD', padding: '6px' }}
                                                    onClick={() => navigate(`/employees/${emp.id}`)}
                                                >
                                                    <VisibilityOutlinedIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="px-6 py-4 flex justify-between items-center bg-white">
                        <div className="flex items-center text-gray-500">
                            <span className="mr-2 text-sm">Rows per page:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    setPage(1); // Reset page on rows per page change
                                }}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                {[5, 10, 25, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-sm text-gray-500">
                            Showing {(page - 1) * rowsPerPage + 1} to{' '}
                            {Math.min(page * rowsPerPage, totalCount)} out of {totalCount} records
                        </div>
                        <div className="flex items-center space-x-2">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handleChangePage}
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

            <FilterDialog open={filterDialogOpen} onClose={handleCloseFilterDialog} />
            <FileUploadModal open={fileUploadDialog} onClose={handleCloseFileDialog} />
        </>
    );
};

export default Employees;
