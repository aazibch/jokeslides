import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
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
                const res = await response.json();
                // Handling JSON error response
                console.log('res testing', res.status);
                return setError(res.message);
            }

            let resData;

            if (requestConfig.method !== 'DELETE') {
                resData = await response.json();
            }

            if (resData) {
                applyData(resData);
            } else {
                applyData();
            }
        } catch (error) {
            // The catch block is also run if you attempt to parse JSON
            // while the response we get from the backend is in a different format.
            setError('Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    const dismissErrorHandler = () => {
        setError(null);
    };

    return {
        isLoading,
        error,
        dismissErrorHandler,
        sendRequest
    };
};

export default useHttp;
