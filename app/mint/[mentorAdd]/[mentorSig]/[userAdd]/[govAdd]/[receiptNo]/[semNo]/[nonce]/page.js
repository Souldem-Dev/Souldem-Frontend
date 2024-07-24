"use client"
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import successMint from "@/app/assets/successMint.png"
function Page(){
    let params = useParams()
    let [dt,setDt] = useState(null)
    useEffect(()=>{
        let govAdd = params.govAdd
        let semNo = params.semNo
        let nonce = params.nonce
        console.log(params)
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+`marksheets/getResult/${govAdd}/${nonce}/${semNo}`).then(res=>{
        console.log(res.data.ipfsCid)
        axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"marksheets/mintCert",{governAdd:govAdd,studentAdd:params.userAdd,mentorAdd:params.mentorAdd,currentSem:parseInt(params.semNo),receiptNo:params.receiptNo,mentorSignature:params.mentorSig, _ipfsCID:res.data.ipfsCid,relayerSig:res.data.signature,degreeIpfs:""}).then(resp=>{
            console.log(resp)
            setDt(res.data)
        }).catch(err=>{
            console.log(err)
        })

        }).catch(err=>{
            console.log(err)
        })
    },[])
    return(
        <>
        <div className="flex mt-20 justify-center">
            {dt===null?(
<div className='text-center'>
<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
  <span class="sr-only">Loading...</span>
</div>
<p>Fetching your Marksheet and Result, Please wait a while...</p>
</div>):        <div >
<div className='flex justify-center'>
<div>
<Image src={successMint} />

</div>
</div>
<div className='text-center'>
<b className="text-lg">Your Marksheet Successfully Minted</b>
<p className='text-zinc-500'><b className='text-stone-950'>Your address: </b>{params.userAdd}</p>
<p className='text-zinc-500'><b className='text-stone-950'>governance address: </b>{params.govAdd}</p>
<p className='text-zinc-500'><b className='text-stone-950'>semester: </b>{params.semNo}</p>
<button className='btn btn-blue bg-blue-700 mt-3'>Continue</button>
</div>

</div> }
 


        </div>
        </>
    )
}
export default Page

