import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@/styles/colors';

interface CategoryObj {
  slug: string;
  name: string;
}

interface Props {
  value: string;
  onChange: (text: string) => void;
  categories: CategoryObj[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  activeFilterCount: number;
}

const sortOptions = [
  { key: 'default', label: 'Varsayılan' },
  { key: 'price-asc', label: 'Fiyat Artan' },
  { key: 'price-desc', label: 'Fiyat Azalan' },
  { key: 'name-asc', label: 'A-Z' },
  { key: 'name-desc', label: 'Z-A' },
];

const MAX_VISIBLE = 20;

const SearchBarWithFilter: React.FC<Props> = ({ value, onChange, categories, selectedCategory, onSelectCategory, sort, onSortChange, activeFilterCount }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visibleCategories = expanded ? categories : categories.slice(0, MAX_VISIBLE);

  const handleCategorySelect = (slug: string) => {
    if (selectedCategory === slug || slug === 'all') onSelectCategory('all');
    else onSelectCategory(slug);
  };

  const handleSortSelect = (sortKey: string) => {
    onSortChange(sortKey);
  };

  return (
    <>
      {/* Outer row for input and filter button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 12, marginBottom: 8 }}>
        <View style={styles.container}>
          <Icon name="magnify" size={22} color={colors.textSecondary} style={{ marginLeft: 12, marginRight: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Ürün Ara"
            placeholderTextColor={colors.textSecondary}
            value={value}
            onChangeText={onChange}
          />
        </View>
        <View style={styles.filterBtnWrapper}>
          <TouchableOpacity style={styles.filterBtn} onPress={() => { setModalVisible(true); setExpanded(false); }}>
            <Icon name="tune" size={22} color={'#fff'} />
          </TouchableOpacity>
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kategoriler</Text>
            <ScrollView style={{ maxHeight: Dimensions.get('window').height * 1 }}>
              <View style={styles.chipGrid}>
                {[{slug: 'all', name: 'All'}, ...visibleCategories].map(cat => (
                  <TouchableOpacity
                    key={cat.slug}
                    style={[styles.chip, selectedCategory === cat.slug && styles.chipActive]}
                    onPress={() => handleCategorySelect(cat.slug)}
                  >
                    <Text style={[styles.chipText, selectedCategory === cat.slug && styles.chipTextActive]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                {!expanded && categories.length > MAX_VISIBLE && (
                  <TouchableOpacity style={styles.expandBtn} onPress={() => setExpanded(true)}>
                    <Icon name="chevron-down" size={28} color={colors.primary} />
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
            <Text style={styles.modalTitle}>Sıralama</Text>
            <View style={styles.sortRow}>
              {sortOptions.map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.sortBtn, sort === opt.key && styles.sortBtnActive]}
                  onPress={() => handleSortSelect(opt.key)}
                >
                  <Text style={[styles.sortText, sort === opt.key && styles.sortTextActive]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', left: 24, right: 24, bottom: 24 }}>
              <TouchableOpacity disabled={activeFilterCount === 0} style={[styles.clearBtn, {opacity: activeFilterCount > 0 ? 1 : 0.5}]} onPress={() => { onSelectCategory('all'); onSortChange('default'); }}>
                <Icon name="close-circle-outline" size={22} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.clearBtnText}>Temizle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtnText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchBarBody: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  filterBtnWrapper: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtn: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.text,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 2,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 320,
    maxHeight: '100%',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'left',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
    gap: 8,
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  chip: {
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 40,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: '#fff',
  },
  expandBtn: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 4,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    minWidth: 40,
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 58,
    gap: 8,
  },
  sortBtn: {
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sortTextActive: {
    color: '#fff',
  },
  closeBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 12,
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchBarWithFilter; 