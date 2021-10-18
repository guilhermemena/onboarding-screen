import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated'

interface DotProps {
  activeIndex: Animated.SharedValue<number>
  index: number
}

export const Dot = ({ activeIndex, index }: DotProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [10, 30, 10],
          Extrapolate.CLAMP
        )
      ),
      opacity: withTiming(
        interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.5, 1, 0.5],
          Extrapolate.CLAMP
        )
      )
    }
  })

  return <Animated.View style={[styles.dot, rStyle]} />
}

const styles = StyleSheet.create({
  dot: {
    height: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5
  }
})
