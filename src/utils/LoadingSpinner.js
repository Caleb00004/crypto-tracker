import './spinner.css'

// Component to render while data is being fetched from api
export default function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
            <p>Please wait...</p>
        </div>
    )
}