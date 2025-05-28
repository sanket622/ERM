import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button, IconButton, Pagination, PaginationItem,
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper
} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

// Icons
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const Activelog = () => {
    const [page, setPage] = useState(0); // zero-based
    const [rowsPerPage] = useState(10);
    const [logs, setLogs] = useState([]);
    const [totalLogs, setTotalLogs] = useState(0);
    
    
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);

    useEffect(() => {
        const fetchLogs = async () => {
            const token = localStorage.getItem('accessToken');
    
            try {
                const response = await axios.get('https://api.earnplus.net/api/v1/employer/auth/getEmployerActivityLogs', {
                    params: { page: page + 1, limit: rowsPerPage },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLogs(response.data.data.data);
                setTotalLogs(response.data.data.total);
            } catch (error) {
                console.error('Failed to fetch activity logs:', error);
            }
        };
    
        fetchLogs();
    }, [page, rowsPerPage]);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1); // convert from 1-based UI to 0-based state
    };

    const handleOpenFilterDialog = () => {
        setFilterDialogOpen(true);
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                {/* Top Bar */}
                <div className="p-4 flex justify-between items-center">
                    {/* <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                        />
                    </div> */}
                    {/* <div className='mb-4'>
                        <Button onClick={handleOpenFilterDialog} startIcon={<TuneOutlinedIcon />} variant="contained" sx={{ background: '#fff', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#fff' } }}>
                            Filter
                        </Button>
                    </div> */}
                </div>

                {/* Table */}
                <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['Sno.','Name', 'Email', 'Action', 'Device IP', 'Timestamp'].map(header => (
                                    <TableCell key={header} sx={{ fontSize: '14px', color: '#7E7E7E' }}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log, index) => (
                                <TableRow key={index}>
                                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{log.employerSubAdmin?.name || 'N/A'}</TableCell>
                                    <TableCell>{log.employerSubAdmin?.email || 'N/A'}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.deviceIp}</TableCell>
                                    <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Footer */}
                <div className="px-6 py-4 flex justify-between items-center bg-white">
                    <div className="text-sm text-gray-500">
                        Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, totalLogs)} out of {totalLogs} records
                    </div>
                    <Pagination
                        count={Math.ceil(totalLogs / rowsPerPage)}
                        page={page + 1}
                        onChange={handleChangePage}
                        size="small"
                        shape="rounded"
                        variant="outlined"
                        renderItem={(item) => (
                            <PaginationItem
                                components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
                                {...item}
                                sx={{
                                    minWidth: 32, height: 32, borderRadius: '8px', fontSize: '0.75rem',
                                    color: item.selected ? '#0000FF' : 'black',
                                    borderColor: item.selected ? '#0000FF' : 'transparent',
                                    '&:hover': { borderColor: '#0000FF', backgroundColor: 'transparent' },
                                    fontWeight: item.selected ? 600 : 400
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Activelog;
