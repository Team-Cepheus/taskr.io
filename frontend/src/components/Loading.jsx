import React from 'react';
import '../styles/Loading.css';
import { usePromiseTracker } from "react-promise-tracker";  
import Loader from 'react-loader-spinner';

const Loading = () => {
    const { promiseInProgress } = usePromiseTracker();
    return promiseInProgress && ( 
        <div className="loading">
            <Loader className="loader-spinner" type="TailSpin" color="#14FFEC" height="50" width="50" />
        </div>
     );
}
 
export default Loading;