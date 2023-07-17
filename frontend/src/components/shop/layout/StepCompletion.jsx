
  //navigation steps
  const steps = ["Shipping", "Payment", "Success"];
  const handleStepCompletion = () => {
    setCompletedSteps((prevCompletedSteps) => [
      ...prevCompletedSteps,
      currentStep,
    ]);
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const progressBarWidth = `${(completedSteps.length / steps.length) * 100}%`;
const StepCompletion = () => {
      const [currentStep, setCurrentStep] = useState(1);
      const [completedSteps, setCompletedSteps] = useState([]);
  return <div>StepCompletion</div>;
};
export default StepCompletion;
