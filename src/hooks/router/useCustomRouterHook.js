import { useLocation, useNavigate } from "react-router-dom";
import qs from 'query-string';
import { useEffect, useState } from "react";

function useCustomRouterHook() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryString = qs.parse(location.search);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!location) {
            return;
        }

        setIsReady(true);
    }, [location])

    const customRouter = {
        push: ({
            pathname,
            query,
            state,
            replace
        }) => {
            let to = qs.stringifyUrl({
                url: pathname,
                query: query
            });

            navigate({
                pathname: to
            }, {
                state: state,
                replace: replace
            })
        },
        query: queryString,
        uri: location.pathname + location.search,
        location: location,
        pathname: location.pathname,
        isReady: isReady
    }

    return customRouter;
}

export {
    useCustomRouterHook
}