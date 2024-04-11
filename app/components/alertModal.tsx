'use client'
import React from "react";
 
interface iAlertModal{
    title:string;
    body:string;
    onClick: (value:boolean)=>void;
}
 
const AlertModal: React.FC<iAlertModal> = ({title, body, onClick}) => {
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="fixed top-0 inset-x-0 flex flex-col items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-b-xl overflow-hidden shadow-lg w-96 sm:w-80 md:w-96 lg:w-104 xl:w-112 flex flex-col justify-start">
                    <div className="bg-gray-600 px-4 py-2">
                        <p className="text-white text-2xl font-bold">{title}</p>
                    </div>
                    <div className="bg-gray-200 px-4 py-3">
                        <p className="text-black text-lg text-center">{body}</p>
                    </div>
                    <div className="bg-gray-200 px-4 py-0 flex justify-end">
                        <button className="bg-green-400 text-white rounded-md p-1.5 mb-3 hover:bg-cyan-200" onClick={()=>onClick(false)}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
 
    );
}
 
export default AlertModal;