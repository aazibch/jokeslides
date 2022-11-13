import { useState } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const sendRequest = async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body
                    ? JSON.stringify(requestConfig.body)
                    : null
            });

            if (!response.ok) {
                // To replace with message from backend.
                throw new Error('Request failed!');
            }

            const resData = await response.json();
            applyData(resData);
        } catch (error) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttp;
