import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthData, authorize} from '../redux/auth_actions';
import { useHistory } from "react-router-dom";

const useCheckAuth = () => {
    const authorized = useSelector((state) => state.authenticated);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        
        const localStorageData = window.localStorage.getItem('auth');

        if (localStorageData) {
            const authData = JSON.parse(localStorageData);
            console.log(authData);
            dispatch(authorize());
            dispatch(setAuthData(authData))
            if (history.location.pathname === '/')
                history.push('/dashboard');
        } else {
            history.push('/')
        }

    }, [authorized, dispatch, history])
}


export default useCheckAuth;