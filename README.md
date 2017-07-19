# replot-core: Common features across replot (WIP)
Standard implementations of visualization components, such as axes, tooltips, etc.
The core library currently contains a Tooltip, a Resize, and a LoadingIcon
component. To use any of these in your project, simply npm install `replot-core`
and then import the desired utilities in object-literal form.

Example:
```javascript
import {Tooltip, Resize} from "replot-core"
```
will allow you to use the Tooltip and Resize components.

# API
Instructions for utilizing the different components of replot-core

## Tooltip
Allows for the display of detailed information on a mouse hover

### Basic Usage
To implement the tooltip in a Replot component, add the Tooltip tag to the return
section in the render function of your component, specifying certain props at minimum:
a mouse X position, a mouse Y position, an active boolean, and contents. These
should all be state attributes of the replot component, updated through some type
of mouse movement.

```javascript
<Tooltip
  x={this.state.mouseX} y={this.state.mouseY}
  active={this.state.mouseOver} contents={this.state.contents}
/>
```

### Tooltip coloring
There are a few different ways to specify Tooltip coloring. The tooltip comes with
2 default color schemes, light and dark, and either can be chosen by specifying
a "light" or "dark" `colorScheme` prop. Alternatively, the user can completely
customize the Tooltip by passing in hex colors for the `backgroundColor`,
`borderColor`, and `fontColor`.

The Tooltip defaults to the dark color scheme.

## Resize
The Resize component is a wrapper component that will intelligently handle component sizing.

### Basic Usage
To implement the Resize component, you should import and wrap your entire replot
component in the Resize component. To maintain the props passed in by the user,
it is also recommended to create a clone of the original component and pass in
`this.props`. Refer to this example in the treemap component for usage. Here,
`<TreeMaps />` was the original component class, and it is now delivered as a
`<TreeMapManager/>`

```javascript
class TreeMapManager extends React.Component {

  render() {
    let child = React.cloneElement(<TreeMaps />, this.props)

    return (
      <Resize>
        {child}
      </Resize>
    )
  }
}
```

## LoadingIcon
The LoadingIcon is a basic component that displays an aesthetic placeholder
visual.

### Basic Usage
To use the LoadingIcon, simply import the `{LoadingIcon}` component, and insert
a `<LoadingIcon/>` into your JSX. By default, the LoadingIcon is 100 pixels wide,
and colored black. To change these, the user can pass in a `width` prop to
specify width, and/or a `color` prop with a string-value color to specify the
fill of the dots.
