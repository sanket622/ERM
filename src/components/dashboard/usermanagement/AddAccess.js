import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

import {
    updateField,
    setRoleType,
    setRoleAccess,
    setErrors,
    resetForm,
} from '../../../redux/usermanagement/emailAccessSlice';

import AutocompleteFieldComponent from '../../subcompotents/AutocompleteFieldComponent';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';

export default function EmailAccessForm() {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.emailAccess.formData);
    const errors = useSelector(state => state.emailAccess.errors);

    const [roleTypeOptions, setRoleTypeOptions] = useState([]);
    const [roleAccessOptions, setRoleAccessOptions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const labelStyle = { color: '#696969', fontSize: '16px', display: 'block', marginBottom: '6px', fontWeight: 500 };

    const validate = () => {
        const newErrors = {};
        if (!formData.roleType) newErrors.roleType = 'Role Type is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.roleAccess.length) newErrors.roleAccess = 'Role Access is required';

        dispatch(setErrors(newErrors));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        try {
            const payload = {
                role: formData.roleType,
                name: formData.name,
                email: formData.email,
                mobile: formData.phoneNumber,
                password: formData.password,
                modules: formData.roleAccess,
            };

            await axios.post(
                'https://api.earnplus.net/api/v1/employer/employerSubAdmin/createEmployerSubAdmin',
                payload,
                { headers }
            );

            enqueueSnackbar('Employer SubAdmin created successfully!', { variant: 'success' });
            dispatch(resetForm());
        } catch (error) {
            console.error('Error submitting data:', error);
            enqueueSnackbar('User with this mobile number or Email already exists!', { variant: 'error' });
        }
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get('https://api.earnplus.net/api/v1/employer/roleModule/getAllEmployerRoles',
                    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
                );
                if (res?.data?.success) {
                    const roleOptions = res.data.data.map(role => ({
                        id: role.id,
                        label: role.roleName,
                    }));
                    setRoleTypeOptions(roleOptions);
                }
            } catch (err) {
                console.error('Error fetching roles:', err);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        if (!formData.roleType) return;

        const fetchModules = async () => {
            try {
                const res = await axios.get(
                    `https://api.earnplus.net/api/v1/employer/roleModule/getModulesByEmployerRole/${formData.roleType}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
                );
                if (res?.data?.success) {
                    const accessOptions = res.data.data.map(module => ({
                        id: module.id,
                        label: module.moduleName,
                    }));
                    setRoleAccessOptions(accessOptions);
                }
            } catch (err) {
                console.error('Error fetching modules:', err);
            }
        };
        fetchModules();
    }, [formData.roleType]);

    const handleRoleAccessChange = (selectedOptions) => {
        const selectedIds = Array.isArray(selectedOptions)
            ? selectedOptions.map(option => option.id)
            : [];
        dispatch(setRoleAccess(selectedIds));
    };


    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-[32px] font-medium text-[#313131] text-center mb-10">
                Assign Email Access for Your Team
            </h1>

            <Box className="space-y-4 mt-10">
                <Box>
                    <label style={labelStyle}>Role Type</label>
                    <AutocompleteFieldComponent
                        options={roleTypeOptions}
                        value={roleTypeOptions.find(c => c.id === formData.roleType) || null}
                        onChange={v => dispatch(setRoleType(v ? v.id : ''))}
                    />
                    {errors.roleType && <p className="text-red-600">{errors.roleType}</p>}
                </Box>

                <Box>
                    <label style={labelStyle}>Role Access</label>
                    <AutocompleteFieldComponent
                        options={roleAccessOptions}
                        isMulti
                        placeholder="Select access you want to give"
                        value={roleAccessOptions.filter(opt => formData.roleAccess.includes(opt.id))}
                        onChange={handleRoleAccessChange}
                    />

                    {errors.roleAccess && <p className="text-red-600">{errors.roleAccess}</p>}
                </Box>

                {['name', 'email', 'phoneNumber'].map(field => (
                    <Box key={field}>
                        <label style={labelStyle}>{field === 'phoneNumber' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <TextFieldComponent
                            name={field}
                            type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                            value={formData[field]}
                            onChange={e => dispatch(updateField({ field: e.target.name, value: e.target.value }))}
                            placeholder={`Enter ${field}`}
                        />
                        {errors[field] && <p className="text-red-600">{errors[field]}</p>}
                    </Box>
                ))}

                {['password', 'confirmPassword'].map(field => (
                    <Box key={field}>
                        <label style={labelStyle}>
                            {field === 'password' ? 'Create Password' : 'Confirm Password'}
                        </label>
                        <TextFieldComponent
                            name={field}
                            type={
                                field === 'password'
                                    ? showPassword ? 'text' : 'password'
                                    : showConfirmPassword ? 'text' : 'password'
                            }
                            value={formData[field]}
                            onChange={e => dispatch(updateField({ field: e.target.name, value: e.target.value }))}
                            placeholder={field === 'password' ? 'Create your password' : 'Re-enter your password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                field === 'password'
                                                    ? setShowPassword(!showPassword)
                                                    : setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        >
                                            {((field === 'password' && showPassword) || (field === 'confirmPassword' && showConfirmPassword)) ? (
                                                <AiOutlineEyeInvisible />
                                            ) : (
                                                <AiOutlineEye />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {errors[field] && <p className="text-red-600">{errors[field]}</p>}
                    </Box>
                ))}
            </Box>

            <Box className="flex justify-center space-x-4 mt-10">
                <Button
                    variant="contained"
                    sx={{
                        background: '#ffff',
                        color: 'black',
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        fontSize: '14px',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': { background: '#fff' },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        background: '#4B5563',
                        color: 'white',
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        fontSize: '14px',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': { background: '#4B5563' },
                    }}
                >
                    Done
                </Button>
            </Box>
        </div>
    );
}
