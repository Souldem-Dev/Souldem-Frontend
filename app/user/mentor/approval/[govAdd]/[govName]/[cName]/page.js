'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
const Page = () => {
  const params = useParams();
  let formik = useFormik({
    initialValues: {
      studentsEmail: '',
      currentSemester: '',
      receiptNumber: '',
    },
    validationSchema: Yup.object({
      studentsEmail: Yup.string()
        .email()
        .required('This Field is required')
        .strict()
        .trim('no spaces allowed'),
      currentSemester: Yup.number().required('this field is required'),
      receiptNumber: Yup.string()
        .required('this field is required')
        .strict()
        .trim('no spaces allowed'),
    }),
    onSubmit: (resp) => {
      let domain = {
        name: params.govName,
        version: '1',
        chainId: 1337,
        verifyingContract: params.govAdd,
      };
      let userMail = localStorage.getItem('userEmail');
      console.log(resp);
      console.log(domain);
      axios
        .post(
          process.env.NEXT_PUBLIC_BACKEND_URL + 'mail/sendMail/approve/student',
          { domain, student: {...resp,governAdd:params.govAdd}, userMail }
        )
        .then((res) => {
          console.log(res);
          toast.success('mail sent');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div className="w-full  h-full p-4  flex flex-col gap-y-8 rounded-xl   mx-auto ">
      <div className="flex gap-x-4 items-center mx-auto">
        <Link
          href={`/user/mentor//invite/${params.govAdd}/${params.govName}/${params.cName}`}
        >
          <button className="px-4 py-2 rounded-md bg-white text-blue hover:border-2 hover:border-blue">
            {' '}
            invite
          </button>
        </Link>

        <Link
          href={`/user/mentor/approval/${params.govAdd}/${params.govName}/${params.cName}`}

          // href={'/university/governance/marksEntryToggle'}
        >
          <button className="px-4 py-2 rounded-md bg-blue text-white hover:border-blue hover:border-2">
            {' '}
            approval
          </button>
        </Link>
      </div>
      <form
        className="w-11/12 bg-white drop-shadow-md  h-full py-8 px-4 md:p-20 my-8 mx-auto flex flex-col gap-y-12 rounded-xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col md:flex-row w-full gap-y-2">
          <div className="md:w-1/2">
            <label className="font-bold text-lg md:text-xl">
              Student’s Email
            </label>
            <p className="text-sm text-para">
              The email Id of student registered to souldem{' '}
            </p>
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              id="studentsEmail"
              name="studentsEmail"
              placeholder="Enter Authorized Email"
              className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
              value={formik.values.studentsEmail}
              onChange={formik.handleChange}
            />
            {formik.errors.studentsEmail ? (
              <p className="text-red-600">{formik.errors.studentsEmail}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-y-2">
          <div className="md:w-1/2">
            <label className="font-bold text-lg md:text-xl">
              Current Semester{' '}
            </label>
            <p className="text-sm text-para">
              Student’s current college semester
            </p>
          </div>
          <div className="md:w-1/2">
            <input
              type="number"
              id="currentSemester"
              name="currentSemester"
              placeholder="Enter current semester of the student"
              className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
              value={formik.values.currentSemester}
              onChange={formik.handleChange}
            />
            {formik.errors.currentSemester ? (
              <p className="text-red-600">{formik.errors.currentSemester}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-y-2">
          <div className="md:w-1/2">
            <label className="font-bold text-lg md:text-xl">
              Receipt Number
            </label>
            <p className="text-sm text-para">Student’s Receipt number </p>
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              id="receiptNumber"
              name="receiptNumber"
              placeholder="Enter receipt Number "
              className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
              value={formik.values.receiptNumber}
              onChange={formik.handleChange}
            />
            {formik.errors.receiptNumber ? (
              <p className="text-red-600">{formik.errors.receiptNumber}</p>
            ) : null}
          </div>
        </div>
        <button
          className="px-4 py-2 rounded-md bg-blue text-white hover:border-2 hover:border-blue"
          type="submit"
        >
          Approve
        </button>
      </form>
    </div>
  );
};

export default Page;
