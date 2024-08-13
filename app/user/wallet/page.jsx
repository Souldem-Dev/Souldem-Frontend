'use client';
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import dashboard from '@/app/assets/Governance/dashboard.svg';

import CardUser from '@/components/governance/CardUser';
import CertificateCard from '@/components/student/CertificateCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

const page = () => {
  let router = useRouter();
  let [gov, setGov] = useState([]);
  let [isConnectAadhaar, setIsConnectAadhaar] = useState(false);
  let [certs, setCerts] = useState([]);
  useEffect(() => {
    let add = localStorage.getItem('userPublicAddress');
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'become/joinedGov/student/' + add
      )
      .then((res) => {
        setGov(res.data);
        console.log(res.data);
        let userMail = localStorage.getItem('userEmail');
        axios
          .get(
            process.env.NEXT_PUBLIC_BACKEND_URL +
              'aadhaar/isAadhaarIntegWithSDEM/' +
              userMail
          )
          .then((res) => {
            setIsConnectAadhaar(true);

            axios
              .get(
                process.env.NEXT_PUBLIC_BACKEND_URL +
                  'marksheets/getMintedCerts/' +
                  add
              )
              .then((res) => {
                console.log(res);
                setCerts(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(res.data);
          })
          .catch((err) => {
            setIsConnectAadhaar(false);
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" m-8  w-full	">
      <div className="flex ">
        <Image src={dashboard} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Dashboard</h1>
      </div>{' '}
      {isConnectAadhaar == true ? null : (
        <div className="bg-[#FF9D9D] p-2 px-4 mb-4  w-fit rounded-2xl">
          <p className="text-red-600">
            &#9888; Connect your Souldem account with aadhaar card for efficient
            use(manaditory)
            <span
              className="text-blue"
              onClick={() => {
                router.push('/user/aadhaarIntr');
              }}
            >
              {' '}
              Add Now
            </span>
          </p>
        </div>
      )}
      {/* Add the search and filter dropdown here */}
      <div className="flex flex-col">
        <div className="flex justify-between mr-20">
          <h1 className="font-light text-blue  text-xl">Issued Certificates</h1>
        </div>

        <CertificateCard certificates={certs} />
      </div>
      {/* card mapping */}
      <div className="flex flex-col">
        <h1 className="font-light text-blue  text-xl">Dashboard</h1>

        <CardUser data={gov} />
      </div>
    </div>
  );
};

export default page;
