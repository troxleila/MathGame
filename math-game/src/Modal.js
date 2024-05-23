

function Modal() {

  function closeModal() {
    const modal = document.querySelector("#modal");
    modal.close();
  }

  function openModal() {
    const modal = document.querySelector("#modal");
    modal.showModal();
  }
  
    return (
        <div>
            <dialog id="modal" class="dialog">
                <h3>Instructions</h3>
                <p>
                    This game is played by selecting three numbers that are all touching each other.
                    The first two numbers selected must together equal the 3rd number when your selected
                    operator is used <br/><br/>
                    Collect as many points as you can within the 60 second timer <br/><br/>
                    3 mistakes are allowed before your attempt is ended for you
                </p>
                <button id="closeModal" class="dialog-close-btn" onClick={closeModal}>Close</button>
            </dialog>
        </div>
    )

}

export default Modal;