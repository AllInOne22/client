import React, { Component, useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { NavigationEvents } from 'react-navigation';
import IntlPhoneInput from 'react-native-intl-phone-input';

class LoginScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <Login navigation={this.props.navigation} />
            </View>
        )
    }
}

const Login = ({ navigation }) => {

    const [mobileNumber, setMobileNumber] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                >
                    {appLogo()}
                    {signInText()}
                    {mobileNumberTextField()}
                    {continueButton()}
                    {otpInfo()}
                    {loginWithFacebookButton()}
                    {logionWithGoogleButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function mobileNumberTextField() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => setMobileNumber(phoneNumber)}
                defaultCountry="US"
                containerStyle={styles.mobileNumberWrapStyle}
                dialCodeTextStyle={{ ...Fonts.blackColor16Medium }}
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Regular }}
                placeholder="Phone Number"
                dialCodeTextStyle={{ ...Fonts.blackColor14Regular }}
            />
        )
    }

    function logionWithGoogleButton() {
        return (
            <View style={styles.loginWithGoogleButtonStyle}>
                <Image
                    source={require('../../assets/images/google.png')}
                    style={{ width: 30.0, height: 30.0, }}
                />
                <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
                    Log in with Google
                </Text>
            </View >
        )
    }

    function loginWithFacebookButton() {
        return (
            <View style={styles.loginWithFacebookButtonStyle}>
                <Image
                    source={require('../../assets/images/facebook.png')}
                    style={{ width: 30.0, height: 30.0, }}
                />
                <Text style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
                    Log in with Facebook
                </Text>
            </View>
        )
    }

    function otpInfo() {
        return (
            <Text style={{
                ...Fonts.blackColor16Medium,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding * 5.0,
            }}>
                We’ll send otp for verification
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Register')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function signInText() {
        return (
            <Text style={{
                ...Fonts.grayColor14Bold,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                Signin with phone number
            </Text>
        )
    }

    function appLogo() {
        return (
            <Image
                source={require('../../assets/images/icon.png')}
                style={styles.appLogoStyle}
                resizeMode="cover"
            />
        )
    }
}

const styles = StyleSheet.create({
    mobileNumberWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 55.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(128,128,128,0.12)',
        borderWidth: 1.0,
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0
    },
    appLogoStyle: {
        width: 150.0,
        height: 150.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    }
})

LoginScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(LoginScreen);