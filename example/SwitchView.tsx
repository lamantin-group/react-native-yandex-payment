import React, { Component } from 'react'
import { Switch, Text, View, ViewStyle } from 'react-native'

interface SwitchViewProps {
  title: string
  description: string
  descriptionUncheked: string
  onChanges: (checked: boolean) => void
  checked: boolean
  style: ViewStyle
  styleSwitch: ViewStyle
  internal: boolean
}

interface SwitchViewState {
  checked: boolean
}

export default class SwitchView extends Component<SwitchViewProps, SwitchViewState> {
  static defaultProps = {
    title: null,
    description: null,
    descriptionUncheked: null,
    onChanges: (checked: boolean) => {},
    checked: false,
    style: {},
    styleSwitch: {},
    internal: false,
  }

  state = {
    checked: false,
  }

  componentDidMount() {
    const { internal, checked } = this.props
    if (internal) {
      this.setState({
        checked: checked,
      })
    }
  }

  componentDidUpdate(prevProps: SwitchViewProps, prevState: SwitchViewState) {
    if (this.props.internal) {
      if (prevProps.checked !== this.props.checked) {
        if (this.props.checked !== this.state.checked) {
          this.setState({
            checked: this.props.checked,
          })
        }
      }
    }
  }

  render() {
    const {
      title,
      description,
      descriptionUncheked,
      onChanges,
      style,
      styleSwitch,
      internal,
    } = this.props
    const checked = internal ? this.state.checked : this.props.checked
    const fallback = descriptionUncheked ? descriptionUncheked : description
    const selectedDescription = checked ? description : fallback
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
        <View style={{ flexGrow: 1, flexShrink: 1 }}>
          {title && <Text style={{ fontWeight: '500' }}>{title}</Text>}
          {selectedDescription && <Text style={[{ marginTop: 8 }]}>{selectedDescription}</Text>}
        </View>
        <Switch
          style={{ marginStart: 16 }}
          value={checked}
          onValueChange={checkedChanges => {
            if (internal) {
              this.setState({
                checked: checkedChanges,
              })
            }
            onChanges(checkedChanges)
          }}
        />
      </View>
    )
  }
}
