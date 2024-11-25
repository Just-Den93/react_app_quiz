import React from 'react';

interface BurgerButtonProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpen, toggleMenu }) => {
    return (
        <button
            className={`hamburger hamburger--collapse ${isOpen ? 'is-active' : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    );
};

export default BurgerButton;
