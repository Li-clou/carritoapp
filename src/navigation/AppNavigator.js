import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import EquipoScreen from "../screens/EquipoScreen";
import DescripcionScreen from "../screens/DescripcionScreen";
import ComponentesScreen from "../screens/ComponentesScreen";
import FuncionamientoScreen from "../screens/FuncionamientoScreen";
import GaleriaScreen from "../screens/GaleriaScreen";
import ConclusionesScreen from "../screens/ConclusionesScreen";
import CreditosScreen from "../screens/CreditosScreen";

const Tab = createBottomTabNavigator();

const YELLOW = '#F5C518';
const CARD = '#12121a';

const headerOpts = {
  headerStyle: { backgroundColor: CARD },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' },
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Inicio:         'home',
              Equipo:         'people',
              Descripción:    'document-text',
              Materiales:     'construct',
              Funcionamiento: 'settings',
              Galería:        'images',
              Conclusiones:   'bulb',
              Créditos:       'ribbon',
            };
            return <Ionicons name={icons[route.name] || 'ellipse'} size={size} color={color} />;
          },
          tabBarActiveTintColor: YELLOW,
          tabBarInactiveTintColor: '#444',
          tabBarStyle: {
            backgroundColor: CARD,
            borderTopColor: '#1e1e2e',
            borderTopWidth: 1,
            paddingBottom: 4,
            height: 56,
          },
          tabBarLabelStyle: { fontSize: 9, fontWeight: '600' },
          headerShown: true,
          ...headerOpts,
        })}
      >
        <Tab.Screen name="Inicio"         component={HomeScreen}         options={{ headerShown: false }} />
        <Tab.Screen name="Equipo"         component={EquipoScreen} />
        <Tab.Screen name="Descripción"    component={DescripcionScreen} />
        <Tab.Screen name="Materiales"     component={ComponentesScreen} />
        <Tab.Screen name="Funcionamiento" component={FuncionamientoScreen} />
        <Tab.Screen name="Galería"        component={GaleriaScreen} />
        <Tab.Screen name="Conclusiones"   component={ConclusionesScreen} />
        <Tab.Screen name="Créditos"       component={CreditosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
