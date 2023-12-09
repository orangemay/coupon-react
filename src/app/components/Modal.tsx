import { createPortal } from 'react-dom';

import CloseIcon from '../icons/CloseIcon.svg'
import style from './Modal.module.css';

type ModalProps = {
  show: boolean;
  close: () => void;
  title: string;
  children: any
}

export default function Modal({ show, close, title, children }: ModalProps) {
  const modalContainer = document.getElementById("modal");
  if (!modalContainer) {
    console.error('Modal container not found');
    return null;
  }

  return createPortal(
    <>
        <div className={`style.modalContainer ${show ? "show" : ""}`} onClick={() => close()}>
          <div className={style.modal} onClick={(e) => e.stopPropagation()}>
            <header className={style.modalHeader}>
              <h2 className={style.modalTitle}>
                {title}
              </h2>
              <button className="close">
                <img className={style.icon} src={CloseIcon.src} alt="close" onClick={() => close()}/>
              </button>
            </header>
            <main className="modal-content">
              {children}
            </main>
            <footer className="modal-footer">
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>
              <button className="submit">
                Submit
              </button>
            </footer>
          </div>
        </div>
    </>,
    modalContainer as Element
  );
};
