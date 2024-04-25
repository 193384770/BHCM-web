import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email || !email.includes('@')) {
            setError('请输入有效的邮箱地址！');
            return;
        }
        if (password.length < 6) {
            setError('密码长度必须至少为6个字符！');
            return;
        }
        if (password !== confirmPassword) {
            setError('密码和确认密码不匹配！');
            return;
        }

        try {
            const response = await axios.post('http://huiyishunjian.natapp1.cc/register', { email, password });
            console.log('注册成功', response.data);
            navigate('/login'); // 注册成功后跳转到登录界面
        } catch (error) {
            const errorMessage = error.response ? (error.response.data.error || error.response.data.message) : error.message;
            setError('注册失败：' + errorMessage);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <Typography component="h1" variant="h4" style={{ fontWeight: 'bold', marginBottom: 20 }}>
                    注册
                </Typography>
                {error && <Alert severity="error" style={{ width: '100%', marginBottom: 20 }}>{error}</Alert>}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="邮箱地址"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="密码"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="确认密码"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 10 }}
                    onClick={handleRegister}
                >
                    注册
                </Button>
            </Box>
        </Container>
    );
}

export default Register;
