// eslint-disable-next-line react/prop-types
const Button = function({ title, children, type, className, onClick }) {
  return (
    <button
      className={`bg-gray-800 hover:bg-gray-900 hover:shadow-md hover:shadow-indigo-400 block mx-auto text-white font-bold py-2 px-4 border border-blue-700 rounded ${className}`}
      type={type || "submit"}
      onClick={onClick}
    >
      {title || null}
      {children || null}
    </button>
  );
};

export default Button;
