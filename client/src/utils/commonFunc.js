import { useSelector } from 'react-redux';

const token = localStorage.getItem('auth-token')

const useCheckLoginStatus = () => {
    const isLogin = useSelector(({ user }) => user.isLogin);

    return isLogin;
}

export {
    token,
    useCheckLoginStatus
}