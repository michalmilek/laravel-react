import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto w-full bg-gray-100 px-4 py-4">
            <p className="text-center text-sm text-gray-600">
                &copy; {currentYear} Michał Miłek. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
