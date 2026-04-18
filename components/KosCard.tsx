import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export type KosType = {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'Putra' | 'Putri' | 'Campur';
  imageUrl: string;
  facilities: string[];
  isFavorite?: boolean;
};

interface KosCardProps {
  kos: KosType;
  onToggleFavorite: (id: string) => void;
}

export default function KosCard({ kos, onToggleFavorite }: KosCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/kos/${kos.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: kos.imageUrl }} style={styles.image} />
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{kos.type}</Text>
        </View>
        <Pressable
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite(kos.id);
          }}
        >
          <Ionicons
            name={kos.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={kos.isFavorite ? '#ff4757' : '#ffffff'}
          />
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{kos.title}</Text>
          <View style={styles.facilitiesIcons}>
            {kos.facilities.includes('WiFi') && <Ionicons name="wifi" size={16} color="#747d8c" style={styles.iconSpaced} />}
            {kos.facilities.includes('AC') && <Ionicons name="snow" size={16} color="#747d8c" style={styles.iconSpaced} />}
            {kos.facilities.includes('Kamar mandi dalam') && <Ionicons name="water" size={16} color="#747d8c" />}
          </View>
        </View>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#747d8c" />
          <Text style={styles.locationText} numberOfLines={1}>{kos.location}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{kos.price}</Text>
          <Text style={styles.duration}>/ bulan</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    marginHorizontal: 2,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3542',
    flex: 1,
    marginRight: 10,
  },
  facilitiesIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpaced: {
    marginRight: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#747d8c',
    marginLeft: 4,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e90ff',
  },
  duration: {
    fontSize: 14,
    color: '#747d8c',
    marginBottom: 2,
    marginLeft: 4,
  },
});
