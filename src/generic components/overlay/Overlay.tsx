import React, { useEffect, useState } from 'react';

// @ts-ignore
import classes from './overlay.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface OverlayProps {
    children?: React.ReactNode;
    header?: React.ReactNode;
    open: boolean;
    onClose?: () => void;
    position?: 'right' | 'left';
}




const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
    ({ children, header, open, onClose, position, ...props }, ref) => {
        const [display, setDisplay] = useState("none");
        useEffect(() => {
            let timeout: NodeJS.Timeout;
            if (open === true)
                setDisplay("block");
            else {
                timeout = setTimeout(() => {
                    setDisplay("none");
                    clearTimeout(timeout);
                }, 1000)
                return () => clearTimeout(timeout);
            }
        }, [open])

        return (
            <div id="overlayFull" style={{ "display": display }} className={`${classes.full} ${position === 'left' ? classes.leftModal : classes.rightModal}
                                                  ${open || classes.hidden}`}>
                <aside {...props} ref={ref}
                    className={`${classes.overlay}
                    ${position || classes.right} ${position === 'right' && classes.right} ${position === 'left' && classes.left}`}
                >
                    <header className={classes.header}>
                        {header}
                        <button onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </header>
                    <div className={classes.body}>
                        {children}
                    </div>
                </aside>
            </div>
        );
    });


export default Overlay;
