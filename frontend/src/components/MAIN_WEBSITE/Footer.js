import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white p-4 w-full relative  bottom-0">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Quill Quotient. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;