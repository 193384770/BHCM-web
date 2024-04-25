import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // 更新URL为指定的后端地址
            const response = await axios.post('http://huiyishunjian.natapp1.cc/login', { email, password });
            console.log('Login successful:', response.data);
            navigate('/dashboard'); // 登录成功后跳转到仪表板
        } catch (error) {
            // 检查错误响应，适当显示错误消息
            setError('登录失败：请检查您的邮箱和密码是否正确！');
        }
    };

    const goToRegister = () => {
        navigate('/register'); // 跳转到注册界面
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <Typography component="h1" variant="h4" style={{ fontWeight: 'bold', marginBottom: 20 }}>
                    BHCM医学影像分割系统
                </Typography>
                {error && <Alert severity="error" style={{ width: '100%', marginBottom: 20 }}>{error}</Alert>}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="邮箱地址"
                    autoComplete="email"
                    autoFocus
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
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 10 }}
                    onClick={handleLogin}
                >
                    登录
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="text"
                    color="secondary"
                    style={{ marginTop: 10 }}
                    onClick={goToRegister}
                >
                    注册新账户
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
