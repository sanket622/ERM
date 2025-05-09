import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';

// Define SVG icons as React components
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// const EditIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//   </svg>
// );

// const DeleteIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M3 6h18"></path>
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
//     <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//   </svg>
// );

const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
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

const AlertCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
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

const UserManagement = () => {
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // For confirmation modals
    const [deleteModal, setDeleteModal] = useState(false);
    const [deactivateModal, setDeactivateModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModal(true);
    };

    const openDeactivateModal = (user) => {
        setSelectedUser(user);
        setDeactivateModal(true);
    };
    const openActivateModal = (user) => {
        setSelectedUser(user);
        setActivateModal(true);
    };

    const handleDelete = () => {
        // Logic to delete user would go here
        setDeleteModal(false);
        setSuccessMessage('User has been deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleDeactivate = () => {
        // Logic to deactivate user would go here
        setDeactivateModal(false);
        setSuccessMessage('User has been deactivated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleActivate = () => {
        // Logic to activate user would go here
        setActivateModal(false);
        setSuccessMessage('User has been activated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div className="p-6 max-w-full">
            <style>{styles}</style>
            <h1 className="text-[24px] font-semibold mb-4">User Management</h1>

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

                    <Button  onClick={() => navigate('/addaccess')} startIcon={<AddCircleOutlineOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#0000FF', color: 'white', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#0000FF' } }}>Add Access</Button>

                </div>

                <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#0000FF', borderRadius: '4px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' } }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['Sno.', 'Name', 'Role Type', 'Email', 'Phone Number', 'Role Access', 'Timestamps','Status', 'View'].map(header => (
                                    <TableCell key={header} sx={{ fontSize: '14px',  color: '#7E7E7E',  }}>
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
                                            <IconButton style={{ color: 'green', padding: '6px' }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => openDeleteModal(user)} style={{ color: 'red', padding: '6px'}}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <button onClick={() => openActivateModal(user)} style={{ background: '#22C900', color: 'white', padding: '4px 8px', fontSize: '12px', borderRadius: '4px' }}>
                                                Activate
                                            </button>
                                            <button onClick={() => openDeactivateModal(user)} style={{ background: '#5577FD', color: 'white', padding: '4px 8px', fontSize: '12px', borderRadius: '4px' }}>
                                                Deactivate
                                            </button>
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

            {/* Success Message Toast */}
            {successMessage && (
                <div className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center space-x-3 animate-fade-in-up">
                    <CheckCircleIcon />
                    <p>{successMessage}</p>
                    <button
                        onClick={() => setSuccessMessage('')}
                        className="ml-4 text-green-700 hover:text-green-900"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden animate-scale-in">
                        <div className="p-4 bg-red-50 flex items-start space-x-3">
                            <div className="text-red-500 flex-shrink-0 mt-0.5">
                                <AlertCircleIcon />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg text-red-800">Confirm Delete</h3>
                                <p className="text-red-600 mt-1">Are you sure you want to delete this user? This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between bg-gray-50">
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">{selectedUser?.name}</p>
                                <p>{selectedUser?.email}</p>
                            </div>
                        </div>

                        <div className="p-4 flex space-x-3 justify-end bg-white">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none   "
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none  "
                                onClick={handleDelete}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deactivate Confirmation Modal */}
            {activateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden animate-scale-in">
                        <div className="p-4 bg-green-50 flex items-start space-x-3">
                            <div className="text-green-500 flex-shrink-0 mt-0.5">
                                <AlertCircleIcon />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg text-green-700">Confirm Activation</h3>
                                <p className="text-green-600 mt-1">Are you sure you want to Activate this user? They will access to the system.</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between bg-gray-50">
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">{selectedUser?.name}</p>
                                <p>{selectedUser?.email}</p>
                                <p className="mt-1 text-xs text-gray-500">Role: {selectedUser?.roleAccess}</p>
                            </div>
                        </div>

                        <div className="p-4 flex space-x-3 justify-end bg-white">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none "
                                onClick={() => setActivateModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none "
                                onClick={() => setActivateModal(false)}
                            >
                                Activate User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deactivateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden animate-scale-in">
                        <div className="p-4 bg-blue-50 flex items-start space-x-3">
                            <div className="text-blue-500 flex-shrink-0 mt-0.5">
                                <AlertCircleIcon />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg text-blue-800">Confirm Deactivation</h3>
                                <p className="text-blue-600 mt-1">Are you sure you want to deactivate this user? They will lose access to the system.</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between bg-gray-50">
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">{selectedUser?.name}</p>
                                <p>{selectedUser?.email}</p>
                                <p className="mt-1 text-xs text-gray-500">Role: {selectedUser?.roleAccess}</p>
                            </div>
                        </div>

                        <div className="p-4 flex space-x-3 justify-end bg-white">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none "
                                onClick={() => setDeactivateModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none "
                                onClick={handleDeactivate}
                            >
                                Deactivate User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;