"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link';
import { getLists } from './http/get-lists';
import ListsComponent from './components/lists-component';
import EmptyListsComponents from './components/empty-components';
import LoadingComponent from './components/loading-component';

export default function Home() {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['lists'],
    queryFn: () => getLists(),
    staleTime: 1000 * 60,
  })

  if(isLoading){
    return(
      <LoadingComponent/>
    )
  }

  console.log(data)

  return (
    <div className='pb-20'>
      {data?.count ? 
        <ListsComponent  data={data} onUpdate={()=>refetch()} />
        : 
        <EmptyListsComponents title='Lista'/>
      }
      
      <div className='fixed right-4 bottom-4 lg:right-80 bg-[#FF5C13] rounded-[100%] w-12 h-12 flex justify-center items-center transition hover:bg-[#592A9E]'>
        <Link href={`/list/create`} className='text-white text-3xl'>+</Link>
      </div>
    </div>
  );
}
