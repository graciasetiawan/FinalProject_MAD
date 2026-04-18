import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Platform, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockKosList } from '../../constants/mockData';
import { useFavorites } from '../../hooks/useFavorites';

export default function KosDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const kos = mockKosList.find(k => k.id === id);

  if (!kos) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Data Kost tidak ditemukan</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  const favorite = isFavorite(kos.id);

  const handleContactOwner = () => {
    // Mocking contact action
    if (Platform.OS !== 'web') {
      Linking.openURL(`whatsapp://send?phone=+6281234567890&text=Halo,%20saya%20tertarik%20dengan%20${kos.title}`);
    } else {
      window.open(`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20${kos.title}`, '_blank');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: kos.imageUrl }} style={styles.image} />
          <Pressable style={styles.headerBackButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <Pressable style={styles.headerFavoriteButton} onPress={() => toggleFavorite(kos.id)}>
            <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={28} color={favorite ? '#ff4757' : '#ffffff'} />
          </Pressable>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{kos.title}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{kos.type}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="#ff4757" />
            <Text style={styles.locationText}>{kos.location}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{kos.price}</Text>
            <Text style={styles.duration}> / bulan</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Fasilitas Kost</Text>
          <View style={styles.facilitiesContainer}>
            {kos.facilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <Ionicons 
                  name={
                    facility === 'WiFi' ? 'wifi' :
                    facility === 'AC' ? 'snow' :
                    facility === 'Kamar mandi dalam' ? 'water' :
                    facility === 'Parkir Luas' ? 'car' : 'home'
                  } 
                  size={24} 
                  color="#1e90ff" 
                />
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.descriptionText}>
            Kost nyaman dengan lingkungan yang tenang, sangat cocok untuk mahasiswa maupun pekerja. Lokasi strategis dekat dengan berbagai fasilitas umum seperti minimarket, warung makan, dan halte transportasi umum.
          </Text>
          
          {/* Spacer for bottom action bar */}
          <View style={{height: 100}} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.bottomPriceLabel}>Harga mulai</Text>
          <Text style={styles.bottomPrice}>{kos.price}</Text>
        </View>
        <Pressable style={styles.contactButton} onPress={handleContactOwner}>
          <Ionicons name="logo-whatsapp" size={20} color="#ffffff" style={styles.contactIcon} />
          <Text style={styles.contactButtonText}>Hubungi Pemilik</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#2f3542',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 20,
  },
  headerFavoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#2f3542',
    marginRight: 10,
  },
  typeBadge: {
    backgroundColor: '#eccc68',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2f3542',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#747d8c',
    marginLeft: 6,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e90ff',
  },
  duration: {
    fontSize: 16,
    color: '#747d8c',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f2f6',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3542',
    marginBottom: 16,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 12,
  },
  facilityText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#2f3542',
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#57606f',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f2f6',
    alignItems: 'center',
  },
  bottomPriceContainer: {
    flex: 1,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: '#747d8c',
    marginBottom: 2,
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2f3542',
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#2ed573',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#2ed573',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  contactIcon: {
    marginRight: 8,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
