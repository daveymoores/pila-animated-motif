import React from "react";
import { motion, useCycle, AnimateSharedLayout } from "framer-motion";
import "./App.css";

interface PoleProps {
  index: number;
  style: any;
  parentIndex: number;
}

const items = [0, 1, 2];
const colors = ["pink", "hotpink", "yellow"];

const animationSequences = [
  [
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
  ],
  [
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
  ],
  [
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 45, originY: 0.875, originX: 0 },
  ],
];

const Pole = ({ index, style, parentIndex }: PoleProps) => {
  const [animate, cycle] = useCycle(...animationSequences[index]);

  React.useEffect(() => {
    cycle(parentIndex);
  }, [parentIndex, cycle]);

  return (
    <motion.div
      className={"pole"}
      animate={animate}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      style={style}
    />
  );
};

const App = () => {
  const [parentIndex, setParentIndex] = React.useState(0);

  return (
    <div className="App">
      <motion.div
        className={"container"}
        onTap={() =>
          setParentIndex((index) =>
            index + 1 > animationSequences[0].length - 1 ? 0 : index + 1
          )
        }
      >
        <AnimateSharedLayout>
          {items.map((item) => (
            <Pole
              style={{ backgroundColor: colors[item] }}
              key={item}
              parentIndex={parentIndex}
              index={item}
            />
          ))}
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
};

export default App;
