import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LIGHT_GREY, ALMOST_BLACK, GREY, LIGHTER_GREY } from '../utility/colors';

export default class ItemList extends Component {
    render() {
        const { item, onPress } = this.props;
        return (
            <View style={{ width: '100%' }}>
                {
                    item.type === 'header' && (<View
                        style={{
                            height: 44,
                            borderBottomColor: LIGHT_GREY,
                            borderBottomWidth: 1,
                            marginLeft: 15,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Poppins-Bold',
                                color: ALMOST_BLACK,
                                fontSize: 17,
                            }}
                        >{item.name}</Text>
                    </View>)
                }
                {
                    item.type === 'item' && (
                        <TouchableOpacity
                            style={{
                                height: 50,
                                borderBottomColor: LIGHT_GREY,
                                borderBottomWidth: 0.3,
                                paddingHorizontal: 15,
                                backgroundColor: LIGHTER_GREY,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                            onPress={() => onPress(item.name)}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Regular',
                                    color: GREY,
                                    fontSize: 15,
                                }}
                            >{item.name}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}
