import React from "react";
import { motion, useCycle } from "framer-motion";
import "./App.css";

interface PoleProps {
  index: number;
  style?: any;
  parentIndex: number;
}

interface MotifProps {
  className?: string;
}

const items = [0, 1];

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
        className={"pole pole3"}
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
        className={"pole pole2"}
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

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Motif = ({ className }: MotifProps) => {
  const sequenceLength = animationSequences[0].length;

  const [parentIndex, setParentIndex] = React.useState(getRandomInt(0));

  const onInteractionHandler = React.useCallback(
    () =>
      setParentIndex((index) =>
        index + 1 > sequenceLength - 1 ? 0 : index + 1
      ),
    []
  );

  return (
    <motion.div
      className={`container ${className}`}
      onMouseEnter={onInteractionHandler}
    >
      <div className={"pole_wrapper"}>
        {items.map((item) => (
          <Pole key={item} parentIndex={parentIndex} index={item} />
        ))}
        <Pole2 parentIndex={parentIndex} index={0} />
        <Pole3 parentIndex={parentIndex} index={0} />
      </div>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="App">
      <div className={"motif_wrapper motif_wrapper__overlay"}>
        {[...Array(9)].map(() => {
          return <Motif className={"green"} />;
        })}
      </div>
      <div className={"motif_wrapper"}>
        {[...Array(80)].map(() => {
          return <Motif />;
        })}
      </div>
    </div>
  );
};

export default App;
