import SignForm from "./SignForm.js";

function SignPage({ setModal }) {

    const handleLoginClose = () => {
        setModal(prevState => ({ ...prevState, show: false }))
    }

    return (
        <div className='sign-page'>
            <div className="sign-page-content">
                <div className="close" onClick={handleLoginClose}>&times;</div>
                <SignForm />
            </div>
        </div>
    )
}

export default SignPage;