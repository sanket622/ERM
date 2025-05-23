import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import AutocompleteFieldComponent from '../../subcompotents/AutocompleteFieldComponent';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';
import axios from 'axios';

const EditUserDialog = ({
  open,
  onClose,
  user,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    role: null,
    modules: [],
  });

  const [roleTypeOptions, setRoleTypeOptions] = useState([]);
  const [roleAccessOptions, setRoleAccessOptions] = useState([]);

  const labelStyle = { color: '#696969', fontSize: '16px', display: 'block', marginBottom: '6px', fontWeight: 500 };

  // Fetch role types on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get('https://api.earnplus.net/api/v1/employer/roleModule/getAllEmployerRoles',
          { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );
        if (res?.data?.success) {
          const options = res.data.data.map(role => ({
            id: role.id,
            label: role.roleName,
          }));
          setRoleTypeOptions(options);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    fetchRoles();
  }, []);

  // Fetch module access when role is selected
  useEffect(() => {
    if (!formData.role?.id) return;

    const fetchModules = async () => {
      try {
        const res = await axios.get(
          `https://api.earnplus.net/api/v1/employer/roleModule/getModulesByEmployerRole/${formData.role.id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );
        if (res?.data?.success) {
          const modules = res.data.data.map(module => ({
            id: module.id,
            label: module.moduleName,
          }));
          setRoleAccessOptions(modules);
        }
      } catch (err) {
        console.error('Error fetching modules:', err);
      }
    };
    fetchModules();
  }, [formData.role?.id]);

  // Pre-fill fields on dialog open
  useEffect(() => {
    if (user && roleTypeOptions.length > 0) {
      const matchedRole = roleTypeOptions.find(r => r.label === user.role?.roleName);
      const matchedModules = user.modules?.map(m => ({
        id: m.id,
        label: m.moduleName
      })) || [];

      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        role: matchedRole || null,
        modules: matchedModules,
      });
    }
  }, [user, roleTypeOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      roleId: formData.role?.id,
      moduleIds: formData.modules.map(m => m.id),
    };
    onSubmit(user.id, payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <label style={labelStyle}>Role Type</label>
            <AutocompleteFieldComponent
              options={roleTypeOptions}
              value={formData.role}
              onChange={(selected) =>
                setFormData(prev => ({ ...prev, role: selected, modules: [] }))
              }
            />
          </Box>

          <Box>
            <label style={labelStyle}>Role Access</label>
            <AutocompleteFieldComponent
              options={roleAccessOptions}
              isMulti
              placeholder="Select access you want to give"
              value={formData.modules}
              onChange={(selected) =>
                setFormData(prev => ({ ...prev, modules: selected }))
              }
            />
          </Box>

          <Box>
            <label style={labelStyle}>Name</label>
            <TextFieldComponent
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Box>

          <Box>
            <label style={labelStyle}>Phone Number</label>
            <TextFieldComponent
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
