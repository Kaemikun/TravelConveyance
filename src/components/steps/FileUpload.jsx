import { useRef } from 'react'

export default function FileUpload({ label, required, file, onChange, accept = '.pdf,.jpg,.jpeg,.png', hint = 'PDF, JPG, PNG up to 10MB' }) {
  const inputRef = useRef()

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div
        className={`upload-box ${file ? 'has-file' : ''}`}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={e => onChange(e.target.files[0] || null)}
        />
        {file ? (
          <>
            <div className="upload-icon">📄</div>
            <div className="upload-label">✓ {file.name}</div>
            <p>Click to replace</p>
          </>
        ) : (
          <>
            <div className="upload-icon">📁</div>
            <div className="upload-label">Click to upload</div>
            <p>{hint}</p>
          </>
        )}
      </div>
    </div>
  )
}
