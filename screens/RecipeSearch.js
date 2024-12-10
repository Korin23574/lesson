import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch,
  Button,
  ScrollView,
} from 'react-native';

// React Navigation에서 navigation 객체 사용
const RecipeSearch = ({ navigation }) => {
  const [conditions, setConditions] = useState({
    condition1: false,
    condition2: false,
    condition3: false,
    condition4: false,
  });

  const [ingredients, setIngredients] = useState('');
  const [newIngredient, setNewIngredient] = useState('');

  const toggleCondition = (key) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    } else {
      Alert.alert('Error', '재료를 입력하세요.');
    }
  };

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const navigateToDetail = () => {
    navigation.navigate('RecipeDetail');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>레시피 검색</Text>
        <View style={styles.conditions}>
          {Object.keys(conditions).map((key) => (
            <View key={key} style={styles.conditionItem}>
              <Text>{key}</Text>
              <Switch
                value={conditions[key]}
                onValueChange={() => toggleCondition(key)}
              />
            </View>
          ))}
        </View>

        <View style={styles.ingredients}>
          <Text style={styles.sectionTitle}>재료 리스트</Text>
          <FlatList
            data={ingredients}
            renderItem={({ item, index }) => (
              <View style={styles.ingredientItem}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => deleteIngredient(index)}>
                  <Text style={styles.deleteButton}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TextInput
            style={styles.input}
            placeholder="재료를 입력하세요"
            value={newIngredient}
            onChangeText={setNewIngredient}
          />
          <Button title="+ 재료 추가" onPress={addIngredient} />
        </View>

        {/* 검색 버튼 */}
        <View style={styles.searchButton}>
          <Button title="검색" onPress={navigateToDetail} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  conditions: {
    marginVertical: 10,
  },
  conditionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredients: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  searchButton: {
    marginVertical: 20,
  },
});

export default RecipeSearch;
