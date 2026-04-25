import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';
const { width } = Dimensions.get('window');

const fotos = [
  { id: 1, titulo: 'Vista superior', source: require('../../assets/1.jpeg') },
  { id: 2, titulo: 'Vista inferior', source: require('../../assets/2.jpeg') },
  { id: 3, titulo: 'Vista  Lateral', source: require('../../assets/3.jpeg') },
  { id: 4, titulo: 'Equipo Armado', source: require('../../assets/4.jpeg') },
  { id: 5, titulo: 'Prueba en pista', source: require('../../assets/video.mp4'), isVideo: true },
  { id: 6, titulo: 'Chasis', source: require('../../assets/6.jpeg') },
];

export default function GaleriaScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const CARD_W = (width - 48 - 12) / 2;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.trackDecoration}>
            <View style={styles.trackLine} /><View style={styles.trackDot} /><View style={styles.trackLine} />
          </View>
          <Text style={styles.title}>Galería</Text>
          <Text style={styles.subtitle}>Evidencia del proyecto</Text>
        </Animated.View>

        <Animated.View style={[styles.grid, { opacity: fadeAnim }]}>
          {fotos.map((foto) => (
            <View key={foto.id} style={[styles.fotoCard, { width: CARD_W }]}>
              {foto.isVideo ? (
                <Video
                  source={foto.source}
                  style={styles.foto}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <Image source={foto.source} style={styles.foto} />
              )}
              <Text style={styles.fotoTitulo}>{foto.titulo}</Text>
            </View>
          ))}
        </Animated.View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK },
  scroll: { padding: 24, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 28, paddingTop: 20 },
  trackDecoration: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: 100 },
  trackLine: { flex: 1, height: 2, backgroundColor: YELLOW },
  trackDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: YELLOW, marginHorizontal: 6 },
  title: { fontSize: 40, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  subtitle: { fontSize: 13, color: YELLOW, fontWeight: '600', letterSpacing: 2, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  fotoCard: {
    backgroundColor: CARD, borderRadius: 12,
    overflow: 'hidden', borderWidth: 1, borderColor: BORDER,
  },
  foto: { width: '100%', height: 120 },
  placeholder: {
    height: 120, alignItems: 'center', justifyContent: 'center', gap: 4,
    backgroundColor: '#0f0f18',
  },
  placeholderIcon: { fontSize: 28 },
  placeholderHint: { color: '#333', fontSize: 10 },
  fotoTitulo: { color: '#888', fontSize: 11, fontWeight: '600', padding: 8, textAlign: 'center' },
  infoCard: {
    backgroundColor: CARD, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: YELLOW + '33',
  },
  infoTitle: { color: YELLOW, fontSize: 14, fontWeight: '700', marginBottom: 8 },
  infoText: { color: '#666', fontSize: 12, lineHeight: 20 },
  code: { color: YELLOW, fontFamily: 'monospace' },
});
