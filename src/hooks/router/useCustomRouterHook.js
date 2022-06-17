import { useLocation, useNavigate } from "react-router-dom";
import qs from 'query-string';

function useCustomRouterHook() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryString = qs.parse(location.search);

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
        location: location
    }

    return customRouter;
}

export {
    useCustomRouterHook
}