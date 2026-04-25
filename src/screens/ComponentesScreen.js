import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';
const { width } = Dimensions.get('window');

const componentes = [
  { icono: '🖥️', nombre: 'ESP32', funcion: 'Microcontrolador principal que procesa la lógica del carrito' },
  { icono: '📡', nombre: 'Sensores', funcion: 'Detectan el contraste entre la línea negra y el fondo blanco' },
  { icono: '⚙️', nombre: 'Motores x2', funcion: 'Propulsan las ruedas del carrito, controlados por el driver' },
  { icono: '🔋', nombre: 'Batería 1.5V X4', funcion: 'Fuente de alimentación del sistema completo' },
  { icono: '🛞', nombre: 'Ruedas x2', funcion: 'Proporcionan tracción y estabilidad al desplazarse' },
  { icono: '🏗️', nombre: 'Chasis', funcion: 'Estructura física que soporta todos los componentes' },
  { icono: '🔗', nombre: 'Jumper', funcion: 'Conexiones eléctricas entre los módulos del sistema' },
];

export default function ComponentesScreen() {
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
          <Text style={styles.title}>Componentes</Text>
          <Text style={styles.subtitle}>{componentes.length} elementos del sistema</Text>
        </Animated.View>

        {componentes.map((c, i) => (
          <Animated.View
            key={i}
            style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icono}>{c.icono}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.nombre}>{c.nombre}</Text>
              <Text style={styles.funcion}>{c.funcion}</Text>
            </View>
            <View style={styles.numBadge}>
              <Text style={styles.numText}>{String(i + 1).padStart(2, '0')}</Text>
            </View>
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
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: CARD, borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: BORDER, gap: 14,
  },
  iconBox: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: YELLOW + '15', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: YELLOW + '33',
  },
  icono: { fontSize: 22 },
  info: { flex: 1 },
  nombre: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  funcion: { color: '#666', fontSize: 12, lineHeight: 18 },
  numBadge: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#1a1a1a', borderRadius: 6 },
  numText: { color: YELLOW, fontSize: 11, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
