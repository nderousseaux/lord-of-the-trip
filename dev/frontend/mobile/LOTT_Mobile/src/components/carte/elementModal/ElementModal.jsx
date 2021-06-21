import * as React from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, Modal, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { Icon, Button } from 'react-native-elements';

import styles from './ElementModal.style.js';

export default function ElementModal(props) {

    let fieldNumber = 0;

    if (props.ObstaclesNumber) {
        fieldNumber++;
    }
    if (props.Length) {
        fieldNumber++;
    }

    return (
        <View style={styles.modalContainer}>
            <ScrollView style={styles.titleContainer}>
                <Text style={styles.title}>
                    {props.Title ? props.Title : ""}
                </Text>
            </ScrollView>
            {console.log(fieldNumber)}
            <ScrollView style={{ flex: fieldNumber }}>
                {props.ObstaclesNumber 
                    ? <Text style={styles.contentLine}>
                        Nombres d'obstacles : {props.ObstaclesNumber}
                    </Text>
                    : null}
                {props.Length
                    ? <Text style={styles.contentLine}>
                        Taille du segment : {props.Length}
                    </Text>
                    : null}
            </ScrollView>
            <View style={styles.footerContainer}>
                <Button
                    type='clear'
                    icon={
                        <Icon
                            name="close"
                            size={30}
                            color="red"
                        />
                    }
                    onPress={() => closeAlert()}
                />
            </View>
        </View>
    )
}
