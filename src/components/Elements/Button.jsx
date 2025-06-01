import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-gradient-to-tr from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg",
  danger:
    "bg-gradient-to-tr from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white hover:-translate-y-0.5 hover:shadow-lg",
  success:
    "bg-gradient-to-tr from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white hover:-translate-y-0.5 hover:shadow-lg",
  default:
    "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:-translate-y-0.5",
};

function Button({ variant = "primary", children, className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 outline-none select-none cursor-pointer focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "danger", "success", "default"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
