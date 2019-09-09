import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

class ClickableView extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    opacity: PropTypes.number,
    disabled: PropTypes.bool,
    clickable: PropTypes.bool,
  }

  static defaultProps = {
    onPress: () => {},
    style: null,
    opacity: 0.2,
    disabled: false,
    clickable: true,
  }

  render() {
    const { disabled, opacity, style, onPress, children } = this.props
    const clickable = disabled ? false : this.props.clickable
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={opacity}
        style={style}
        onPress={() => (clickable ? onPress() : null)}>
        {children}
      </TouchableOpacity>
    )
  }
}

export default ClickableView
