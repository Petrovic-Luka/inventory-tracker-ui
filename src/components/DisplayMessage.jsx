import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import style from "./DisplayMessage.module.css";

const DisplayMessage = ({ open, onClose, text }) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          open = false;
          onClose();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  //if (!open) return null;
  function mobileWidth() {
    if (window.innerWidth < 600) {
      return true;
    }
    return false;
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={style.rd_radionicaModal}
          transition={{ ease: "easeIn", duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={style.rd_radionicaModalcontainer}
            id={style.pr_odgovor_id}
            ref={wrapperRef}
          >
            <div className={style.pr_obavestenje_container} onClick={onClose}>
              <div className={style.pr_obavestenje}>{text}</div>
              <div className={style.pr_obavestenje}>OK</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisplayMessage;
