import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';

const datos = [
  { label: 'Institución', valor: 'Universidad Tecnológica de Durango', icono: '🏫' },
  { label: 'Materia', valor: 'Desarrollo de Aplicaciones Móviles', icono: '📱' },
  { label: 'Docente', valor: 'Ing. Ana Laura Lara Chairez', icono: '👩‍🏫' },
  { label: 'Grupo', valor: '5°B BIS TI', icono: '🎓' },
  { label: 'Cuatrimestre', valor: '5° Cuatrimestre — 2026', icono: '📅' },
  { label: 'Fecha de entrega', valor: 'Viernes 24 de Abril, 2026', icono: '📆' },
];

const integrantes = [
  'Gomez Aguirre Eli Gabriel',
  'Gonzales de Leon Sebastian',
  'Navarro Silva Alessandro',
  'Bustillo Aguirre Diego Alberto',
];

export default function CreditosScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.trackDecoration}>
            <View style={styles.trackLine} /><View style={styles.trackDot} /><View style={styles.trackLine} />
          </View>
          <Animated.Text style={[styles.emoji, { transform: [{ scale: pulseAnim }] }]}>🏆</Animated.Text>
          <Text style={styles.title}>Créditos</Text>
          <Text style={styles.subtitle}>LineBot · Proyecto Final</Text>
        </Animated.View>

        {/* Datos del proyecto */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.cardHeader}>
            <View style={styles.accentBar} />
            <Text style={styles.cardTitle}>Información del Proyecto</Text>
          </View>
          {datos.map((d, i) => (
            <View key={i} style={[styles.fila, i < datos.length - 1 && styles.filaBorder]}>
              <Text style={styles.filaIcono}>{d.icono}</Text>
              <View style={styles.filaInfo}>
                <Text style={styles.filaLabel}>{d.label}</Text>
                <Text style={styles.filaValor}>{d.valor}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Integrantes */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.cardHeader}>
            <View style={styles.accentBar} />
            <Text style={styles.cardTitle}>Desarrollado por</Text>
          </View>
          {integrantes.map((nombre, i) => (
            <View key={i} style={styles.integrante}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{nombre.charAt(0)}</Text>
              </View>
              <Text style={styles.integranteNombre}>{nombre}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <Text style={styles.footerText}>Hecho con 💛 en React Native</Text>
          <Text style={styles.footerSub}>LineBot · UTD · 2026</Text>
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
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 40, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  subtitle: { fontSize: 13, color: YELLOW, fontWeight: '600', letterSpacing: 2, marginTop: 4 },
  card: {
    backgroundColor: CARD, borderRadius: 16, padding: 20,
    marginBottom: 16, borderWidth: 1, borderColor: BORDER,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  accentBar: { width: 3, height: 18, backgroundColor: YELLOW, borderRadius: 2 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  fila: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, gap: 12 },
  filaBorder: { borderBottomWidth: 1, borderBottomColor: BORDER },
  filaIcono: { fontSize: 18, width: 24, textAlign: 'center' },
  filaInfo: { flex: 1 },
  filaLabel: { color: '#555', fontSize: 11, fontWeight: '600', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  filaValor: { color: '#ddd', fontSize: 14, fontWeight: '500' },
  integrante: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: BORDER },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: YELLOW + '22', borderWidth: 1, borderColor: YELLOW + '55',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: YELLOW, fontWeight: '800', fontSize: 14 },
  integranteNombre: { color: '#ccc', fontSize: 14, fontWeight: '500', flex: 1 },
  footer: { alignItems: 'center', marginTop: 8 },
  footerText: { color: '#444', fontSize: 13, fontWeight: '600' },
  footerSub: { color: '#2a2a2a', fontSize: 11, marginTop: 4, letterSpacing: 2 },
});