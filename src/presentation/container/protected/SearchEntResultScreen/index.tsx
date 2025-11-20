import React from 'react'
import { SearchEntResult } from './SearchEntResult'
import { useLocation } from 'react-router-dom';

const SearchEntResultScreen = (): any => {
    const { state } = useLocation();
    return <SearchEntResult data={state?.data} />
}

export default SearchEntResultScreen