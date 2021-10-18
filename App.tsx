import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView
} from 'react-native'
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated'


import { BACKGROUND_COLOR, PAGES } from './constants'

import { Page, PAGE_WIDTH } from './components/Page'
import { Dot } from './components/Dot'

export default function App() {
  const [lastSlide, setLastSlide] = useState(false);
  const translateX = useSharedValue(0)

  const updateSlide = (a: boolean) => {
    setLastSlide(a)
  }
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH)
  }, [translateX])


  useDerivedValue(() => activeIndex.value === PAGES.length -1 ? runOnJS(updateSlide)(true) : runOnJS(updateSlide)(false))

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    }
  })


  const scrollRef = useAnimatedRef<ScrollView>()

  const onNextPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) })
  }, [])


  return (
    <Animated.View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        ref={scrollRef as any}
      >
        {PAGES.map((page, index) => {
          return <Page key={index.toString()} page={page} />
        })}
      </Animated.ScrollView>
      <Animated.View style={styles.footer}>
        <View style={styles.dots}>
          {PAGES.map((_, index) => {
            return (
              <Dot
                index={index}
                activeIndex={activeIndex}
                key={index.toString()}
              />
            )
          })}
        </View>
        { lastSlide ?
         (
            <Animated.View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]} >
              <TouchableOpacity
                style={
                  {
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    borderRadius: 5,
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor: 'white'
                  }
                }
                onPress={onNextPress}
              >
                <Text style={[styles.text, { color: BACKGROUND_COLOR }]}>GET STARTED</Text>
              </TouchableOpacity>
             </Animated.View>
          ) : (
            <Animated.View style={[{ flexDirection: 'row', justifyContent: 'space-between'}]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>SKIP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'white' }]}
                onPress={onNextPress}
              >
                <Text style={[styles.text, { color: BACKGROUND_COLOR }]}>NEXT</Text>
              </TouchableOpacity>
            </Animated.View>
          )
      }
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },

  dots: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footer: {
    flex: 2,
    marginBottom: 30,
    paddingHorizontal: 30
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  btnActive: {
    backgroundColor: BACKGROUND_COLOR
  }
})
