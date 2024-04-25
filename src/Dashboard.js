import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Card, CardContent, CardActions,
  AppBar, Toolbar, IconButton, Grid, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Snackbar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

function Dashboard() {
    const [open, setOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [processingStatus, setProcessingStatus] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [file, setFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://huiyishunjian.natapp1.cc/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setProcessingStatus('文件处理成功，请点击下载结果按钮');
                setDownloadUrl(data.downloadUrl);
                setSnackbarMessage('文件处理成功，请点击下载结果按钮');
                setSnackbarOpen(true);
                handleClose();
            } else {
                setUploadStatus('文件上传失败');
                setSnackbarMessage(data.error || '文件上传失败');
                setSnackbarOpen(true);
            }
        } catch (error) {
            setUploadStatus('文件上传失败');
            setSnackbarMessage('网络错误或服务器无响应');
            setSnackbarOpen(true);
        }
    };

    const handleDownload = () => {
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
        }
    };

    return (
        <Container component="main" maxWidth="lg" sx={{ bgcolor: '#f7f7f7' }}>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <CloudUploadIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        BHCM医学影像分割系统
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ width: '100%', maxWidth: 360, boxShadow: 3, p: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    上传影像文件
                                </Typography>
                                <Typography color="textSecondary">
                                    选择文件并上传以进行分割处理。
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={handleClickOpen} fullWidth>
                                    上传文件
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ width: '100%', maxWidth: 360, boxShadow: 3, p: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    下载结果
                                </Typography>
                                <Typography color="textSecondary">
                                    下载已处理的影像文件。
                                </Typography>
                                <Typography color="secondary">
                                    {processingStatus}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleDownload} fullWidth>
                                    下载文件
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>上传文件</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请选择一个文件进行上传。
                        </DialogContentText>
                        <input type="file" onChange={handleFileChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={handleUpload} disabled={!file}>上传</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
            </Box>
        </Container>
    );
}

export default Dashboard;
