import React from "react";
import _ from 'lodash';

export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    React.useEffect(() => {
        const handler = _.debounce(() => {
            setDebouncedValue(value);
        }, delay);
        handler();
        return () => {
            handler.cancel();
        };
    }, [value]);
    return debouncedValue;
};
