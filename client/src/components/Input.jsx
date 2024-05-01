/* eslint-disable react/prop-types */
import React from "react";
// eslint-disable-next-line react/display-name
const Input = React.forwardRef(function(
  { type, placeholder, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      autoComplete="off"
      {...rest}
      className={`mt-1 md:my-3 md:text-lg hover:shadow-md hover:shadow-indigo-400 block mx-auto w-auto px-3 py-2 bg-white border border-slate-300 placeholder:text-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none text-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${className}`}
      placeholder={placeholder}
    />
  );
});

export default Input;
