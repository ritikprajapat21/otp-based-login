// eslint-disable-next-line react/prop-types
function Card({ children, className }) {
  return (
    <div
      className={`py-10 md:m-0 border border-slate-400 p-4 md:p-9 rounded-md hover:shadow-lg focus-within:shadow-lg hover:shadow-indigo-500 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
