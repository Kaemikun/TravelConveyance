import { useState } from 'react'
import Step0RequestType from '../steps/Step0RequestType'
import Step1PreApproval from '../steps/Step1PreApproval'
import Step2Settlement from '../steps/Step2Settlement'
import Step3Conveyance from '../steps/Step3Conveyance'
import Step4Feedback from '../steps/Step4Feedback'
import Step5Review from '../steps/Step5Review'

export default function NewRequestFlow({ onBack, user }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    requestType: '',
    // pre-approval
    preApprovalDoc: null,
    passportDoc: null,
    visaDoc: null,
    travelInsuranceDoc: null,
    // settlement
    travelDateFrom: '',
    travelDateTo: '',
    hotelBills: null,
    hotelAmount: '',
    // conveyance
    conveyance: {
      homeToAirport: { enabled: false, proof: null, amount: '' },
      airportToVenue: { enabled: false, proof: null, amount: '' },
      venueToAirport: { enabled: false, proof: null, amount: '' },
      airportToHome: { enabled: false, proof: null, amount: '' },
    },
    mobileRecharge: '',
    fuelAmount: '',
    // feedback
    feedbackInvoice: null,
  })

  const update = (patch) => setFormData(prev => ({ ...prev, ...patch }))

  const steps = [
    <Step0RequestType key="0" currentStep={0} data={formData} update={update} onBack={onBack} onNext={() => setCurrentStep(1)} />,
    <Step1PreApproval key="1" currentStep={1} data={formData} update={update} onBack={() => setCurrentStep(0)} onNext={() => setCurrentStep(2)} />,
    <Step2Settlement key="2" currentStep={2} data={formData} update={update} onBack={() => setCurrentStep(1)} onNext={() => setCurrentStep(3)} />,
    <Step3Conveyance key="3" currentStep={3} data={formData} update={update} onBack={() => setCurrentStep(2)} onNext={() => setCurrentStep(4)} />,
    <Step4Feedback key="4" currentStep={4} data={formData} update={update} onBack={() => setCurrentStep(3)} onNext={() => setCurrentStep(5)} />,
    <Step5Review key="5" currentStep={5} data={formData} user={user} onBack={() => setCurrentStep(4)} onSubmit={onBack} />,
  ]

  return steps[currentStep]
}
