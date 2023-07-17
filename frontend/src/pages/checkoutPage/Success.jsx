import React, { useEffect, useState } from "react";
import "./checkout.css";
import SuccessAnim from "../../components/layout/Success"

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = ["Shipping", "Payment", "Success"];
  const progressBarWidth = `${(completedSteps.length / steps.length) * 100}%`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <Header />
        <div className="800px:flex justify-between w-[50%] items-center 800px:mx-auto mt-5 hidden">
          <section className="step-wizard">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: progressBarWidth }}
              ></div>
            </div>
            <ul className="step-wizard-list">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`step-wizard-item ${
                    completedSteps.includes(index + 1) ? "completed-item" : ""
                  } ${currentStep === index + 1 ? "current-item" : ""}`}
                >
                  <span className="progress-count">{index + 1}</span>
                  <span className="progress-label">{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="w-full">
          <SuccessAnim/>
        </div>

        <div className="800px:hidden mt-10 flex items-end justify-center">
          <h1 className="p-3 font-[500] text-[20px]">Success</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
