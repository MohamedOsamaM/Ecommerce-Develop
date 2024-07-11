/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

function useProducts() {
    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
      let responseObject = useQuery({
        queryKey: ["recentProducts"],
        queryFn: getRecent,
        staleTime:5000,
        refetchInterval:10000,
        refetchIntervalInBackground:true,
        refetchOnWindowFocus:true,
        gcTime:10000,
      });
    return responseObject;
}

export default useProducts;