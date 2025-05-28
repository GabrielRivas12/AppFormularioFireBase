import { View, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import appFirebase from '../Firebase';

import {
    collection,
    getFirestore,
    query, doc,
    setDoc, getDocs, getDoc,
    deleteDoc
} from 'firebase/firestore';


const db = getFirestore(appFirebase);



export default function Lista({ navigation }) {

    const guardarNuevo = async (nuevo) => {
        await setDoc(doc(db, 'clientes', nuevo.Ncedula), nuevo);
        await LeerDatos();
    }

    const eliminar = (cedula) => {
        Alert.alert(
            'Confirmar aliminacion',
            'Estas seguro de que deseas elimanar este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteDoc(doc(db, "clientes", cedula));
                        await LeerDatos();
                    }
                },
            ],
            { cancelable: true }
        );
    }




    const [clientes, setClientes] = useState([


    ]);

    useEffect(() => {
        LeerDatos();
    }, []);




    const LeerDatos = async () => {
        const q = query(collection(db, "clientes"));
        const querySnapshot = await getDocs(q);
        const d = [];
        querySnapshot.forEach((doc) => {
            const datosBD = doc.data();
            d.push(datosBD);
        });
        setClientes(d);
    }

    const buscarCliente = async (valorbuscado) => {
        if (!valorbuscado || valorbuscado.trim() === '') 
            
            return;

        const q = query(collection(db, "clientes"));
        const querySnapshot = await getDocs(q);
        const resultados = [];

        const textoBuscado = valorbuscado.toLowerCase();

        querySnapshot.forEach((doc) => {
            const clienteEncontrado = doc.data();

            if (
                clienteEncontrado.Ncedula.toLowerCase().includes(textoBuscado) ||
                clienteEncontrado.Nnombres.toLowerCase().includes(textoBuscado) ||
                clienteEncontrado.Napellidos.toLowerCase().includes(textoBuscado) ||
                clienteEncontrado.Nfechanac.toLowerCase().includes(textoBuscado) ||
                clienteEncontrado.Nsexo.toLowerCase().includes(textoBuscado)
            ) {
                resultados.push(clienteEncontrado);
            }
        });

        setClientes(resultados);
    };






    const [valorBusqueda, setValorBusqueda] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botonADD} onPress={() => navigation.navigate('Formulario', { guardarNuevo })} >
                <FontAwesome5 name="user-plus" size={24} color="#4F8B2E" />
            </TouchableOpacity>



            <Text style={styles.titulo}> Lista de clientes </Text>
            <View style={styles.conteinerBusqueda}>
                <Text style={styles.label}> Buscador </Text>
                <TextInput
                    style={styles.input}
                    value={valorBusqueda}
                    onChangeText={async (texto) => {
                        setValorBusqueda(texto);
                        if (texto.trim() !== '') {
                            await buscarCliente(texto);

                        } else {
                            LeerDatos();
                        }
                    }}
                    placeholder='-'
                />

            </View>





            {clientes.length == 0 ? (
                <Text style={styles.mensaje}> No hay clientes</Text>

            ) : (

                <ScrollView style={styles.scroll}>
                    {clientes.map((clientes, index) => (
                        <View key={index} style={styles.card}>

                            <Text style={styles.label}> Cedula: <Text style={styles.valor}> {clientes.Ncedula} </Text> </Text>

                            <TouchableOpacity style={styles.botone}
                                onPress={() => eliminar(clientes.Ncedula)} >
                                <FontAwesome5 name="trash" size={24} color="red" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botonEdit}
                                onPress={() => navigation.navigate('Formulario', { guardarNuevo, clientesEditar: clientes })} >
                                <FontAwesome5 name="edit" size={24} color="#4F8B2E" />
                            </TouchableOpacity>

                            <Text style={styles.label}> Nombre: <Text style={styles.valor}> {clientes.Nnombres} </Text> </Text>
                            <Text style={styles.label}> Apellidos: <Text style={styles.valor}> {clientes.Napellidos} </Text> </Text>
                            <Text style={styles.label}> Fecha de nacimiento: <Text style={styles.valor}> {clientes.Nfechanac} </Text> </Text>
                            <Text style={styles.label}> Sexo: <Text style={styles.valor}> {clientes.Nsexo} </Text> </Text>
                        </View>

                    ))}

                </ScrollView>

            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E6F7E6',
    },
    conteinerBusqueda: {
        marginBottom: 20
    },
    titulo: {
        fontSize: 25,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#4F8B2E',
        paddingTop: 20,
    },
    card: {
        height: 130,
        width: 360,
        backgroundColor: '#C2E8C2',
        alignItems: 'left',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative'
    },
    label: {
        color: '#00000',
        marginLeft: 10,
        paddingTop: 1,

    },
    valor: {
        color: '#358B47'

    },
    botonADD: {
        position: 'absolute',
        top: 5,
        height: 50,
        backgroundColor: '#E6F7E6',
        width: 50,
        borderRadius: 10,
        borderColor: '#4F8B2E',
        borderWidth: 1,
        marginLeft: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    botone: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
    },
    botonEdit: {
        position: 'absolute',
        top: 10,
        right: 60,
        width: 32,
        height: 32,



    },
    input: {
        borderWidth: 1,
        borderColor: '#358B47',
        padding: 8,
        marginTop: 5,
        borderRadius: 5,
        width: 350,
        height: 50
    },

});
