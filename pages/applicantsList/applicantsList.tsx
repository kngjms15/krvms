import React, { useEffect, useState } from "react";
import { VolunteerApplicant } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";
import AlertModal from "@/app/components/alertModal";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";

interface ApplicantsListProps {
  applicant: VolunteerApplicant;
  onDelete?: (id: number) => void;
}

const calculateAge = (dob: Date) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicant,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(applicant.interviewStatus);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("KidsForSport Management");
  const [alertBody, setAlertBody] = useState("Please wait a moment...");

  useEffect(() => {
    setStatus(applicant.interviewStatus);
  }, [applicant]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    toggleModal();
    if (applicant) {
      try {
        const response = await fetch(
          `/api/applicants/${applicant.applicantId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDelete?.(parseInt(`${applicant.applicantId}`, 10));
          // Handle successful deletion (e.g., update state or notify user)
          setAlertBody("Applicant deleted successfully!");
          setShowAlert(true);
        } else {
          console.error("Failed to delete applicant:", response.status);
          setAlertBody("Failed to delete applicant. Please try again.");
          setShowAlert(true);
          // Handle deletion failure (e.g., show error message)
        }
      } catch (error) {
        console.error("Error deleting applicant:", error);
        setAlertBody("Error deleting applicant. Please try again later.");
        setShowAlert(true);
      }
    }
  };

  const handleStatusChange = async (newStatus: string, applicantId: string) => {
    try {
      const response = await fetch(`/api/applicants/${applicantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interviewStatus: newStatus,
        }),
      });

      if (response.ok) {
        setStatus(newStatus);
        setAlertBody("Status updated successfully!");
        setShowAlert(true);
      } else {
        console.error("Failed to update status:", response.status);
        setAlertBody("Failed to update status. Please try again.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setAlertBody("Error updating status. Please try again later.");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
      <div className=" flex justify-between flex-grow ">
        {showAlert &&  
          <AlertModal title={alertTitle} body={alertBody} onClick={()=>setShowAlert(false)}/>
        }
        {showModal && (
          <ConfirmationModal
            message="Are you sure you want to delete this applicant?"
            onConfirm={handleDelete}
            onCancel={toggleModal}
          />
        )}
        {applicant && (
          <>
            <div className=" flex-col ">
              <h3 className="text-xl font-extrabold">
                {applicant.firstName} {applicant.lastName}
              </h3>
              <h4 className="text-md font-semibold">
                {applicant.chapter && <span className="font-normal flex flex-row"><p className="font-bold">Chapter:&nbsp;</p> {applicant.chapter}</span>}
              </h4>
              <h4 className="text-md my-2 font-bold">
                Status:&nbsp;
                <select
                  className="border border-gray-300 rounded p-1 font-normal"
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value, `${applicant.applicantId}`)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </h4>

              <h4 className="text-md font-normal"><strong>ApplicantID:&nbsp;</strong>{applicant.applicantId}</h4>
            </div>
          </>
        )}
        <div className="flex justify-end ">
          <button
            className="text-blue-500 m-2"
            onClick={toggleDetails}
            aria-label="Toggle Details"
          >
            {showDetails ? (
              <MdExpandLess size={34} />
            ) : (
              <MdExpandMore size={36} />
            )}
          </button>
          <button
            className="text-red-500 m-2"
            onClick={toggleModal}
            aria-label="Toggle Details"
          >
            <MdDelete size={36} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {applicant && applicant.createdAt && (
          <p className="text-gray-700 mt-2 font-normal">
            <strong>Application Date:&nbsp;</strong>{new Date(applicant.createdAt).toDateString()}
          </p>
        )}
        {showDetails && (
          <>
            <p className="text-gray-700 mt-2"><strong>Address:&nbsp;</strong>{applicant.address}</p>
            <p className="text-gray-700 mt-2"><strong>Email:&nbsp;</strong>{applicant.email}</p>
            <p className="text-gray-700 mt-2">
              <strong>Primary Phone:&nbsp;</strong>{applicant.primaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Secondary Phone:&nbsp;</strong>{applicant.secondaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Name:&nbsp;</strong>{applicant.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Phone:&nbsp;</strong>{applicant.emergencyContactPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Relationship:&nbsp;</strong>
              {applicant.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
            <strong>Date of Birth:&nbsp;</strong>{new Date(applicant.dob).toDateString()}
              <span>
                &nbsp;
                (<strong>{calculateAge(applicant.dob)}</strong>, years old)
              </span>
            </p>
            <p className="text-gray-700 mt-2 text-wrap ">
              <strong>Medical Condition Details:&nbsp;</strong>{applicant.medicalConditionDetails}
            </p>
            <p className="text-gray-700 mt-2 text-wrap">
              <strong>Volunteer Experience:&nbsp;</strong>{applicant.volunteerExperienceDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Conviction:&nbsp;</strong>{applicant.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Bondable:&nbsp;</strong>{applicant.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition:&nbsp;</strong>{applicant.medicalCondition ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Applicant Status:&nbsp;</strong>{applicant.interviewStatus}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
