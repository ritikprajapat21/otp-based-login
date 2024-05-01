/* eslint-disable react/prop-types */
import React from "react";
// eslint-disable-next-line react/display-name
const Input = React.forwardRef(function(
  { type, icon, placeholder, className, ...rest },
  ref,
) {
  return (
    <label className="relative text-gray-400 focus-within:text-gray-600 block">
      <img
        src={icon}
        className="h-6 w-6 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3"
      />
      <input
        ref={ref}
        type={type}
        autoComplete="off"
        {...rest}
        className={`mt-1 md:my-3 md:text-lg hover:shadow-md hover:shadow-indigo-400 block mx-auto w-full pl-11 px-3 py-2 bg-white border border-slate-300 placeholder:text-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none text-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${className}`}
        placeholder={placeholder}
      />
    </label>
  );
});

export default Input;
