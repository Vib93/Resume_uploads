import './modal.css';
type props={
    message: String
    onclick():void
}
export default function Modal({message,onclick}:props){
    return(
    <div className="modal">
                <div className="modal-contents">
                    <p>{message}</p>
                    <button onClick={onclick}>Play again</button>
                </div>
            </div>
            )
}
