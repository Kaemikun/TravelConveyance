import StepLayout from './StepLayout'
import FileUpload from './FileUpload'
import './Step1PreApproval.css'

export default function Step1PreApproval({ currentStep, data, update, onBack, onNext }) {
  const isDomestic = data.requestType === 'domestic'

  const canProceed = isDomestic
    ? !!data.preApprovalDoc
    : !!data.preApprovalDoc && !!data.passportDoc

  return (
    <StepLayout
      currentStep={currentStep}
      title="Pre-Approval Documents"
      subtitle={isDomestic
        ? 'Upload the mandatory pre-approval document before proceeding.'
        : 'Upload mandatory documents. Visa and travel insurance are optional but recommended.'}
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!canProceed}
    >
      <div className="prereq-banner">
        <span className="prereq-icon">{isDomestic ? '🏠' : '🌍'}</span>
        <span>
          <strong>{isDomestic ? 'Domestic' : 'International'} Travel</strong> —
          {isDomestic
            ? ' Pre-approval document is mandatory.'
            : ' Pre-approval form and passport are mandatory. Visa and travel insurance are optional.'}
        </span>
      </div>

      <div className="upload-grid">
        <FileUpload
          label="Pre-Approval Document"
          required
          file={data.preApprovalDoc}
          onChange={f => update({ preApprovalDoc: f })}
          hint="Signed approval from your manager/HR · PDF up to 10MB"
        />

        {!isDomestic && (
          <>
            <FileUpload
              label="Passport (Bio Data Page)"
              required
              file={data.passportDoc}
              onChange={f => update({ passportDoc: f })}
              hint="Scanned copy of your passport · PDF, JPG, PNG"
            />

            <FileUpload
              label="Visa Document"
              file={data.visaDoc}
              onChange={f => update({ visaDoc: f })}
              hint="Visa stamp / approval page (optional)"
            />

            <FileUpload
              label="Company-Issued Travel Insurance"
              file={data.travelInsuranceDoc}
              onChange={f => update({ travelInsuranceDoc: f })}
              hint="Insurance certificate issued by company (optional)"
            />
          </>
        )}
      </div>

      <div className="upload-note">
        <span>💡</span>
        <span>Ensure all documents are clearly legible. Blurry or incomplete documents may cause delays in approval.</span>
      </div>
    </StepLayout>
  )
}
