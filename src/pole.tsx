import { motion, useCycle } from "framer-motion";
import React from "react";

interface PoleProps {
  index: number;
  style?: any;
  parentIndex: number;
  sequence: any;
}

const Pole3 = ({ index, parentIndex, sequence }: PoleProps) => {
  const [animate, cycle] = useCycle(...sequence.sequence3[index]);

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

const Pole2 = ({ index, parentIndex, style, sequence }: PoleProps) => {
  const [animate, cycle] = useCycle(...sequence.sequence2[index]);

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

const Pole1 = ({ index, parentIndex, sequence }: PoleProps) => {
  const [animate, cycle] = useCycle(...sequence.sequence1[index]);

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

export { Pole1, Pole2, Pole3 };
