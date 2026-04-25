import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';

const aprendizajes = [
  'Integración de hardware y software en un sistema embebido real',
  'Programación del microcontrolador ESP32 con lógica de control',
  'Uso y calibración de sensores infrarrojos para detección de línea',
  'Trabajo colaborativo en un proyecto multidisciplinario',
  'Desarrollo de una aplicación móvil con React Native',
];

const dificultades = [
  'Calibración precisa de los 2 sensores en diferentes superficies',
  'Ajuste de la velocidad de los motores para curvas cerradas',
  'Interferencia de luz ambiental en la lectura de sensores',
];

const mejoras = [
  'Implementar Bluetooth para monitoreo en tiempo real desde la app',
  'Diseñar un chasis más ligero con impresión 3D',
];

export default function ConclusionesScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const Seccion = ({ icono, titulo, items, color }) => (
    <View style={[styles.seccion, { borderColor: color + '44' }]}>
      <View style={styles.seccionHeader}>
        <Text style={styles.seccionIcono}>{icono}</Text>
        <Text style={[styles.seccionTitulo, { color }]}>{titulo}</Text>
      </View>
      {items.map((item, i) => (
        <View key={i} style={styles.item}>
          <View style={[styles.bullet, { backgroundColor: color }]} />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.trackDecoration}>
            <View style={styles.trackLine} /><View style={styles.trackDot} /><View style={styles.trackLine} />
          </View>
          <Text style={styles.title}>Conclusiones</Text>
          <Text style={styles.subtitle}>Reflexión del equipo</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Seccion icono="🎓" titulo="Lo que aprendimos" items={aprendizajes} color={YELLOW} />
          <Seccion icono="⚠️" titulo="Dificultades" items={dificultades} color="#e74c3c" />
          <Seccion icono="🚀" titulo="Mejoras futuras" items={mejoras} color="#2ecc71" />
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
  seccion: {
    backgroundColor: CARD, borderRadius: 16, padding: 20,
    marginBottom: 16, borderWidth: 1,
  },
  seccionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  seccionIcono: { fontSize: 22 },
  seccionTitulo: { fontSize: 16, fontWeight: '800' },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  itemText: { flex: 1, color: '#888', fontSize: 13, lineHeight: 20 },
});
