import React from "react";
import {
  motion,
  useCycle,
  AnimateSharedLayout,
  useMotionValue,
} from "framer-motion";
import "./App.css";

interface PoleProps {
  index: number;
  style?: any;
  parentIndex: number;
}

const COLOR_MODE = false;

const items = [0, 1];
const colors = COLOR_MODE
  ? ["pink", "hotpink", "blue", "orange"]
  : ["white", "white", "white", "white"];

const animationSequences = [
  [
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
    { rotate: 90, originY: 0.125, originX: 0.5 },
  ],
  [
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
    { rotate: 180, originY: 0.125, originX: 0.5 },
  ],
];

const animationSequences2 = [
  [
    { rotate: 0, originY: 0.5, originX: 0.125 },
    { rotate: 0, originY: 0.5, originX: 0.125 },
    { rotate: 90, originY: 0.5, originX: 0.125 },
    { rotate: -90, originY: 0.5, originX: 0.125 },
    { rotate: -90, originY: 0.5, originX: 0.125 },
    { rotate: -90, originY: 0.5, originX: 0.125 },
    { rotate: 0, originY: 0.5, originX: 0.125 },
  ],
];

const animationSequences3 = [
  [
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: -90, originY: 0.125, originX: 0.5 },
    { rotate: 0, originY: 0.125, originX: 0.5 },
    { rotate: 0, originY: 0.125, originX: 0.5 },
  ],
];

const Pole3 = ({ index, parentIndex }: PoleProps) => {
  const [animate, cycle] = useCycle(...animationSequences3[index]);

  React.useEffect(() => {
    cycle(parentIndex);
  }, [parentIndex, cycle]);

  return (
    <div
      className={"pole3-container"}
      style={{ opacity: parentIndex >= 4 && parentIndex <= 5 ? 1 : 0 }}
    >
      <motion.div
        className={"pole3"}
        animate={animate}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const Pole2 = ({ index, parentIndex, style }: PoleProps) => {
  const [animate, cycle] = useCycle(...animationSequences2[index]);

  React.useEffect(() => {
    cycle(parentIndex);
  }, [parentIndex, cycle]);

  return (
    <div
      className={"pole2-container"}
      style={{ opacity: parentIndex >= 2 ? 1 : 0 }}
    >
      <motion.div
        className={"pole2"}
        animate={animate}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        style={style}
      />
    </div>
  );
};

const Pole = ({ index, parentIndex }: PoleProps) => {
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
    />
  );
};

const App = () => {
  const x = useMotionValue(0);
  const [parentIndex, setParentIndex] = React.useState(0);

  const onInteractionHandler = React.useCallback(
    () =>
      setParentIndex((index) =>
        index + 1 > animationSequences[0].length - 1 ? 0 : index + 1
      ),
    []
  );

  const velocity = x.getVelocity();
  console.log(velocity);
  return (
    <div className="App">
      <motion.div
        className={"container"}
        onMouseEnter={onInteractionHandler}
        onMouseLeave={onInteractionHandler}
      >
        <AnimateSharedLayout>
          {items.map((item) => (
            <Pole key={item} parentIndex={parentIndex} index={item} />
          ))}
          <Pole2 style={x} parentIndex={parentIndex} index={0} />
          <Pole3 parentIndex={parentIndex} index={0} />
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
};

export default App;
