import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css' 




const modalRoot = document.querySelector('#modal-root');


export function Modal({ children, onClose, bgColor }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); 

  
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };



    return createPortal(
      <div
        // className={css.overlay}
        className={
                    `
                      ${(bgColor === "HomePageBgColor")
                          ?
                          `${css.overlay} ${css.overlayHomePageBgColor}`
                          :
                          `${css.overlay} ${css.overlayDefaultBgColor}`
                      }
                      ${(bgColor === "CartPageBgColor")
                          ?
                          `${css.overlay} ${css.overlayCartPageBgColor}`
                          :
                          `${css.overlay} ${css.overlayDefaultBgColor}`
                      }
                    `
        }
        onClick={handleBackdropClick}
      >
          <div
          // className={css.modal}
          className={
                    `
                      ${(bgColor === "HomePageBgColor")
                          ?
                          `${css.modal} ${css.modalWide}`
                          :
                          `${css.modal}`
                      }
                    `
        }
        >
            
          {children}
        </div>
      </div>,
      modalRoot,
    );
  }


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

