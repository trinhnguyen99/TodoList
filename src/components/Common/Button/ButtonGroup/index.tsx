import React from 'react';
import QuickView from '@components/Common/View/QuickView';
import { Text } from '@react-native-community/art';
import Button, { ButtonProps } from '../DefaultButton';

export interface ButtonGroupProps extends Omit<ButtonProps, 'title'|'t'|'onPress'|'margin'|'marginLeft'|'marginVertical'>{
  propsChange?: boolean;
  titleList?: Array<string>;
  tList?: Array<string>;
  onItemPress?: (index: number) => any;
  defaultActiveIndex?: number;
}

interface State {
  activeIndex: number;
}

class ButtonGroup extends React.Component<ButtonGroupProps, State> {
  static defaultProps = {
    propsChange: true,
  };

  private flatListRef: any;

  constructor(props: ButtonGroupProps) {
    super(props);
    const { defaultActiveIndex } = this.props;
    this.state = { activeIndex: defaultActiveIndex || 0 };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { propsChange } = nextProps;
    const { activeIndex } = prevState;
    if (propsChange && nextProps.defaultActiveIndex !== activeIndex) {
      return {
        activeIndex: nextProps.defaultActiveIndex,
      };
    }
    return {
      activeIndex,
    };
  }

  componentDidUpdate() {
    const { activeIndex } = this.state;
    if (this.flatListRef && activeIndex) {
      this.flatListRef.flatListRef.scrollToIndex({
        animated: true,
        index: activeIndex - 1 > 0 ? activeIndex - 1 : 0,
      });
    }
  }

  onPress = (index: number) => {
    this.setState({ activeIndex: index });
    const { onItemPress } = this.props;
    if (onItemPress) {
      onItemPress(index);
    }
  };

  getIndex = () => {
    const { activeIndex } = this.state;
    return activeIndex || 0;
  };

  renderItem = ({ item, index }: { item: string; index: number }) => {
    const {
      titleList,
      tList,
      marginRight: marginRightProp,
      marginHorizontal,
      ...otherButtonProps
    } = this.props;
    const { activeIndex } = this.state;
    const list = titleList || tList;
    const marginRight = marginRightProp || 10;
    if (list) {
      return (
        <Button
          outline
          {...otherButtonProps}
          title={titleList ? item : undefined}
          t={tList ? item : undefined}
          marginRight={
            index === list.length - 1 ? (marginHorizontal || 0) : marginRight
          }
          marginLeft={
            index === 0 ? marginHorizontal : 0
          }
          active={activeIndex === index}
          onPress={() => this.onPress(index)}
        />
      );
    }
    return <QuickView />;
  };

  render() {
    const {
    } = this.props;
    const { activeIndex } = this.state;
    return (
      <Text />
    );
  }
}

export default ButtonGroup;
