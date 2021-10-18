import React from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { PageInterface } from '../constants'

export const { width: PAGE_WIDTH, height: PAGE_HEIGHT } =
  Dimensions.get('window')

interface PageProps {
  page: PageInterface
}

export const Page = ({ page }: PageProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={page.source} />
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.subtitle}>{page.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '70%',
    width: PAGE_WIDTH,
    paddingHorizontal: 20,
    marginTop: 30
  },
  image: {
    width: PAGE_WIDTH * 0.9,
    height: PAGE_HEIGHT * 0.6,
    resizeMode: 'contain',
    marginTop: -50
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 40
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 22
  }
})
