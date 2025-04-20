import { useAppDispatch, useAppSelector } from '@/state/redux';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const SearchPage = () => {
    const SearchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const isFilterFullOpen = useAppSelector(
        (state) => state.global.isFilterFullOpen
    )
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage;