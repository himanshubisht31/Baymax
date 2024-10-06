import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {circleRadius} from '../../utils/constants';

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${x} ${y}`,
    'Z',
  ].join(' ');

  return d;
};

type CircleSliceProps = {
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  borderColor: string;
  borderWidth: number;
};

const CircleSlice: React.FC<CircleSliceProps> = ({
  radius,
  startAngle,
  endAngle,
  color,
  borderColor,
  borderWidth,
}) => {
  const centerX = radius;
  const centerY = radius;
  const viewBoxSize = radius * 2;
  return (
    <Svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      height={radius * 2}
      width={radius * 2}>
      <Path
        d={describeArc(centerX, centerY, radius, startAngle, endAngle)}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    </Svg>
  );
};

const CircularSliceItem = ({
  currentRotationAngle,
  angleSegment,
  color,
}: {
  currentRotationAngle: number;
  angleSegment: number;
  color: string;
}) => {
  const startAngle = currentRotationAngle;
  const endAngle = startAngle + angleSegment;
  return (
    <View style={styles.container}>
      <CircleSlice
        radius={circleRadius / 2}
        startAngle={startAngle}
        endAngle={endAngle}
        color={color}
        borderColor="#fff"
        borderWidth={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {position: 'absolute', zIndex: -1},
});

export {CircularSliceItem};
