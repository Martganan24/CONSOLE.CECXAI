import React, {
    useState,
    useEffect
} from 'react';
import {
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';

const ProtectedRoute = ({
    auth,
    component: Component,
    ...rest
}) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate authentication check delay
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 100); // Adjust the delay time as needed

        return () => clearTimeout(delay);
    }, []);

    if (isLoading) {
        return ( <
            div className = "text-center mt-5" >
            <
            div className = "spinner-border"
            role = "status" >
            <
            span className = "visually-hidden" > Loading... < /span> <
            /div> <
            /div>
        )
    }

    return ( <
        Route { ...rest
        }
        render = {
            (props) => {
                if (auth) {
                    return <Component { ...props
                    }
                    />;
                } else {
                    return ( <
                        Redirect to = {
                            {
                                pathname: '/signin',
                                state: {
                                    from: location.pathname
                                },
                            }
                        }
                        />
                    );
                }
            }
        }
        />
    );
};

export default ProtectedRoute;