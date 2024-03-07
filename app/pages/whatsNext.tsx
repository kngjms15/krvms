import React from "react";

const WhatsNext = () => {
  return (
    <div className="flex-grow max-w-[940px] m-auto my-6">
      <title>KidSport What's Next</title>
      <form onSubmit={(e) => e.preventDefault()} className="bg-[#F2F2F2] rounded-lg p-8">
        <div className="block text-center">
          <h1 className="font-bold">What's Next</h1>
        </div>

        <div className="mt-12">
          <div className="flex">
            <h2>You've applied, now what?</h2>
          </div>
          <div className="flex p-3 mt-4">
            <p>
              Once you submit your volunteer application form, you will then need to be added to our Volunteer Newsletter, meaning you'll receive monthly or bi-monthly emails from us indicating what events and opportunities we have coming up that you could sign up for. If you see an event that you want to be a part of, sign up via the link in the email, and closer to the event, we'll reach out again with more information about that specific event and your role.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-12">
          <div></div>
          <div>
            <button
              type="submit"
              id="volunteer-what-next-submit"
              className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              role="button"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WhatsNext;
