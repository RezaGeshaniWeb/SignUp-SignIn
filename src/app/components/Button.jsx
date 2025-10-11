export default function Button({ content, style, clickFn }) {
  const baseButtonClasses =
    "px-4 py-2 cursor-pointer font-semibold text-sm rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 w-full";
  const primaryButtonClasses = `${baseButtonClasses} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
  const secondaryButtonClasses = `${baseButtonClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300`;

  return <button onClick={clickFn} className={style === 'primary' ? primaryButtonClasses : secondaryButtonClasses}>{content}</button>;
}
