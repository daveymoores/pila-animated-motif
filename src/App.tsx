import React, { SyntheticEvent } from "react";
import { motion } from "framer-motion";
import "./App.css";
import animationSequences from "./animation-sequences/square/square";
import { Pole1, Pole2, Pole3 } from "./pole";
import getRandomInt from "./helpers/getRandomInt";
import forwardTriangleSequence from "./animation-sequences/triangle/forward";
import reverseTriangleSequence from "./animation-sequences/triangle/reverse";
import squareSequence from "./animation-sequences/square/square";

const sequences = [
  squareSequence,
  forwardTriangleSequence,
  reverseTriangleSequence,
];

interface MotifProps {
  className?: string;
}

const items = [0, 1];

const Square = ({ className }: MotifProps) => {
  const sequenceLength = animationSequences.sequence1[0].length;
  const [parentIndex, setParentIndex] = React.useState(getRandomInt(0));
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [mouseEvent, setMouseEvent] = React.useState<SyntheticEvent["type"]>();
  const [sequenceInt, setSequenceInt] = React.useState<any>(sequences[0]);
  const [sequence, setSequence] = React.useState<any>(sequences[0]);

  React.useEffect(() => {
    if (!parentIndex) {
      const randomInt = getRandomInt(3);
      setSequenceInt(randomInt);
      setSequence(sequences[randomInt]);
    }
  }, [parentIndex]);

  const onInteractionHandler = React.useCallback(
    (event: SyntheticEvent) => {
      setMouseEvent(event.type);
      setIsAnimating(!isAnimating);
    },
    [isAnimating]
  );

  React.useEffect(() => {
    let timerId: NodeJS.Timeout | undefined = undefined;
    if (isAnimating) {
      if (mouseEvent === "mouseenter") {
        setParentIndex((index) =>
          index + 1 > sequenceLength - 1 ? 0 : index + 1
        );
      }
      timerId = setInterval(
        () =>
          setParentIndex((index) =>
            index + 1 > sequenceLength - 1 ? 0 : index + 1
          ),
        400
      );
    } else {
      clearInterval(timerId);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isAnimating, sequenceLength, mouseEvent]);

  return (
    <motion.div
      className={`container ${className}`}
      onMouseEnter={onInteractionHandler}
      onMouseLeave={onInteractionHandler}
    >
      <div className={"pole_wrapper"}>
        {items.map((item) => (
          <Pole1
            key={item}
            sequence={sequence}
            parentIndex={parentIndex}
            index={item}
          />
        ))}
        {!sequenceInt && (
          <Pole2 sequence={sequence} parentIndex={parentIndex} index={0} />
        )}
        {!sequenceInt && (
          <Pole3 sequence={sequence} parentIndex={parentIndex} index={0} />
        )}
      </div>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="App">
      <div className={"motif_wrapper motif_wrapper__overlay"}>
        {[...Array(9)].map(() => {
          return <Square className={"green"} />;
        })}
      </div>
      <div className={"motif_wrapper"}>
        {[...Array(80)].map(() => {
          return <Square />;
        })}
      </div>
    </div>
  );
};

export default App;
