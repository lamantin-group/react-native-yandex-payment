import React from 'react'
import { Switch, Text, View, ViewStyle } from 'react-native'

interface SwitchViewProps {
  title: string
  description?: string
  descriptionUncheked?: string
  onChanges: (checked: boolean) => void
  checked: boolean
  style?: ViewStyle
  styleSwitch?: ViewStyle
}

export const SwitchView = (props: SwitchViewProps) => {
  const { title, description, descriptionUncheked, onChanges, style, styleSwitch } = props
  const fallback = descriptionUncheked ? descriptionUncheked : description
  const selectedDescription = props.checked ? description : fallback
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
      <View style={{ flexGrow: 1, flexShrink: 1 }}>
        {title && <Text style={{ fontWeight: '500' }}>{title}</Text>}
        {selectedDescription && <Text style={[{ marginTop: 8 }]}>{selectedDescription}</Text>}
      </View>
      <Switch style={{ marginStart: 16 }} value={props.checked} onValueChange={onChanges} />
    </View>
  )
}
