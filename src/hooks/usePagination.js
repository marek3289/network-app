import { useState, useEffect } from 'react';

export const usePagination = (threads, pageType, currentPage, postPerPage) => {
  const [threadList, setThreadList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (threads && threads.length === 0) setLoading(false);
    setThreadList([]);

    const subscribe =
      threads &&
      threads.map((elm, i) => {
        if (
          i + 1 <= currentPage * postPerPage &&
          i + 1 > currentPage * postPerPage - postPerPage
        ) {
          setThreadList(state => [...state, elm]);
        }
        return setLoading(false);
      });

    return () => subscribe;
  }, [threads, pageType, currentPage, postPerPage]);

  return { threadList, isLoading };
};
