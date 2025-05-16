import React from "react";
import {
    Dialog,
    DialogContent,
    IconButton,
    Button,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DownloadIcon from "@mui/icons-material/Download";

export default function FileUploadModal({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '24px', overflow: 'hidden', boxShadow: 3, width: '100%', maxWidth: '40%', backgroundColor: 'white' } }} >
            {/* Header with Close Button (uses flexbox instead of absolute positioning) */}
            <Box className="flex justify-end p-2">
            <IconButton onClick={onClose} className="text-gray-400 hover:text-gray-500 p-1" size="small"><CloseIcon fontSize="small" /></IconButton>
            </Box>

            <DialogContent className="flex flex-col items-center justify-center pt-0 pb-8 px-10">
                <div className="w-full border border-dashed border-gray-300 rounded-lg py-12 px-8 text-center flex flex-col items-center justify-center">
                    <CloudUploadOutlinedIcon
                        className="text-black"
                        style={{ fontSize: 36 }}
                    />
                    <p className="text-[20px] font-medium text-gray-800 mt-6">
                        Choose a file or drag & drop it here.
                    </p>
                    <p className="text-[20px] text-gray-500 mt-1">
                        Excel formats, up to 50 MB
                    </p>
                    <Button variant="outlined" className="normal-case text-md font-normal rounded-md" sx={{ textTransform: 'none', borderColor: 'lightgrey', color: '#000', paddingX: '16px', paddingY: '6px', minWidth: '120px', borderRadius: 2, marginTop: 4, '&:hover': { borderColor: 'lightgrey', backgroundColor: '#fff' } }}>Browse File</Button>
                </div>

                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ textTransform: 'none', backgroundColor: '#22C900', borderRadius: 2, '&:hover': { backgroundColor: '#22C900' }, paddingY: '10px', paddingX: '20px', boxShadow: 'none', fontWeight: 500, marginTop: 4, marginBottom: 3 }}>Download Template</Button>
            </DialogContent>
        </Dialog>
    );
}
