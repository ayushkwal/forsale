import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, Input, TouchableOpacity, Image, Text, AsyncStorage, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const currentUser = AsyncStorage.getItem('user')
const IncludeSomeDetails = ({ route,navigation }) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState();
    const [productLocation, setProductLocation] = useState('');
    const [productDetails, setProductDetails] = useState([]);
    const [brand, setBrand] = useState('');
    const [driven, setDriven] = useState(0);

    const typer = route.params?.type;
    useEffect(() => {
        console.log(currentUser)
    }, [])
    // console.log(type)

    //   const [product, setProduct] = useState({
    //     name: 'IPhone 13 Pro Max',
    //     price: 300,
    //     description: '96% Battery Health, Refurbished Mobile.',
    //     image: 'https://cdn.pixabay.com/photo/2020/05/25/17/21/link-5219567__340.jpg',
    //     location: 'AF School Staff Quarters, Car Nic...',
    //     date: '24 June 2022',
    //     details: [
    //       { title: 'Brand', value: 'IPhone' },
    //       { title: 'Model', value: '13 Pro Max' },
    //       { title: 'Color', value: 'Silver' },
    //       { title: 'Storage', value: '256GB' },
    //       { title: 'Condition', value: 'Refurbished' }
    //     ]
    //  })

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProductImage(result.uri);
        }
    };
    const handleAddProduct = async () => {
        if (!productName || !productDescription || !productPrice || !productImage) {
            console.log('Missing details')
        }
        setProductDetails([brand, driven])
        try{
            const data = new FormData();
            console.log(productImage)
            let newfile = {uri:productImage,type:'image/jpeg',name:productImage.substr(1,9)}
            data.append('file',newfile);
            data.append('upload_preset','olxclone');
            data.append('cloud_name','imageuploadcloudinary')
            fetch('https://api.cloudinary.com/v1_1/imageuploadcloudinary/upload',{
                method:'POST',
                body:data
            })
            .then((res)=>res.json())
            .then((data)=>{
                try {
                    console.log(productImage)
                    const a = fetch('http://192.168.29.33:3000/ad', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                id: currentUser._z,
                                productName,
                                productDescription,
                                productPrice,
                                productImage:data.secure_url,
                                productDetails
                            }
                        ),
        
                    })
                    console.log('ad posted successfully')
                    navigation.navigate('Home')
                } catch (err) {
                    console.log(err)
                    return;
                }
            })
            .catch((err)=>console.log(err))
        }
        catch(err){
            console.log('errrrrrrrr',err)
            return;
        }
        
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    value={productName}
                    onChangeText={setProductName}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Product Description"
                    value={productDescription}
                    onChangeText={setProductDescription}
                />

                {
                    typer == 'car' ?
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Brand Name"
                                value={brand}
                                onChangeText={(value) => { setBrand({ 'brand': value }); }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="KM Driven"
                                keyboardType='numeric'
                                value={driven}
                                onChangeText={(value) => { setDriven({ 'driven': value }); }}
                            />
                        </>
                        :
                        null
                }

                {
                    typer == 'properties' ?
                        <>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                placeholder="Area in Sq.Ft"
                                value={brand}
                                onChangeText={(value) => { setBrand({ 'area': value }); }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Type (Raw/Semi-Furnished/Furnished)"
                                value={driven}
                                onChangeText={(value) => { setDriven({ 'driven': value }); }}
                            />
                        </>
                        :
                        null
                }

                <TextInput
                    style={styles.input}
                    placeholder="Product Price"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                />
                {/* <TextInput
                style={styles.input}
                placeholder="Add Location"
                value={productLocation}
                onChangeText={setProductLocation}
            /> */}
                {productImage && <Image source={{ uri: productImage }} style={styles.image} />}
                <TouchableOpacity >
                    <View style={styles.selectImage}>
                        <Button onPress={() => { handleSelectImage() }} title="Select Image" />
                    </View>
                </TouchableOpacity>
                <Button title="Post Now" onPress={handleAddProduct} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
    },
    selectImage: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    heading: {
        fontSize: 30,
        color: '#3498db',
        textAlign: 'center',
    }
});

export default IncludeSomeDetails;
