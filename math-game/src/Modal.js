import "./Modal.css";
import HomeButton from "./HomeButton";

const Modal = ({ show, handleClose, homeOption, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-overlay"></div>
      <section className="modal-main">
        {children}
        <div
          class={homeOption ? "newButtons oneButton" : "newButtons twoButtons"}
        >
          <button onClick={() => handleClose()}>
            {homeOption ? "Start new game" : "Start"}
          </button>
          <HomeButton hidden={homeOption} style={{ position: "fixed" }} />
        </div>
      </section>
    </div>
  );
};

export default Modal;
