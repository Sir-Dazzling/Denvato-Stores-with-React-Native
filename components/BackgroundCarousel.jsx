import React from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';

//Getting dimension width of device
const DEVICE_WIDTH = Dimensions.get("window").width;

class BackgroundCarousel extends React.Component
{
    scrollRef = React.createRef();
    constructor(props)
    {
        super(props);

        this.state = 
        {
            selectedIndex : 0
        };
    };

    //Mouting the component
    componentDidMount = () => 
    {
        setInterval(() => 
        {
            this.setState(prev => ({selectedIndex: prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1}),
            () => {
                this.scrollRef.current.scrollTo({
                    animated: true,
                    y: 0,
                    x: DEVICE_WIDTH * this.state.selectedIndex
                })
            });
        }, 3000);
    };

    //Setting active Indicator
    setSelectedIndex = (event) => 
    {
        //Width of View Size
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        
        //Getting current position of the scroll view
        const contentOffset = event.nativeEvent.contentOffset.x;
        
        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState({selectedIndex});
    };

    render() {
        const {images} = this.props;
        const {selectedIndex} = this.state;
        
        return (
            <View style = {{height: "65%", width: "100%"}}>
                <ScrollView showsHorizontalScrollIndicator = {false} horizontal pagingEnabled onMomentumScrollEnd = {this.setSelectedIndex} ref = {this.scrollRef}>
                    {images.map(image => (
                        <Image key = {image} 
                        source = {image}
                        style = {styles.backgroundImage} />
                    ))}
                </ScrollView>
                <View style = {styles.indicatorDivs}>
                    {images.map((image, i) => 
                    (
                        <View key = {image} style = {[styles.indicators, {opacity: i === selectedIndex ? 1 : 0.5}]} />
                    ))}
                </View>
            </View>
        );
    };
};

//Creating the StyleSheet
const styles = StyleSheet.create({
    backgroundImage: 
    {
        height: "100%",
        width: DEVICE_WIDTH,
        opacity: 0.8
    },
    indicatorDivs:
    {
        position: "absolute",
        bottom: 15,
        height: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    indicators: 
    {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: "white"
    }
});

export {BackgroundCarousel};

