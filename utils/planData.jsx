// this is for upgrade route and plans 

export default [
  {
    id: 1,
    name: "Free",
    cost: 0,
    offering: [
      {
        value: "✅ Create 3 Free Mock Interview",
      },
      {
        value: "✅ Unlimited Retake Interview",
      },
      {
        value: "❌ Practise Question",
      },
      {
        value: "❌ Email Support",
      },
    ],
  },
  {
    id: 1,
    name: "Monthly",
    cost: 7.99,
    //add stripe payment link in ''
    paymentLink: "",
    offering: [
      {
        value: "✅ Create 3 Free Mock Interview",
      },
      {
        value: "✅ Unlimited Retake Interview",
      },
      {
        value:"✅ Practise Question"
      },
      {
        value:"✅ Email Support"
      },
    ],
  },
];
