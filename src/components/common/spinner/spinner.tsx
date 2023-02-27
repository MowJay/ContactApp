import { SpinnerSize } from "../../../constants/enums";

const Spinner = ({ size = SpinnerSize.Medium }) => {
  return <span className={`spinner-${size}`} />;
};

export default Spinner;
