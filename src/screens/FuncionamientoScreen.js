import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';

const pasos = [
  { num: '01', titulo: 'Detección de línea', desc: 'Los 3 sensores IR emiten luz infrarroja hacia el suelo. Cuando detectan la línea negra, la reflectividad cambia y generan una señal eléctrica diferente.' },
  { num: '02', titulo: 'Lectura de sensores', desc: 'El ESP32 lee continuamente los valores de los 5 sensores. Cada sensor retorna un valor digital (0 o 1) según si está sobre la línea o el fondo.' },
  { num: '03', titulo: 'Procesamiento', desc: 'El microcontrolador analiza el patrón de sensores para determinar la posición del carrito respecto a la línea y calcula la corrección necesaria.' },
  { num: '04', titulo: 'Control de motores', desc: 'Según el error calculado, el ESP32 envía señales al driver L298N para ajustar la velocidad de cada motor y girar hacia donde se necesite.' },
  { num: '05', titulo: 'Corrección continua', desc: 'Este ciclo se repite cientos de veces por segundo, manteniendo al carrito centrado sobre la línea aunque haya curvas o cambios de trayectoria.' },
];

export default function FuncionamientoScreen() {
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
          <Text style={styles.title}>Funcionamiento</Text>
          <Text style={styles.subtitle}>Flujo del sistema</Text>
        </Animated.View>

        {/* Diagrama visual simple */}
        <Animated.View style={[styles.diagrama, { opacity: fadeAnim }]}>
          {['Sensores IR', '→', 'ESP32', '→', 'L298N', '→', 'Motores'].map((item, i) => (
            <View key={i} style={item === '→' ? styles.arrow : styles.diagramaBox}>
              {item !== '→' ? (
                <Text style={styles.diagramaText}>{item}</Text>
              ) : (
                <Text style={styles.arrowText}>{item}</Text>
              )}
            </View>
          ))}
        </Animated.View>

        {/* Pasos */}
        {pasos.map((p, i) => (
          <Animated.View
            key={i}
            style={[styles.paso, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.pasoLeft}>
              <View style={styles.numCircle}>
                <Text style={styles.numText}>{p.num}</Text>
              </View>
              {i < pasos.length - 1 && <View style={styles.linea} />}
            </View>
            <View style={styles.pasoContent}>
              <Text style={styles.pasoTitulo}>{p.titulo}</Text>
              <Text style={styles.pasoDesc}>{p.desc}</Text>
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
  header: { alignItems: 'center', marginBottom: 24, paddingTop: 20 },
  trackDecoration: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: 100 },
  trackLine: { flex: 1, height: 2, backgroundColor: YELLOW },
  trackDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: YELLOW, marginHorizontal: 6 },
  title: { fontSize: 40, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  subtitle: { fontSize: 13, color: YELLOW, fontWeight: '600', letterSpacing: 2, marginTop: 4 },
  diagrama: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: CARD, borderRadius: 14, padding: 16,
    marginBottom: 28, borderWidth: 1, borderColor: BORDER, flexWrap: 'wrap', gap: 4,
  },
  diagramaBox: {
    backgroundColor: YELLOW + '20', borderWidth: 1, borderColor: YELLOW + '55',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6,
  },
  diagramaText: { color: YELLOW, fontSize: 11, fontWeight: '700' },
  arrow: { alignItems: 'center', justifyContent: 'center' },
  arrowText: { color: '#444', fontSize: 16, fontWeight: '700' },
  paso: { flexDirection: 'row', marginBottom: 4, gap: 16 },
  pasoLeft: { alignItems: 'center', width: 40 },
  numCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: YELLOW + '20', borderWidth: 2, borderColor: YELLOW,
    alignItems: 'center', justifyContent: 'center',
  },
  numText: { color: YELLOW, fontSize: 12, fontWeight: '900' },
  linea: { flex: 1, width: 2, backgroundColor: BORDER, marginTop: 4, marginBottom: 4, minHeight: 20 },
  pasoContent: { flex: 1, backgroundColor: CARD, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: BORDER },
  pasoTitulo: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 8 },
  pasoDesc: { color: '#888', fontSize: 13, lineHeight: 20 },
});
