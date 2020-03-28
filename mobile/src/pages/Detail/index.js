import React from 'react';
import {Feather} from '@expo/vector-icons';

import * as MailCompose from 'expo-mail-composer';
import {useNavigation,useRoute} from '@react-navigation/native';
import { View, Image,Text,Linking , TouchableOpacity } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png'

export default function Detail(){
    const route = useRoute();
    const incident = route.params.incident;
    const navigation = useNavigation();
    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar o caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(incident.value)}.`

    


    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailCompose.composeAsync({
            subject: `Héroi do caso: ${incident.title}`,
            recipients:[incident.email],
            body: message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);

    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack} style={styles.detailsButton}>                
                    <Feather name="arrow-left" size={28} color={"#E02041"}/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(incident.value)}</Text>
            </View>
            
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o héroi desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>

                <TouchableOpacity onPress={sendWhatsApp} style={styles.action}>
                    <Text style={styles.actionText}>WhatsApp</Text>                    
                </TouchableOpacity>

                <TouchableOpacity onPress={sendMail} style={styles.action}>
                    <Text style={styles.actionText}>E-mail</Text>                    
                </TouchableOpacity>


                </View>


            </View>

        </View>
    );

}