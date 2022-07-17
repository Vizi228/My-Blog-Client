import React, { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getQuery } from '../utils/helpers/getQuery';

function SearchParamsNavigate({ children, path, className }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const allSearchParams = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  const query = getQuery(allSearchParams);
  return (
    <div
      className={className ? className : ''}
      onClick={() =>
        navigate(`${path ? path : location.pathname}${query && query}`, { replace: true })
      }>
      {children}
    </div>
  );
}

export default SearchParamsNavigate;
