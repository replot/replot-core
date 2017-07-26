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
component in the Resize component. The Resize component should receive a
`width` prop which was the user intended width of the original component class.
Then, to maintain the props passed in by the user, also pass `...this.props` directly
to the original component. Refer to this example in the treemap component for usage. Here,
`<TreeMapManager />` was the original component class, and it is now delivered as a
`<TreeMapManagerResponsive/>`

```javascript
class TreeMapManagerResponsive extends React.Component {

  render() {

    return (
      <Resize width={this.props.width}>
        <TreeMapManager {...props} />
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

## Legend

### Basic Usage
To use the LoadingIcon, import the `{Legend}` component, and insert a
`<Legend />` into your JSX. **Note:** The Legend must be used within an `<svg>`
parent component, since the Legend itself is comprised of SVG elements.

The only required prop is `values`, which should be an object where each key will
be a title in the legend, and each value will be the color associated with the
title.

By default, the Legend lays out titles flat, with a max width of 500 pixels. In
this default flat mode, the user can specify a `width` prop if they wish the Legend
to be thinner or wider.

Alternatively, if the user passes in a `mode` prop with a value of `"stack"`, the
Legend will place titles one on top of the other, using the minimum height and
width necessary to contain all the titles. In `"stack"` mode, the user can
specify a `height` prop, which will keep one title per line, but space out the
titles up to the specified height.

#### Further Customization

The user can pass in additional props to further customize the Legend:
* `border` defaults to `"off"`, but will draw a border around the Legend if a
value of `"on"` is passed
* `borderColor` defaults to `"#000000"`, and will change the color of the border.
* `backgroundColor` defaults to `none`, and will change the background color
or the Legend.
