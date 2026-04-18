import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { mockKosList } from '../../constants/mockData';
import { useRouter } from 'expo-router';

// Dummy coordinates since mockData only has address string
const DUMMY_COORDS = [
  { latitude: -7.7554, longitude: 110.3807 }, // Kaliurang
  { latitude: -7.7667, longitude: 110.4038 }, // Seturan
  { latitude: -7.7662, longitude: 110.3920 }, // Gejayan
  { latitude: -7.8286, longitude: 110.3541 }, // Bantul
  { latitude: -7.7471, longitude: 110.3644 }  // Magelang
];

export default function ExploreScreen() {
  const router = useRouter();

  // Handle case where react-native-maps might fail on Web without setup
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webFallbackContainer}>
        <Text style={styles.webFallbackText}>Map view is not supported on web in this demo.</Text>
        <Text style={styles.webFallbackText}>Please run on iOS or Android emulator.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: -7.7956,
          longitude: 110.3695,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {mockKosList.map((kos, index) => {
          const coord = DUMMY_COORDS[index] || DUMMY_COORDS[0];
          return (
            <Marker
              key={kos.id}
              coordinate={coord}
              title={kos.title}
              description={kos.price}
            >
              <Callout onPress={() => router.push(`/kos/${kos.id}`)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{kos.title}</Text>
                  <Text style={styles.calloutPrice}>{kos.price}</Text>
                  <Text style={styles.calloutLink}>Lihat Detail ></Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webFallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webFallbackText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: '#2f3542',
  },
  calloutContainer: {
    padding: 8,
    minWidth: 120,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  calloutPrice: {
    color: '#1e90ff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  calloutLink: {
    color: '#2f3542',
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});
