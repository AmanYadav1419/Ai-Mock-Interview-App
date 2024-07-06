"use client";

// this is the single componet card from upgrade page  

import { useUser } from "@clerk/nextjs";
import React from "react";

const PlanItemCard = ({ plan }) => {
    // for fetching correct user data
  const { user } = useUser();

  return (
    <div className="rounded-2xl border border-gray-300 p-6 shadow-sm sm:px-8 lg:px-12">
      <div className="text-center">
  {/* name of plan */}
        <h2 className="text-lg font-medium text-gray-900">
          {plan.name}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          {/* for plan cost  */}
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {plan.cost}$
          </strong>

          {/* for month */}
          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>

      <ul>
        {plan.offering.map((item, index) => (
          <li className="flex items-center gap-1 mb-2" key={index}>
            <h2 className="text-gray-700">{item.value}</h2>
          </li>
        ))}
      </ul>

      <a
        href={
          plan.paymentLink +
          "?prefilled_email=" +
          user?.primaryEmailAddress.emailAddress
        }
        target="_blank"
        className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      >
        Get Started
      </a>

    </div>
  );
};

export default PlanItemCard;
