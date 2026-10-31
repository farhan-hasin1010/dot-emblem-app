import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

// Presets identical to the video demonstration
const PRESETS = [
  {
    id: 'bugatti',
    name: 'Bugatti EB',
    type: 'badge',
    bg: '#020617',
    border: '#3b82f6',
    render: () => (
      <View style={styles.badgeContainer}>
        <Text style={[styles.badgeText, { color: '#60a5fa', fontWeight: '900', letterSpacing: -2 }]}>
          EB
        </Text>
      </View>
    )
  },
  {
    id: 'onlyfans',
    name: 'OnlyFans',
    type: 'logo',
    bg: '#0284c7',
    border: '#38bdf8',
    render: () => (
      <View style={styles.badgeContainer}>
        <View style={styles.ofIcon}>
          <Text style={{ color: '#0284c7', fontSize: 32, fontWeight: '900' }}>OF</Text>
        </View>
      </View>
    )
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    type: 'automotive',
    bg: '#09090b',
    border: '#71717a',
    render: () => (
      <View style={styles.badgeContainer}>
        <View style={styles.mbRing}>
          <View style={styles.mbStarVert} />
          <View style={styles.mbStarDiag1} />
          <View style={styles.mbStarDiag2} />
        </View>
      </View>
    )
  },
  {
    id: 'smiley',
    name: 'Smiley',
    type: 'emoji',
    bg: '#eab308',
    border: '#ca8a04',
    render: () => (
      <View style={styles.badgeContainer}>
        <View style={styles.smileyEyesRow}>
          <View style={styles.smileyEye} />
          <View style={styles.smileyEye} />
        </View>
        <View style={styles.smileyMouth} />
      </View>
    )
  },
  {
    id: 'airplane',
    name: 'Airplane Mode',
    type: 'graphic',
    bg: '#dc2626',
    border: '#ef4444',
    render: () => (
      <View style={styles.badgeContainer}>
        <View style={styles.airplaneRing}>
          <Text style={{ fontSize: 44, color: '#ffffff' }}>✈</Text>
        </View>
      </View>
    )
  },
  {
    id: 'byebye',
    name: 'BYE BYE',
    type: 'animation',
    bg: '#000000',
    border: '#27272a',
    render: () => (
      <View style={styles.badgeContainer}>
        <Text style={{ fontSize: 50 }}>👋</Text>
        <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: 14, letterSpacing: 3, marginTop: 4 }}>
          BYE BYE
        </Text>
      </View>
    )
  },
  {
    id: 'bmw',
    name: 'BMW M',
    type: 'automotive',
    bg: '#000000',
    border: '#2563eb',
    render: () => (
      <View style={styles.badgeContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 6, height: 32, backgroundColor: '#0099ff', transform: [{ skewX: '-20deg' }], marginHorizontal: 1 }} />
          <View style={{ width: 6, height: 32, backgroundColor: '#001489', transform: [{ skewX: '-20deg' }], marginHorizontal: 1 }} />
          <View style={{ width: 6, height: 32, backgroundColor: '#e51937', transform: [{ skewX: '-20deg' }], marginHorizontal: 1 }} />
          <Text style={{ color: '#ffffff', fontSize: 30, fontWeight: '900', fontStyle: 'italic', marginLeft: 4 }}>M</Text>
        </View>
      </View>
    )
  },
  {
    id: 'batman',
    name: 'Dark Knight',
    type: 'graphic',
    bg: '#09090b',
    border: '#eab308',
    render: () => (
      <View style={styles.badgeContainer}>
        <Text style={{ fontSize: 54 }}>🦇</Text>
      </View>
    )
  }
];

export default function App() {
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  const [customImage, setCustomImage] = useState(null);
  const [activeTab, setActiveTab] = useState('Presets');
  const [brightness, setBrightness] = useState(100);

  const handleSelectPreset = (preset) => {
    setCustomImage(null);
    setActivePreset(preset);
  };

  const handlePickCustomImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access gallery is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets[0].uri) {
      setCustomImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>DOT</Text>
          <Text style={styles.brandSubtitle}>DYNAMIC EMBLEM CONTROLLER</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>CONNECTED</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Emblem Live Circular Stage */}
        <View style={styles.stageCard}>
          <Text style={styles.stageLabel}>LIVE EMBLEM PREVIEW</Text>
          
          <View style={[
            styles.emblemOuterRing, 
            { borderColor: customImage ? '#3b82f6' : activePreset.border }
          ]}>
            <View style={[
              styles.emblemScreen, 
              { 
                backgroundColor: customImage ? '#000000' : activePreset.bg,
                opacity: brightness / 100 
              }
            ]}>
              {customImage ? (
                <Image source={{ uri: customImage }} style={styles.customPreviewImage} />
              ) : (
                activePreset.render()
              )}
            </View>
          </View>

          <Text style={styles.emblemCurrentName}>
            {customImage ? 'Custom Asset Upload' : activePreset.name}
          </Text>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          {['Presets', 'Custom Studio', 'Display'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab 1: Presets Grid */}
        {activeTab === 'Presets' && (
          <View style={styles.gridContainer}>
            {PRESETS.map((item) => {
              const isSelected = !customImage && activePreset.id === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.presetGridItem, isSelected && styles.presetGridItemActive]}
                  onPress={() => handleSelectPreset(item)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.thumbnailCircle, { backgroundColor: item.bg, borderColor: item.border }]}>
                    {item.render()}
                  </View>
                  <Text numberOfLines={1} style={[styles.presetItemName, isSelected && { color: '#ffffff', fontWeight: '700' }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Tab 2: Custom Studio */}
        {activeTab === 'Custom Studio' && (
          <View style={styles.studioCard}>
            <Text style={styles.studioHeader}>Upload Custom Graphic or GIF</Text>
            <Text style={styles.studioSubheader}>
              Select any 1:1 image or graphic from your phone gallery to project onto the circular emblem.
            </Text>

            <TouchableOpacity style={styles.uploadButton} onPress={handlePickCustomImage}>
              <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            {customImage && (
              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={() => {
                  setCustomImage(null);
                  setActivePreset(PRESETS[0]);
                }}
              >
                <Text style={styles.clearButtonText}>Reset to Factory Presets</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Tab 3: Display Controls */}
        {activeTab === 'Display' && (
          <View style={styles.studioCard}>
            <Text style={styles.studioHeader}>Display Brightness</Text>
            <Text style={styles.studioSubheader}>Adjust OLED illumination levels</Text>

            <View style={styles.brightnessButtonRow}>
              {[25, 50, 75, 100].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[styles.levelButton, brightness === level && styles.levelButtonActive]}
                  onPress={() => setBrightness(level)}
                >
                  <Text style={[styles.levelButtonText, brightness === level && { color: '#ffffff', fontWeight: 'bold' }]}>
                    {level}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#18181b',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  brandSubtitle: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#052e16',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#15803d',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  statusText: {
    color: '#4ade80',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  stageCard: {
    backgroundColor: '#18181b',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 20,
  },
  stageLabel: {
    color: '#a1a1aa',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  emblemOuterRing: {
    width: width * 0.52,
    height: width * 0.52,
    borderRadius: (width * 0.52) / 2,
    borderWidth: 5,
    padding: 4,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  emblemScreen: {
    flex: 1,
    borderRadius: 999,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emblemCurrentName: {
    color: '#f4f4f5',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 0.9 }],
  },
  badgeText: {
    fontSize: 44,
  },
  ofIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mbRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#e4e4e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mbStarVert: {
    width: 2,
    height: 32,
    backgroundColor: '#e4e4e7',
    position: 'absolute',
    top: 4,
  },
  mbStarDiag1: {
    width: 2,
    height: 32,
    backgroundColor: '#e4e4e7',
    position: 'absolute',
    transform: [{ rotate: '120deg' }],
  },
  mbStarDiag2: {
    width: 2,
    height: 32,
    backgroundColor: '#e4e4e7',
    position: 'absolute',
    transform: [{ rotate: '240deg' }],
  },
  smileyEyesRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 6,
  },
  smileyEye: {
    width: 8,
    height: 12,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  smileyMouth: {
    width: 38,
    height: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 4,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  airplaneRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customPreviewImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#27272a',
  },
  tabButtonText: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#ffffff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  presetGridItem: {
    width: (width - 52) / 2,
    backgroundColor: '#18181b',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#27272a',
  },
  presetGridItemActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e293b',
  },
  thumbnailCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  presetItemName: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '500',
  },
  studioCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  studioHeader: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  studioSubheader: {
    color: '#a1a1aa',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  clearButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  clearButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  brightnessButtonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#27272a',
    borderRadius: 10,
    alignItems: 'center',
  },
  levelButtonActive: {
    backgroundColor: '#3b82f6',
  },
  levelButtonText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '600',
  }
});
