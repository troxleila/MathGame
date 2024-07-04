import "./Modal.css";
import HomeButton from "./HomeButton";

const Modal = ({ show, handleClose, homeOption, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div class="newButtons">
          <button onClick={() => handleClose()}>
            {homeOption ? "Start new game" : "Close"}
          </button>
          <HomeButton hidden={homeOption} style={{ position: "fixed" }} />
        </div>
      </section>
    </div>
  );
};

export default Modal;
