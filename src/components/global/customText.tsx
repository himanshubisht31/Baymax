import React from 'react';
import {NativeUIEvent, StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../utils/constants';

type variants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'body';

type CustomTextProps = {
  variant?: variants;
  fontFamily?: FONTS;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
};

const FONT_SIZE_MAPPING: {[key in variants]: number} = {
  h1: 20,
  h2: 18,
  h3: 16,
  h4: 14,
  h5: 12,
  h6: 11,
  h7: 10,
  h8: 9,
  body: 24,
};

const CustomText: React.FC<CustomTextProps> = ({
  variant = 'body',
  fontFamily = FONTS.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  const computedFontSize = RFValue(FONT_SIZE_MAPPING[variant]);
  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {
          color: COLORS.text,
          fontSize: computedFontSize,
          fontFamily,
        },
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

export default CustomText;
