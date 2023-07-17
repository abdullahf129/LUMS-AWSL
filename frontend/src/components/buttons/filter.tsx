interface FilterOptions {
    options: string[]
    onClick: (option: string) => void
    handleSearch: (e: any) => void
}



import { useState } from 'react';

function FilterComponent({ options =['1st','2nd'], onClick=()=>{}, handleSearch }: FilterOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option :any) => {
    onClick(option);
    setIsOpen(false);
  };

  return (
    <div className='z-10'>

      
      <div className='flex justify-center'>
        <div className="flex flex-row max-w-sm px-2 justify-center pb-5 bg-white rounded-full">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none"
          onChange={handleSearch}
        />
        <div className='relative'>
            <button className="ml-2 px-2 py-2 text-white bg-gray rounded-full hover:bg-black focus:outline-none relative" onClick={handleButtonClick}>
              <svg width="24" height="24" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.9062 8C22.9062 8.37296 22.7581 8.73065 22.4944 8.99437C22.2306 9.25809 21.873 9.40625 21.5 9.40625H6.5C6.12704 9.40625 5.76935 9.25809 5.50563 8.99437C5.24191 8.73065 5.09375 8.37296 5.09375 8C5.09375 7.62704 5.24191 7.26935 5.50563 7.00563C5.76935 6.74191 6.12704 6.59375 6.5 6.59375H21.5C21.873 6.59375 22.2306 6.74191 22.4944 7.00563C22.7581 7.26935 22.9062 7.62704 22.9062 8ZM26.1875 0.96875H1.8125C1.43954 0.96875 1.08185 1.11691 0.818131 1.38063C0.554408 1.64435 0.40625 2.00204 0.40625 2.375C0.40625 2.74796 0.554408 3.10565 0.818131 3.36937C1.08185 3.63309 1.43954 3.78125 1.8125 3.78125H26.1875C26.5605 3.78125 26.9181 3.63309 27.1819 3.36937C27.4456 3.10565 27.5938 2.74796 27.5938 2.375C27.5938 2.00204 27.4456 1.64435 27.1819 1.38063C26.9181 1.11691 26.5605 0.96875 26.1875 0.96875ZM16.8125 12.2188H11.1875C10.8145 12.2188 10.4569 12.3669 10.1931 12.6306C9.92941 12.8944 9.78125 13.252 9.78125 13.625C9.78125 13.998 9.92941 14.3556 10.1931 14.6194C10.4569 14.8831 10.8145 15.0312 11.1875 15.0312H16.8125C17.1855 15.0312 17.5431 14.8831 17.8069 14.6194C18.0706 14.3556 18.2188 13.998 18.2188 13.625C18.2188 13.252 18.0706 12.8944 17.8069 12.6306C17.5431 12.3669 17.1855 12.2188 16.8125 12.2188Z" fill="black"/>
                </svg>
            </button>
          {isOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-20" style={{ top: 'calc(100% + 0.5rem)' }}>
              {options.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
        
          )}
        </div>
        
      </div>
    </div>
        
  </div>
  );
}

export default FilterComponent;
