import PropTypes from "prop-types";

function Button({ variant = "primary", children, ...props }) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "danger", "success", "default"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
