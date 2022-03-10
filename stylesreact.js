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
      height: '2.3em'
    },
    body: {
      flex: 1,
      backgroundColor: '#b0caef',
      minHeight: '100vh',
      alignItems: 'center',
    },
    logo: {
      marginTop: '5em',    
      marginBottom: '2em',    
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
    },
    hyperlink: {
        marginTop: '0.5em',
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
        marginLeft: '1em',
        marginRight: '1em',
        fontStyle: 'italic',
        marginTop: '1em',
    },
    quoteAuthor: {
        fontWeight: "bold",
        color: '#0060ff',
        textAlign: "center",
        fontStyle: 'italic',
        fontSize: 18,
        marginTop: '1em',
    },
    topField: {
      marginTop: '1em',
    },
    screenTitle: {
        marginTop: 40,
        color: '#0060ff',
        textAlign: 'center',
        fontSize: 38,
        fontWeight: "400",
        lineHeight: 35,
    }
  });