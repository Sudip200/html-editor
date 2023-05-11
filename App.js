import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import { Appbar } from 'react-native-paper';

 
const HtmlCodeEditor = () => {
  const [html, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: linear-gradient(to right, #ff9966, #ff5e62);
      background-attachment: fixed;
      color: white;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`)


 
 const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: html,
        title: 'Share HTML',
      });
    } catch (error) {
      console.log('Sharing failed:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="HTML Code Editor" />
  
  </Appbar.Header>
      <View style={{ backgroundColor: '#f5f5f5', padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>HTML Code Editor</Text>
      </View>
 <WebView source={{html }} style={{ height:30}}/>
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 210, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          multiline
          value={html}
          onChangeText={setHtmlCode}
          placeholder="Enter HTML code"
        />
       
        <Button title="Share" onPress={handleShare} />
      </View>
    </View>
  );
};

export default HtmlCodeEditor;
