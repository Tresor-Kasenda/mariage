import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from "expo-camera";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SharedFooterElements = () => (
  <>
    <TouchableOpacity className="bg-white py-[15px] px-[30px] rounded-[30px] mb-[40px] flex-row items-center">
      <Text className="text-black text-base font-bold">Show your Spot code</Text>
    </TouchableOpacity>
    <Text className="text-[#AAA] text-sm mb-[10px]">
      Look for QR codes supporting
    </Text>
    <View className="flex-row items-center">
      <Text className="text-white text-base font-bold mx-2.5">PAYNOW</Text>
      <View className="w-px h-5 bg-[#AAA]" />
      <Text className="text-white text-base font-bold mx-2.5">fave PAY</Text>
    </View>
  </>
);

const ScanQRScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isTorchOn, setIsTorchOn] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const toggleTorch = () => {
    setIsTorchOn(!isTorchOn);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 bg-[#300301] justify-center items-center">
        <Text className="text-white text-lg">Requesting for camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-[#300301] justify-center items-center p-5">
        <Text className="text-white text-lg text-center mb-4">No access to camera. Please grant camera permission in settings.</Text>
        <Button title={"Open Settings"} onPress={openSettings} color="#FDBA2D"/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center bg-[#300301]">
      <StatusBar barStyle="light-content" />
      <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center pt-10 px-1 bg-[#300301]">
        <TouchableOpacity className="p-2.5" onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View className="flex-row">
          <TouchableOpacity className="p-2.5" onPress={toggleTorch}>
            <Ionicons name={isTorchOn ? "flashlight" : "flashlight-outline"} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2.5">
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {!scanned ? (
        <>
          <CameraView
            enableTorch={isTorchOn}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={StyleSheet.absoluteFillObject}
            className="flex-1"
          />
          <View className="absolute inset-0 flex-1 justify-center items-center -mt-20 z-[5]">
            <View className="w-3/5 aspect-square relative">
              <View className="absolute -top-1.5 -left-1.5 w-[60px] h-[60px] border-t-8 border-l-8 border-[#D22730] rounded-tl-2xl" />
              <View className="absolute -top-1.5 -right-1.5 w-[60px] h-[60px] border-t-8 border-r-8 border-[#FDBA2D] rounded-tr-2xl" />
              <View className="absolute -bottom-1.5 -left-1.5 w-[60px] h-[60px] border-b-8 border-l-8 border-[#307EF3] rounded-bl-2xl" />
              <View className="absolute -bottom-1.5 -right-1.5 w-[60px] h-[60px] border-b-8 border-r-8 border-[#009D57] rounded-br-2xl" />
            </View>
          </View>

          <View className="absolute bottom-0 left-0 right-0 pb-[40px] items-center bg-transparent px-5 z-10">
            <Text className="text-white text-lg text-center mb-[30px]">
              Scan a PayNow QR to pay{`\\n`}or Spot code to connect
            </Text>
            <SharedFooterElements />
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center px-5">
          <Text className="text-white text-xl text-center mb-5">QR Code Scanned!</Text>
          <Text className="text-gray-300 text-base text-center mb-10">Data: {scannedData}</Text>
          <Button title={"Tap to Scan Again"} onPress={() => {
            setScanned(false);
            setScannedData(null);
          }} color="#FDBA2D" />
          <View className="mt-10">
            <SharedFooterElements />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScanQRScreen;
