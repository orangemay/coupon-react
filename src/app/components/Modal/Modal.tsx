import CloseIcon from '../../icons/CloseIcon.svg'
import style from './Modal.module.css';

type ModalProps = {
  show: boolean;
  close: () => void;
  title: string;
  children: any;
  onClick: any;
}

export default function Modal({ show, close, title, children, onClick }: ModalProps) {

  return <>
        <div className={`${style.modalContainer} ${show ? style.show : ""}`} onClick={() => close()}>
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
              <button className="submit" onClick={onClick}>
                Submit
              </button>
            </footer>
          </div>
        </div>
    </>;
};
