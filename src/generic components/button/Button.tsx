import React, { forwardRef } from 'react';
// @ts-ignore
import classes from './button.module.css';


interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, ...props }, ref) => {

        return (
            <button ref={ref} className={`${classes.button} ${className}`} {...props}>
                {children}
            </button>
        );
    }
);

export default Button;