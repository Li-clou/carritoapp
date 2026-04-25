import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated,
  TouchableOpacity, StatusBar, Dimensions, Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const cardAnim = useRef(new Animated.Value(60)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
    Animated.timing(cardAnim, { toValue: 0, duration: 700, delay: 300, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const specs = [
    { label: 'Sensores IR', value: '5 canales', icon: '📡' },
    { label: 'Microcontrolador', value: 'ESP32', icon: '🖥️' },
    { label: 'Motores', value: '2x DC', icon: '⚙️' },
    { label: 'Velocidad', value: 'Variable', icon: '🏎️' },
    { label: 'Alimentación', value: '1.5V', icon: '🔋' },
    { label: 'Driver', value: 'L298N', icon: '🔌' },
  ];

  const secciones = [
    { icono: '👥', label: 'Equipo', screen: 'Equipo' },
    { icono: '📄', label: 'Descripción', screen: 'Descripcion' },
    { icono: '🔩', label: 'Componentes', screen: 'Componentes' },
    { icono: '⚙️', label: 'Funcionamiento', screen: 'Funcionamiento' },
    { icono: '📷', label: 'Galería', screen: 'Galeria' },
    { icono: '💡', label: 'Conclusiones', screen: 'Conclusiones' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.trackDecoration}>
            <View style={styles.trackLine} /><View style={styles.trackDot} /><View style={styles.trackLine} />
          </View>
          <View style={styles.badge}>
            <Animated.View style={[styles.badgeDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.badgeText}>PROYECTO CUATRIMESTRAL</Text>
          </View>
          <Text style={styles.title}>LineBot</Text>
          <Text style={styles.titleSub}>(rayo mcqueen)</Text>
          <Text style={styles.subtitle}>Carrito Seguidor de Línea</Text>
        </Animated.View>

        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.imageFrame}>
            <Image source={require('../../assets/4.jpeg')} style={styles.cartImage} />
            <View style={styles.imageCornerTL} /><View style={styles.imageCornerTR} />
            <View style={styles.imageCornerBL} /><View style={styles.imageCornerBR} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.seccionesSection, { opacity: fadeAnim, transform: [{ translateY: cardAnim }] }]}>
          <View style={styles.cardHeader}>
            <View style={styles.accentBar} />
            <Text style={styles.cardTitle}>Secciones</Text>
          </View>
          <View style={styles.seccionesGrid}>
            {secciones.map((s) => (
              <TouchableOpacity key={s.screen} style={styles.seccionCard} onPress={() => navigation.navigate(s.screen)} activeOpacity={0.7}>
                <Text style={styles.seccionIcono}>{s.icono}</Text>
                <Text style={styles.seccionLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

      </ScrollView>
    </View>
  );
};

const YELLOW = '#F5C518';
const DARK = '#0a0a0f';
const CARD = '#12121a';
const BORDER = '#1e1e2e';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK },
  scroll: { paddingBottom: 40 },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 30, paddingHorizontal: 24 },
  trackDecoration: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: 120 },
  trackLine: { flex: 1, height: 2, backgroundColor: YELLOW },
  trackDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: YELLOW, marginHorizontal: 6 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a10', borderWidth: 1, borderColor: YELLOW + '44', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 16, gap: 6 },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: YELLOW },
  badgeText: { color: YELLOW, fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  title: { fontSize: 52, fontWeight: '900', color: '#ffffff', letterSpacing: -2, marginBottom: 2 },
  titleSub: { fontSize: 14, color: '#555', fontStyle: 'italic', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#888', fontWeight: '400', marginBottom: 6 },
  imageContainer: { paddingHorizontal: 24, marginBottom: 24 },
  imageFrame: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: BORDER, position: 'relative' },
  imagePlaceholder: { height: 200, backgroundColor: CARD, alignItems: 'center', justifyContent: 'center', gap: 8 },
  placeholderIcon: { fontSize: 48 },
  placeholderText: { color: '#555', fontSize: 14, fontWeight: '600' },
  cartImage: { width: '100%', height: 200, resizeMode: 'cover' },
  imageCornerTL: { position: 'absolute', top: 10, left: 10, width: 18, height: 18, borderTopWidth: 2, borderLeftWidth: 2, borderColor: YELLOW, borderRadius: 2 },
  imageCornerTR: { position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderTopWidth: 2, borderRightWidth: 2, borderColor: YELLOW, borderRadius: 2 },
  imageCornerBL: { position: 'absolute', bottom: 10, left: 10, width: 18, height: 18, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: YELLOW, borderRadius: 2 },
  imageCornerBR: { position: 'absolute', bottom: 10, right: 10, width: 18, height: 18, borderBottomWidth: 2, borderRightWidth: 2, borderColor: YELLOW, borderRadius: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 10 },
  accentBar: { width: 3, height: 18, backgroundColor: YELLOW, borderRadius: 2 },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  seccionesSection: { marginHorizontal: 24, marginBottom: 24 },
  seccionesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  seccionCard: { width: (width - 48 - 20) / 3, backgroundColor: CARD, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: BORDER, gap: 6 },
  seccionIcono: { fontSize: 24 },
  seccionLabel: { color: '#ccc', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  specsSection: { marginHorizontal: 24, marginBottom: 24 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  specCard: { width: (width - 48 - 20) / 3, backgroundColor: CARD, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: BORDER, gap: 4 },
  specIcon: { fontSize: 22, marginBottom: 2 },
  specValue: { color: '#fff', fontSize: 11, fontWeight: '700', textAlign: 'center' },
  specLabel: { color: '#555', fontSize: 10, textAlign: 'center' },
  btnWrapper: { paddingHorizontal: 24, marginBottom: 24 },
  btn: { backgroundColor: YELLOW, borderRadius: 14, overflow: 'hidden' },
  btnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 8 },
  btnText: { color: '#000', fontSize: 15, fontWeight: '800', letterSpacing: 0.5 },
  btnArrow: { color: '#000', fontSize: 18, fontWeight: '700' },
  footer: { alignItems: 'center', paddingBottom: 10 },
  footerText: { color: '#2a2a2a', fontSize: 12, letterSpacing: 2 },
});

export default HomeScreen;
