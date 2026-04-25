import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';

const miembros = [
  { nombre: 'Gomez Aguirre Eli Gabriel', rol: 'Programación & App Móvil', icono: '💻', inicial: 'G' },
  { nombre: 'Gonzales de Leon Sebastian', rol: 'Electrónica & Sensores', icono: '📡', inicial: 'S' },
  { nombre: 'Navarro Silva Alessandro', rol: 'Diseño & Ensamble', icono: '🔧', inicial: 'A' },
  { nombre: 'Bustillo Aguirre Diego Alberto', rol: 'Programación Arduino', icono: '🖥️', inicial: 'D' },
];

export default function EquipoScreen() {
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
          <Text style={styles.title}>Equipo</Text>
          <Text style={styles.subtitle}>LineBot · 5°B BIS TI</Text>
        </Animated.View>

        {miembros.map((m, i) => (
          <Animated.View
            key={i}
            style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{m.inicial}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.nombre}>{m.nombre}</Text>
              <View style={styles.rolRow}>
                <Text style={styles.rolIcon}>{m.icono}</Text>
                <Text style={styles.rol}>{m.rol}</Text>
              </View>
            </View>
          </Animated.View>
        ))}

        <View style={styles.teamBadge}>
          <Text style={styles.teamBadgeText}>🏆 Equipo LineBot — 2026</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK },
  scroll: { padding: 24, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32, paddingTop: 20 },
  trackDecoration: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: 100 },
  trackLine: { flex: 1, height: 2, backgroundColor: YELLOW },
  trackDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: YELLOW, marginHorizontal: 6 },
  title: { fontSize: 40, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  subtitle: { fontSize: 13, color: YELLOW, fontWeight: '600', letterSpacing: 2, marginTop: 4 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: CARD,
    borderRadius: 16, padding: 18, marginBottom: 14,
    borderWidth: 1, borderColor: BORDER, gap: 16,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: YELLOW + '22', borderWidth: 2, borderColor: YELLOW + '66',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: YELLOW, fontSize: 22, fontWeight: '900' },
  info: { flex: 1 },
  nombre: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 6 },
  rolRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rolIcon: { fontSize: 14 },
  rol: { color: '#666', fontSize: 13 },
  teamBadge: {
    marginTop: 16, backgroundColor: YELLOW + '15', borderWidth: 1,
    borderColor: YELLOW + '44', borderRadius: 12, padding: 14, alignItems: 'center',
  },
  teamBadgeText: { color: YELLOW, fontWeight: '700', fontSize: 14 },
});
