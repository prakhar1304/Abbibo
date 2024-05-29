import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , {FC} from 'react'
import color from '../utility/color'


interface Props {
    title: string
    onPress: any
}
const MyButton : FC <Props> = ({title , onPress}) => {
  return (
    <TouchableOpacity  onPress={onPress} style = {styles.Container}>
        <Text style = { styles.Title }>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButton 

const styles = StyleSheet.create({

    Container:{
        height:50,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: color.cream,
        borderRadius: 30,
        marginBottom:"0.1%",
        marginTop:"2%",

        elevation:5
        
        
    },

    Title:{
        color: color.Offwhite ,
        fontSize: 18 ,
        fontFamily : 'Merriweather-Regulars',
        // fontWeight: '600',

    }
})