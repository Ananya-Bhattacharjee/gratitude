import { StyleSheet } from "react-native"

export default StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#b0caef',
    },
    container: {
      flex: 1,
      backgroundColor: '#6467dc',
      alignItems: 'center',
      justifyContent: 'center',
      height: 100
    },
    body: {
      flex: 1,
      backgroundColor: '#b0caef',
      minHeight: 1000,
      alignItems: 'center',
    },
    logo: {
      marginTop: 60,    
      marginBottom: 10,    
    },
    logoText: {
        marginTop: -20,
        color: '#0060ff',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    heading1: {
      color: '#0060ff',
      fontSize: 50,
      fontWeight: '400',
    },
    heading2: {
      color: '#0060ff',
      fontSize: 25,
      fontWeight: '400',
      textAlign: 'center',
    },
    hyperlink: {
        marginTop: 10,
        textDecorationLine: "underline",
        color: 'blue',   
        textAlign: 'center',
        fontSize: 18,
    },
    //styles for quote.
    quote: {
        fontSize: 18,
        color: '#0060ff',
        textAlign: "center",
        marginLeft: 10,
        marginRight: 10,
        fontStyle: 'italic',
        marginTop: 10,
    },
    quoteAuthor: {
        fontWeight: "bold",
        color: '#0060ff',
        textAlign: "center",
        fontStyle: 'italic',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
    },
    topField: {
      marginTop: 10,
    },
    screenTitle: {
        paddingTop: 40,
        color: '#0060ff',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "400",
        //lineHeight: 40,
    },
    flexStyle: {
      flex: 1,
    }
  });