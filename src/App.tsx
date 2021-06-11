import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import "./App.css";

interface MotifProps {
  className?: string;
}

const parseMatrixValue = (matrixValue: string) =>
  matrixValue.indexOf("e") > 0 ? 0 : parseFloat(matrixValue);

const Pole = () => {
  const [matrix, setMatrix] = React.useState(new DOMMatrix().toString());

  const a = useSpring(1);
  const b = useSpring(0);
  const c = useSpring(0);
  const d = useSpring(1);
  const e = useSpring(0);
  const f = useSpring(0);

  React.useEffect(() => {
    const matrixValues = matrix
      .split(",")
      .map((x) =>
        parseMatrixValue(x.replace(/[matrix]/gi, "").replace(/([()])/g, ""))
      );
    console.log("matrixValues ", matrixValues);
    a.set(matrixValues[0]);
    b.set(matrixValues[1]);
    c.set(matrixValues[2]);
    d.set(matrixValues[3]);
    e.set(matrixValues[4]);
    f.set(matrixValues[5]);
  }, [matrix, a, b, c, d, e, f]);

  const onInteractionHandler = () => {
    // have to change it to string as react can't diff DOMMatrix
    setMatrix((domMatrix) => {
      return new DOMMatrix(domMatrix).toString();
    });
  };

  return (
    <motion.div
      className={"pole"}
      onClick={onInteractionHandler}
      style={{
        transform: useMotionTemplate`matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    />
  );
};

const Motif = ({ className }: MotifProps) => {
  return (
    <motion.div className={`container ${className}`}>
      <div className={"pole_wrapper"}>
        <Pole />
      </div>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="App">
      <div className={"motif_wrapper motif_wrapper__overlay"}>
        <Motif className={"green"} />
      </div>
    </div>
  );
};

export default App;
