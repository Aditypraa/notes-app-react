import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

function Input({ name, type, value, onChange, className, ...rest }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    const isTitle = name === "title";

    if (!isTitle || newValue.length <= 50) {
      onChange(newValue);
    }
  };

  const inputProps = {
    value,
    spellCheck: false,
    onChange: handleChange,
    ...rest,
  };

  const baseClass =
    "block w-full my-3 px-4 py-4 font-sans bg-white text-slate-900 border-2 border-slate-200 rounded-md shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 placeholder:font-normal";

  const textAreaClass = "min-h-[200px] resize-y text-sm font-normal";
  const inputClass = "text-base font-semibold";

  const combinedClass = cn(
    baseClass,
    type === "textarea" ? textAreaClass : inputClass,
    className
  );

  const Component = type === "textarea" ? "textarea" : "input";

  return <Component {...inputProps} className={combinedClass} />;
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "textarea", "search"]).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Input;
