import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, IconButton, Pagination, PaginationItem } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import DeleteModal from './DeleteModal';
import DeactivateModal from './DeactivateModal';
import ActivateModal from './ActivateModal';
import { useEffect } from 'react';
import axios from 'axios';
import EditUserDialog from './EditUserDialog';
import { useSnackbar } from 'notistack';



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

export const AlertCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

export const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);


const UserManagement = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [page, setPage] = useState(1); // API uses 1-based indexing
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deactivateModal, setDeactivateModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();


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

    const fetchUsers = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            setLoading(true);
            const response = await axios.get('https://api.earnplus.net/api/v1/employer/employerSubAdmin/getEmployerSubAdminsByEmployer',
                { params: { page, limit, search }, headers: { Authorization: `Bearer ${token}` } }
            );

            if (response?.data?.success) {
                const apiData = response?.data?.data;
                setUserData(apiData?.data);
                setTotalCount(apiData?.totalCount);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, limit, search]);

    const updateUserStatus = async (userId, isActive) => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.patch(
                `https://api.earnplus.net/api/v1/employer/employerSubAdmin/updateEmployerSubAdminActiveStatus/${userId}`,
                { isActive },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchUsers();
            enqueueSnackbar(`User has been ${isActive ? 'activated' : 'deactivated'} successfully`, {
                variant: 'success',
            });
        } catch (err) {
            console.error('Status update failed:', err);
            enqueueSnackbar('Failed to update user status', { variant: 'error' });
        }
    };


    const handleEditSubmit = async (userId, data) => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.put(
                `https://api.earnplus.net/api/v1/employer/employerSubAdmin/updateEmployerSubAdmin/${userId}`,
                { ...data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchUsers();
            enqueueSnackbar('User updated successfully', { variant: 'success' });
        } catch (err) {
            console.error('Edit failed:', err);
            enqueueSnackbar('Failed to update user', { variant: 'error' });
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.delete(
                `https://api.earnplus.net/api/v1/employer/employerSubAdmin/deleteSubAdminByEmployer/${selectedUser.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setDeleteModal(false);
            enqueueSnackbar('User has been deleted successfully', { variant: 'success' });
            fetchUsers();
        } catch (error) {
            console.error('Delete failed:', error);
            enqueueSnackbar('Failed to delete user', { variant: 'error' });
        }
    };


    return (
        <div className="p-6 max-w-full">
            <h1 className="text-[24px] font-semibold mb-4">User Management</h1>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="p-4 flex justify-between items-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <SearchIcon />
                        </div>
                        <input type="text" placeholder="Search" value={search} onChange={(e) => { setPage(1); setSearch(e.target.value); }} className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4B5563]" />
                    </div>
                    <Button onClick={() => navigate('/addaccess')} startIcon={<AddCircleOutlineOutlinedIcon />} type="submit" variant="contained" fullWidth={false} sx={{ background: '#4B5563', color: 'white', px: 4, py: 1, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#4B5563' } }}>Add Access</Button>
                </div>

                <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' } }} >
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
                                <TableRow key={user.id}>
                                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.role?.roleName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.mobile}</TableCell>
                                    <TableCell>{user.modules?.map(m => m.moduleName).join(', ')}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>

                                    <TableCell>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <IconButton
                                                style={{ color: 'green', padding: '6px' }}
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setEditDialogOpen(true);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton onClick={() => openDeleteModal(user)} style={{ color: 'red', padding: '6px' }}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <button
                                                onClick={() =>
                                                    user.isActive
                                                        ? openDeactivateModal(user)
                                                        : openActivateModal(user)
                                                }
                                                style={{
                                                    background: user.isActive ? '#6B7280' : '#22C900',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    fontSize: '12px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {user.isActive ? 'Deactivate' : 'Activate'}
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
                            <span className="text-sm">{limit}</span>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500">
                        {totalCount === 0 ? (
                            'No records found'
                        ) : (
                            <>
                                Showing {(page - 1) * limit + 1} to{' '}
                                {Math.min(page * limit, totalCount)} out of {totalCount} records
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Pagination count={Math.ceil(totalCount / limit)} page={page} onChange={(e, v) => setPage(v)} size="small" shape="rounded" variant="outlined"
                            renderItem={(item) => <PaginationItem components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }} {...item} sx={{ minWidth: 32, height: 32, borderRadius: '8px', fontSize: '0.75rem', px: 0, color: item.selected ? '#4B5563' : 'black', borderColor: item.selected ? '#4B5563' : 'transparent', '&:hover': { borderColor: '#4B5563', backgroundColor: 'transparent' }, fontWeight: item.selected ? 600 : 400 }} />} />
                    </div>
                </div>
            </div>

            {deleteModal && (
                <DeleteModal selectedUser={selectedUser} handleDelete={handleDelete} setDeleteModal={setDeleteModal} />
            )}
            {deactivateModal && (<DeactivateModal selectedUser={selectedUser} setDeactivateModal={setDeactivateModal} updateUserStatus={updateUserStatus} />
            )}

            {activateModal && (
                <ActivateModal selectedUser={selectedUser} setActivateModal={setActivateModal} updateUserStatus={updateUserStatus} />
            )}
            <EditUserDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                user={selectedUser}
                onSubmit={handleEditSubmit}
            />

        </div>
    );
};

export default UserManagement;