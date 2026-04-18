import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface FilterOptions {
  facilities: string[];
  type: string | null;
  maxPrice: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

const FACILITIES_LIST = ['WiFi', 'AC', 'Kamar mandi dalam', 'Parkir Luas', 'Dapur Bersama'];
const TYPES_LIST = ['Putra', 'Putri', 'Campur'];
const PRICE_OPTIONS = [500000, 1000000, 1500000, 2000000, 3000000, 5000000];

export default function FilterModal({ visible, onClose, onApply, initialFilters }: FilterModalProps) {
  const [facilities, setFacilities] = useState<string[]>(initialFilters.facilities);
  const [type, setType] = useState<string | null>(initialFilters.type);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters.maxPrice);

  const toggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter(f => f !== facility));
    } else {
      setFacilities([...facilities, facility]);
    }
  };

  const handleApply = () => {
    onApply({
      facilities,
      type,
      maxPrice
    });
    onClose();
  };

  const handleReset = () => {
    setFacilities([]);
    setType(null);
    setMaxPrice(5000000);
  };

  const formatPrice = (price: number) => {
    return 'Rp ' + price.toLocaleString('id-ID');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter Pencarian</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#2f3542" />
            </Pressable>
          </View>

          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Tipe Kos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipe Kost</Text>
              <View style={styles.optionsRow}>
                {TYPES_LIST.map((t) => (
                  <Pressable
                    key={t}
                    style={[styles.chip, type === t && styles.chipActive]}
                    onPress={() => setType(type === t ? null : t)}
                  >
                    <Text style={[styles.chipText, type === t && styles.chipTextActive]}>{t}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Harga Maksimal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Harga Maksimal (per bulan)</Text>
              <View style={styles.optionsRow}>
                {PRICE_OPTIONS.map((price) => (
                  <Pressable
                    key={price}
                    style={[styles.chip, maxPrice === price && styles.chipActive]}
                    onPress={() => setMaxPrice(price)}
                  >
                    <Text style={[styles.chipText, maxPrice === price && styles.chipTextActive]}>
                      {price >= 5000000 ? '> Rp 3 Jt' : `< ${formatPrice(price)}`}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Fasilitas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fasilitas</Text>
              <View style={styles.optionsRow}>
                {FACILITIES_LIST.map((f) => (
                  <Pressable
                    key={f}
                    style={[styles.chip, facilities.includes(f) && styles.chipActive]}
                    onPress={() => toggleFacility(f)}
                  >
                    <Text style={[styles.chipText, facilities.includes(f) && styles.chipTextActive]}>{f}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={{height: 40}} />
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Terapkan Filter</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2f3542',
  },
  closeButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3542',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dfe4ea',
    backgroundColor: '#ffffff',
  },
  chipActive: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  chipText: {
    color: '#747d8c',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f2f6',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfe4ea',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#2f3542',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
