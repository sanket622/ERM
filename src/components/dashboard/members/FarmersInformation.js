import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    TableContainer, Paper, TablePagination,
    Button, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useApis, AddEmployeeByEmployerView } from '../../Api_url';
import { MaterialReactTable } from 'material-react-table';
import { Add } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { BulkEmployeeAdd } from '../../Api_url'
import img from '../../../assets/Group 100.png'
import AddEmployee from './AddEmployee';


const FarmersInformation = () => {
    const { postJson, getJson } = useApis()
    const [farmersData, setFarmersData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState();
    const [error, setError] = useState(null);
    const [selectedFarmers, setSelectedFarmers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [dialogError, setDialogError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null)

    const [formData, setFormData] = useState({
        farmerName: '',
        farmerMobile: '',
        loading: false,
        employeeId: '',
        email: '',
        designation: '',
        department: '',
        dob: '',
        dateJoined: '',
        employmentType: '',
        paymentCycle: '',
        address: '',
        gender: '',
        marital_status: ''

    });

    const [success, setSuccess] = useState(null)

    const navigate = useNavigate();


    const fetchEmployeeData = async (p) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            setError('No access token found.');
            return;
        }

        try {
            const response = await getJson('AddEmployeeByEmployerView', {
                page: p + 1,  // API uses 1-based pagination
                per_page: rowsPerPage,
            })

            const data = response?.data?.results?.data || [];
            const count = response?.data?.count || 0;


            setFarmersData(data);
            setTotalCount(count);  // Set total farmer count for pagination
        } catch (error) {
            console.error('Error fetching member data:', error);
            setError('Error fetching data.');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);  // Update page when the user changes the page
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));  // Update rows per page when changed
        setPage(0);  // Reset to the first page when rows per page changes
    };

    const downloadSampleExcel = () => {
        const sampleData = [
            ["employee_name", "employee_id", "email", "mobile", "dob", "department", "date_joined", "employment_type", "payment_cycle", "address"],
            ["John Doe", "EMP001", "john@example.com", "1234567890", "1990-05-12", "IT", "2022-01-15", "SALARIED", "1", "123 Main St"],
        ];
        const ws = XLSX.utils.aoa_to_sheet(sampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Members');
        XLSX.writeFile(wb, 'sample_member.xlsx');
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'No File Selected',
                text: 'Please select a file to upload.',
                confirmButtonText: 'OK',
                didOpen: () => {
                    const swalElement = document.querySelector('.swal2-container');
                    if (swalElement) {
                        swalElement.style.zIndex = 1500;
                    }
                }
            });
            return;
        }

        const formData = new FormData();
        formData?.append('file', file);

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                BulkEmployeeAdd,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response?.status === 200) {
                if (response?.data?.errors_count > 0) {
                    let errorMessages = [];
                    if (Array.isArray(response?.data?.errors)) {
                        errorMessages = response?.data?.errors;
                    } else if (typeof response?.data?.errors === 'object') {
                        errorMessages = [JSON.stringify(response?.data?.errors)];
                    } else {
                        errorMessages = ['An unknown error occurred.'];
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'File Upload Failed',
                        html: errorMessages.map((error, index) => `<div key=${index} class="text-red-500">${error}</div>`).join(''),
                        didOpen: () => {
                            const swalElement = document.querySelector('.swal2-container');
                            if (swalElement) {
                                swalElement.style.zIndex = 1500;
                            }
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'File Uploaded Successfully',
                        text: 'Your file has been uploaded successfully.',
                        didOpen: () => {
                            const swalElement = document.querySelector('.swal2-container');
                            if (swalElement) {
                                swalElement.style.zIndex = 1500;
                            }
                        }
                    }).then(() => {
                        setOpenModal(false);
                    });
                }
            } else {
                setError('Something went wrong, please try again later.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Only excel file is supported, please upload excel file.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeeData(page);
    }, [page, rowsPerPage]);

    const handleSelectFarmer = (farmerId) => {
        setSelectedFarmers(prevState => {
            if (prevState.includes(farmerId)) {
                return prevState?.filter(id => id !== farmerId);  // Unselect farmer
            } else {
                return [...prevState, farmerId];  // Select farmer
            }
        });
    };


    const handleBulkDelete = async () => {
        if (selectedFarmers?.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'No Members selected for deletion.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            Swal.fire({
                title: 'Error!',
                text: 'No access token found.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const response = await axios.delete(AddEmployeeByEmployerView, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: {
                    farmer_id: selectedFarmers,  // Send selected farmer IDs for deletion
                },
            });

            if (response?.data?.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message || 'Members deleted successfully!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                fetchEmployeeData(page); // Refetch data after successful deletion
                setSelectedFarmers([]);  // Clear the selected farmers list
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.data.message || 'Failed to delete member.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An error occurred during deletion.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleSubmit = async () => {
        // Check if all fields are filled
        // if (!formData.farmerName || !formData.farmerMobile || !formData.employeeId || !formData.email || 
        //     !formData.designation || !formData.department || !formData.dob || !formData.dateJoined || 
        //     !formData.employmentType || !formData.paymentCycle || !formData.address) {
        //     setDialogError('Please fill in all fields.');
        //     return;
        // }

        // // Validate mobile number
        // const phonePattern = /^[0-9]{10}$/;
        // if (!phonePattern.test(formData.farmerMobile)) {
        //     setDialogError('Please enter a valid mobile number.');
        //     return;
        // }

        try {
            const response = await postJson('AddEmployeeByEmployerView', {
                employee_name: formData.farmerName,
                employee_id: formData.employeeId,
                email: formData.email,
                mobile: formData.farmerMobile,
                designation: formData.designation,
                dob: formData.dob,
                department: formData.department,
                date_joined: formData.dateJoined,
                employment_type: formData.employmentType,
                payment_cycle: formData.paymentCycle,
                address: formData.address,
                gender: formData.gender,
                marital_status: formData.marital_status
            });

            if (response?.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee added successfully!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    didOpen: () => {
                        const swalElement = document.querySelector('.swal2-container');
                        if (swalElement) {
                            swalElement.style.zIndex = 1500;
                        }
                    }
                });

                // You can optionally add the employee to the employeesData list
                // const newEmployee = {
                //     id: response?.results?.employee_id,
                //     name: formData.farmerName,
                //     mobile: formData.farmerMobile,
                //     email: formData.email,
                //     designation: formData.designation,
                //     department: formData.department,
                //     dob: formData.dob,
                //     date_joined: formData.dateJoined,
                //     employment_type: formData.employmentType,
                //     payment_cycle: formData.paymentCycle,
                //     address: formData.address
                // };
                // setEmployeesData(prevEmployeesData => [newEmployee, ...prevEmployeesData]);

                setOpenDialog(false);
                // fetchEmployeesData(page); // Optionally, you can refetch employees data
            } else {
                setOpenDialog(false);
                Swal.fire({
                    title: 'Error!',
                    text: response.data.message || 'Failed to add employee.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        const swalElement = document.querySelector('.swal2-container');
                        if (swalElement) {
                            swalElement.style.zIndex = 1500;
                        }
                    }
                });
            }
        } catch (error) {
            console.log(error);

            if (error?.response?.data?.message === "Mobile number already exists") {
                setDialogError("Mobile number already exists");
            }
        }
    };

    const columns = [
        {
            header: 'Select',
            id: 'select',
            Cell: ({ row }) => (
                <Checkbox
                    checked={selectedFarmers.includes(row.original.id)}
                    onChange={() => handleSelectFarmer(row.original.id)}
                />
            ),
            size: 50,
        },
        {
            header: 'S.No',
            id: 'serial',
            accessorKey: 'id',
            Cell: ({ row }) => row.index + 1,
            size: 50,
        },
        {
            header: 'Name',
            id: 'employee_name',
            accessorKey: 'employee_name',
            size: 150,
        },
        {
            header: 'Employee ID',
            id: 'employee_id',
            accessorKey: 'employee_id',
            size: 100,
        },
        {
            header: 'Email',
            id: 'email',
            accessorKey: 'email',
            size: 200,
        },
        {
            header: 'Mobile',
            id: 'mobile',
            accessorKey: 'mobile',
            size: 150,
        },
        {
            header: 'Designation',
            id: 'designation',
            accessorKey: 'designation',
            size: 150,
        },
        {
            header: 'DOB',
            id: 'dob',
            accessorKey: 'dob',
            size: 150,
        },
        {
            header: 'Department',
            id: 'department',
            accessorKey: 'department',
            size: 150,
        },
        {
            header: 'Date Joined',
            id: 'date_joined',
            accessorKey: 'date_joined',
            size: 150,
        },
        {
            header: 'Employment Type',
            id: 'employment_type',
            accessorKey: 'employment_type',
            size: 150,
        },
        {
            header: 'Payment Cycle',
            id: 'payment_cycle',
            accessorKey: 'payment_cycle',
            size: 150,
        },
        {
            header: 'Address',
            id: 'address',
            accessorKey: 'address',
            size: 200,
        },
        {
            header: 'Gender',
            id: 'gender',
            accessorKey: 'gender',
            
        },
        {
            header: 'Marital status',
            id: 'marital_status',
            accessorKey: 'marital_status',
            
        },
        // {
        //     header: 'Action',
        //     id: 'action',
        //     Cell: ({ row }) => (
        //         <IconButton onClick={() => handleRowClick(row.original.id)}>
        //             <RemoveRedEye />
        //         </IconButton>
        //     ),
        //     size: 50,
        // },
    ];


    return (

        <>
            <div className="p-6">
                {error && <Typography color="error">{error}</Typography>}

                {farmersData.length !== 0 ? (
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Button
                            variant="contained"
                            onClick={() => setOpenDialog(true)}
                            startIcon={<Add />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                paddingX: 4,
                                color: 'white',
                                width: 'fit-content',
                                alignSelf: 'center',
                            }}
                        >
                            Add Employee
                        </Button>

                        <Button
                            variant="contained"
                            color='secondary'
                            onClick={() => setOpenModal(true)}
                            startIcon={<Add />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                paddingX: 4,
                                color: 'white',
                                width: 'fit-content',
                                alignSelf: 'center',
                            }}
                        >
                            Upload Excel
                        </Button>

                        <IconButton
                            onClick={handleBulkDelete}
                            disabled={selectedFarmers.length === 0}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: 'red', // Red background
                                color: 'white', // White color for the icon
                                '&:hover': {
                                    backgroundColor: 'red', // Darker red on hover
                                },
                                '&:disabled': {
                                    backgroundColor: '#d3d3d3',
                                    color: '#a9a9a9',
                                },
                            }}
                        >
                            <Delete />
                        </IconButton>

                    </div>
                ) : null}

                {farmersData.length === 0 ?
                    <div className="flex flex-col items-center mt-28">
                        {/* Image when no data is available */}
                        <img src={img} alt="No data" className="mb-4" />

                        {/* Buttons below the image */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <Button
                                variant="contained"
                                onClick={() => setOpenDialog(true)}
                                startIcon={<Add />}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 2,

                                    paddingX: 4,
                                    color: 'white',
                                    width: 'fit-content',
                                    alignSelf: 'center',
                                    mt: 10
                                }}
                            >
                                Add Employee
                            </Button>

                            <Button
                                variant="contained"
                                color='secondary'
                                onClick={() => setOpenModal(true)}
                                startIcon={<Add />}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 2,

                                    paddingX: 4,
                                    color: 'white',
                                    width: 'fit-content',
                                    alignSelf: 'center',
                                    mt: 10

                                }}
                            >
                                Upload Excel
                            </Button>
                        </div>
                    </div> :
                    <div style={{ maxWidth: '100%', overflowY: 'auto', padding: 10 }}>
                        <TableContainer component={Paper} className="overflow-x-auto mt-6 relative">
                            {/* MaterialReactTable with disabled internal pagination */}
                            <MaterialReactTable
                                columns={columns}
                                data={farmersData}
                                enablePagination={false}
                                muiTableHeadCellProps={{
                                    sx: {
                                        borderBottom: "none",
                                    },
                                }}
                                muiTableBodyCellProps={{
                                    sx: {
                                        borderBottom: "none",
                                    },
                                }}
                            />
                            {/* Pagination Component */}
                            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white">
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]} // Adjust row options
                                    component="div"
                                    count={totalCount}  // Total number of rows in your data
                                    rowsPerPage={rowsPerPage}  // Rows per page
                                    page={page}  // Current page
                                    onPageChange={handleChangePage}  // Handle page change
                                    onRowsPerPageChange={handleChangeRowsPerPage}  // Handle rows per page change
                                    nextButtonProps={{ disabled: page * rowsPerPage + rowsPerPage >= totalCount }}  // Disable next button if no next page
                                    backButtonProps={{ disabled: page === 0 }}  // Disable back button if at the first page
                                />
                            </div>
                        </TableContainer>
                    </div>
                }

                <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" >
                    <DialogContent className="space-y-4">
                        {/* Flex container in column direction for all screen sizes */}
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={downloadSampleExcel}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition w-full"
                            >
                                Download Sample Excel
                            </button>

                            <DialogTitle className="text-center text-xl font-semibold">
                                Upload Excel File
                            </DialogTitle>

                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                                className="py-2 px-4 border border-gray-300 rounded-lg w-full"
                            />
                        </div>

                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                    </DialogContent>

                    <DialogActions>
                        <button
                            onClick={handleUpload}
                            style={{ zIndex: 10 }}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload Excel'}
                        </button>
                    </DialogActions>
                </Dialog>
            </div>

            <AddEmployee handleSubmit={handleSubmit} open={openDialog} onClose={() => setOpenDialog(false)} formData={formData} setFormData={setFormData} />

        </>

    );
};

export default FarmersInformation;
