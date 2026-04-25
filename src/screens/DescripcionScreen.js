import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';

const secciones = [
  {
    icono: '🤖',
    titulo: '¿Qué es?',
    texto: 'El LineBot es un vehículo autónomo capaz de seguir una trayectoria marcada por una línea oscura sobre una superficie clara, sin intervención humana.',
  },
  {
    icono: '🎯',
    titulo: 'Objetivo General',
    texto: 'Diseñar y construir un carrito seguidor de línea funcional que integre sensores infrarrojos, un microcontrolador ESP32 y motores DC para desplazarse de forma autónoma.',
  },
  {
    icono: '💡',
    titulo: '¿Qué problema resuelve?',
    texto: 'Demuestra los principios de la automatización y robótica básica, aplicando conceptos de electrónica, programación y sistemas de control en un prototipo físico.',
  },
  {
    icono: '⚙️',
    titulo: 'Funcionamiento General',
    texto: 'Los sensores IR detectan el contraste entre la línea y el fondo. El microcontrolador procesa la señal y ajusta la velocidad de cada motor para mantener el carrito sobre la trayectoria.',
  },
];

export default function DescripcionScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.trackDecoration}>
            <View style={styles.trackLine} /><View style={styles.trackDot} /><View style={styles.trackLine} />
          </View>
          <Text style={styles.title}>Descripción</Text>
          <Text style={styles.subtitle}>Carrito Seguidor de Línea</Text>
        </Animated.View>

        {secciones.map((s, i) => (
          <Animated.View
            key={i}
            style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardIcono}>{s.icono}</Text>
              <Text style={styles.cardTitulo}>{s.titulo}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.cardTexto}>{s.texto}</Text>
          </Animated.View>
        ))}
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
  card: {
    backgroundColor: CARD, borderRadius: 16, padding: 20,
    marginBottom: 16, borderWidth: 1, borderColor: BORDER,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  cardIcono: { fontSize: 24 },
  cardTitulo: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: BORDER, marginBottom: 12 },
  cardTexto: { color: '#999', fontSize: 14, lineHeight: 22 },
});
