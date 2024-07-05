import "./Modal.css";
import HomeButton from "./HomeButton";

const Modal = ({ show, handleClose, homeOptionHidden, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-overlay"></div>
      <section className="modal-main">
        {children}
        <div
          class={
            homeOptionHidden ? "newButtons oneButton" : "newButtons twoButtons"
          }
        >
          <button onClick={() => handleClose()}>
            {homeOptionHidden ? "Start" : "Start new game"}
          </button>
          <HomeButton hidden={homeOptionHidden} style={{ position: "fixed" }} />
        </div>
      </section>
    </div>
  );
};

export default Modal;
