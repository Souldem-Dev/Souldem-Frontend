'use client';
import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, University } from 'lucide-react';
import SearchFilter from '@/components/governance/SearchFilter';
import Card from '@/components/governance/Card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

const Page = ({ onClose }) => {
  // Add onClose as a prop
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [previousData, setPreviousData] = useState([]);
  const [loadingToastShown, setLoadingToastShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [governancePerPage] = useState(8);

  const fetchData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const publicAddress = await signer.getAddress();

      const { data: getData } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}factory/getData/${publicAddress}`
      );
      const { collegeAddress, name } = getData;

      const { data: getGovernance } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}factory/getGovernanceAddress/${collegeAddress}`
      );

      setData(getGovernance);
      setPreviousData(getGovernance);
      setName(name);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(error.response?.data?.reason || 'Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (loadingToastShown) {
      setTimeout(() => {
        setLoadingToastShown(false);
      }, 10000);
    }
  }, [loadingToastShown]);

  const indexOfLastGovernance = currentPage * governancePerPage;
  const indexOfFirstGovernance = indexOfLastGovernance - governancePerPage;
  const currentGovernance = data.slice(
    indexOfFirstGovernance,
    indexOfLastGovernance
  );
  const totalPages = Math.ceil(data.length / governancePerPage);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-6 md:mx-12 my-4 mb-16 w-full relative">
      <div className="flex mb-8 items-center">
        <Home className="text-blue" />
        <h1 className="font-light text-blue text-3xl">Dashboard</h1>
      </div>
      {/* Add the search and filter dropdown here */}
      <SearchFilter data={data} />
      {/* card mapping */}
      <Card data={currentGovernance} name={name} />
      <ToastContainer /> {/* Pagination buttons */}
      <Pagination className="bottom absolute my-2 ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:bg-blue hover:text-white hover:cursor-pointer 
              "
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                  className="hover:bg-blue hover:text-white"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              className="hover:bg-blue hover:text-white hover:cursor-pointer "
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Page;
